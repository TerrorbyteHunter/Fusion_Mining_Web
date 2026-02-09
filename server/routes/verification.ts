import { Express } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "../storage";
import { requireAuth, requireAdmin, requireAdminPermission } from "../localAuth";

export function registerVerificationRoutes(app: Express) {
    // ========================================================================
    // Seller Verification Routes
    // ========================================================================

    // Create verification request (Seller only)
    app.post('/api/verification/request', requireAuth, async (req: any, res) => {
        try {
            if (req.user.role !== 'seller') {
                return res.status(403).json({ message: "Only sellers can request verification" });
            }

            // Ensure seller exists in database (important for demo users)
            let seller = await storage.getUser(req.user.id);
            if (!seller) {
                console.log('[VERIFICATION] Creating missing seller in database:', req.user.id);
                try {
                    await storage.upsertUser({
                        clerkId: req.user.clerkId, // Adjusted for current user object structure
                        email: req.user.email || 'seller@fusionmining.com',
                        firstName: req.user.firstName || 'Seller',
                        lastName: req.user.lastName || 'User',
                        role: 'seller'
                    });
                    console.log('[VERIFICATION] User upserted successfully');

                    // Verify the user was created
                    seller = await storage.getUser(req.user.id);
                    if (!seller) {
                        throw new Error('User was not created in database after upsert');
                    }
                    console.log('[VERIFICATION] User confirmed in database');
                } catch (userError) {
                    console.error('[VERIFICATION] Error creating user:', userError);
                    throw userError;
                }
            }

            const request = await storage.createVerificationRequest(req.user.id);
            res.json(request);
        } catch (error) {
            console.error("Error creating verification request:", error);
            res.status(500).json({ message: "Failed to create verification request" });
        }
    });

    // Submit verification request (Seller only) - sends request for review
    app.post('/api/verification/submit', requireAuth, async (req: any, res) => {
        try {
            if (req.user.role !== 'seller') {
                return res.status(403).json({ message: "Only sellers can submit verification" });
            }

            const request = await storage.getVerificationRequestBySellerId(req.user.id);
            if (!request) {
                return res.status(404).json({ message: "Verification request not found" });
            }

            // Check if request has at least one document
            const documents = await storage.getDocumentsByRequestId(request.id);
            if (!documents || documents.length === 0) {
                return res.status(400).json({ message: "Please upload at least one document before submitting" });
            }

            // Update request status to pending
            const updatedRequest = await storage.updateVerificationRequestStatus(request.id, 'pending');
            const updatedDocuments = await storage.getDocumentsByRequestId(request.id);

            // Create notification for seller
            await storage.createNotification({
                userId: req.user.id,
                type: 'seller_verification',
                title: 'Verification Request Submitted',
                message: 'Your seller verification request has been submitted for review. We will review it within 2-3 business days.',
                link: '/dashboard/seller-verification',
            });

            // Create notification for all admins
            const adminUsers = await storage.getUsersByRole('admin');
            for (const admin of adminUsers) {
                await storage.createNotification({
                    userId: admin.id,
                    type: 'seller_verification',
                    title: 'New Seller Verification Request',
                    message: `${req.user.firstName} ${req.user.lastName} (${req.user.email}) submitted a new verification request.`,
                    link: '/admin?tab=seller-verification',
                });
            }

            console.log('[VERIFICATION] Request submitted:', request.id, 'Status changed to pending');
            res.json({ ...updatedRequest, documents: updatedDocuments });
        } catch (error) {
            console.error("Error submitting verification request:", error);
            res.status(500).json({ message: "Failed to submit verification request" });
        }
    });

    // Get current user's verification request (Seller)
    app.get('/api/verification/my-request', requireAuth, async (req: any, res) => {
        try {
            if (req.user.role !== 'seller') {
                return res.status(403).json({ message: "Only sellers can access this endpoint" });
            }

            const request = await storage.getVerificationRequestBySellerId(req.user.id);

            if (!request) {
                return res.json(null);
            }

            // Also get documents for this request
            const documents = await storage.getDocumentsByRequestId(request.id);
            res.json({ ...request, documents });
        } catch (error) {
            console.error("Error fetching verification request:", error);
            res.status(500).json({ message: "Failed to fetch verification request" });
        }
    });

    // Get all verification requests (Admin only)
    app.get('/api/verification/requests', requireAuth, requireAdmin, async (req: any, res) => {
        try {
            const requests = await storage.getAllVerificationRequests();
            res.json(requests);
        } catch (error) {
            console.error("Error fetching verification requests:", error);
            res.status(500).json({ message: "Failed to fetch verification requests" });
        }
    });

    // Get pending verification requests (Admin only)
    app.get('/api/verification/requests/pending', requireAuth, requireAdminPermission('canManageVerification'), async (req: any, res) => {
        try {
            const requests = await storage.getAllPendingVerificationRequests();
            res.json(requests);
        } catch (error) {
            console.error("Error fetching pending verification requests:", error);
            res.status(500).json({ message: "Failed to fetch pending verification requests" });
        }
    });

    // Get documents for a verification request (Admin only)
    app.get('/api/verification/documents/:requestId', requireAuth, requireAdminPermission('canManageVerification'), async (req: any, res) => {
        try {
            const documents = await storage.getDocumentsByRequestId(req.params.requestId);
            res.json(documents);
        } catch (error) {
            console.error("Error fetching verification documents:", error);
            res.status(500).json({ message: "Failed to fetch verification documents" });
        }
    });

    // Approve verification request (Admin only)
    app.post('/api/verification/approve/:id', requireAuth, requireAdminPermission('canManageVerification'), async (req: any, res) => {
        try {
            const request = await storage.approveVerificationRequest(req.params.id, req.user.id);
            res.json(request);
        } catch (error) {
            console.error("Error approving verification request:", error);
            res.status(500).json({ message: "Failed to approve verification request" });
        }
    });

    // Reject verification request (Admin only)
    app.post('/api/verification/reject/:id', requireAuth, requireAdminPermission('canManageVerification'), async (req: any, res) => {
        try {
            const { reason } = req.body;
            if (!reason) {
                return res.status(400).json({ message: "Rejection reason is required" });
            }

            const request = await storage.rejectVerificationRequest(req.params.id, req.user.id, reason);
            res.json(request);
        } catch (error) {
            console.error("Error rejecting verification request:", error);
            res.status(500).json({ message: "Failed to reject verification request" });
        }
    });

    // ========================================================================
    // File Uploads: Verification Documents
    // ========================================================================
    const verificationUploadsRoot = path.resolve(process.cwd(), "uploads", "verification");
    if (!fs.existsSync(verificationUploadsRoot)) {
        fs.mkdirSync(verificationUploadsRoot, { recursive: true });
    }

    const verificationStorageEngine = multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, verificationUploadsRoot),
        filename: (_req, file, cb) => {
            const timestamp = Date.now();
            const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
            cb(null, `${timestamp}-${sanitizedOriginal}`);
        },
    });

    const verificationUpload = multer({
        storage: verificationStorageEngine,
        limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB for verification documents
        fileFilter: (_req, file, cb) => {
            const allowed = [
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (allowed.includes(file.mimetype)) {
                return cb(null, true);
            }
            return cb(new Error("Unsupported file type. Please upload PDF, JPG, PNG, or DOC files."));
        },
    });

    // Upload verification file endpoint
    app.post('/api/verification/upload', requireAuth, verificationUpload.single('file'), async (req: any, res) => {
        try {
            if (req.user.role !== 'seller') {
                return res.status(403).json({ message: "Only sellers can upload verification documents" });
            }

            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const { requestId, documentType } = req.body;

            if (!requestId || !documentType) {
                return res.status(400).json({ message: "Request ID and document type are required" });
            }

            // Verify the request belongs to the current user
            const request = await storage.getVerificationRequestById(requestId);
            if (!request || request.sellerId !== req.user.id) {
                return res.status(403).json({ message: "Invalid verification request" });
            }

            const relativePath = `/uploads/verification/${req.file.filename}`;

            // Create document record in database
            const document = await storage.createVerificationDocument({
                requestId,
                documentType,
                fileName: req.file.originalname,
                filePath: relativePath,
                fileSize: req.file.size,
                mimeType: req.file.mimetype,
            });

            res.json({
                document,
                filename: req.file.originalname,
                url: relativePath,
                size: req.file.size,
                mimetype: req.file.mimetype,
            });
        } catch (error: any) {
            console.error("Error uploading verification document:", error);
            res.status(500).json({ message: error.message || "Failed to upload verification document" });
        }
    });
}
