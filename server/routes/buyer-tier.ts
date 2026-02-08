
import { Express } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "../storage";
import { requireAuth } from "../localAuth";
import { db } from "../db";
import { tierUpgradeRequests, tierUpgradePayments, tierUpgradeDocuments } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

// Helper function to safely get user ID from request
function getUserId(req: any): string | null {
    return req.user?.id || req.auth?.userId || req.user?.claims?.sub || null;
}

export function registerBuyerTierRoutes(app: Express) {
    const tierUpgradeUpload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const uploadDir = path.join(process.cwd(), 'uploads');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir)
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, uniqueSuffix + path.extname(file.originalname))
            }
        })
    });

    // Get current user's latest upgrade request
    app.get('/api/buyer/tier-upgrade-request', requireAuth, async (req: any, res) => {
        try {
            const userId = getUserId(req);
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const request = await storage.getTierUpgradeRequestByUserId(userId);
            res.json(request || null);
        } catch (error) {
            console.error("Error fetching upgrade request:", error);
            res.status(500).json({ message: "Failed to fetch request" });
        }
    });

    // Create or update upgrade request
    app.post('/api/buyer/tier-upgrade-request', requireAuth, async (req: any, res) => {
        try {
            const userId = getUserId(req);
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const { requestedTier } = req.body;
            if (!requestedTier) return res.status(400).json({ message: "Requested tier is required" });

            // Check if there is already a pending or draft request
            const existing = await storage.getTierUpgradeRequestByUserId(userId);

            if (existing) {
                if (existing.status === 'pending') {
                    return res.status(400).json({ message: "You already have a pending request" });
                }
                if (existing.status === 'draft') {
                    // Update existing draft
                    const [updated] = await db.update(tierUpgradeRequests)
                        .set({ requestedTier, updatedAt: new Date() })
                        .where(eq(tierUpgradeRequests.id, existing.id))
                        .returning();
                    return res.json(updated);
                }
                // If rejected, create new one
            }

            // Create new request
            const requestId = 'req_' + Date.now() + Math.random().toString(36).substr(2, 5);
            const request = await storage.createTierUpgradeRequest(requestId, userId, requestedTier);

            res.json(request);
        } catch (error) {
            console.error("Error creating upgrade request:", error);
            res.status(500).json({ message: "Failed to create request" });
        }
    });

    // Get upgrade history
    app.get('/api/buyer/tier-upgrade/history', requireAuth, async (req: any, res) => {
        try {
            const userId = getUserId(req);
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const history = await db.select().from(tierUpgradeRequests)
                .where(eq(tierUpgradeRequests.userId, userId))
                .orderBy(desc(tierUpgradeRequests.submittedAt));

            res.json(history);
        } catch (error) {
            console.error("Error fetching upgrade history:", error);
            res.status(500).json({ message: "Failed to fetch history" });
        }
    });

    // Upload document
    app.post('/api/buyer/tier-upgrade/upload', requireAuth, tierUpgradeUpload.single('file'), async (req: any, res) => {
        try {
            const userId = getUserId(req);
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const file = req.file;
            const { requestId, documentType } = req.body;

            if (!file || !requestId || !documentType) {
                return res.status(400).json({ message: "Missing file or metadata" });
            }

            // Verify request belongs to user
            const request = await storage.getTierUpgradeRequestById(requestId);
            if (!request || request.userId !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            const doc = await storage.createTierUpgradeDocument({
                requestId,
                documentType,
                fileName: file.originalname,
                fileUrl: `/uploads/${file.filename}`,
                fileSize: file.size,
                mimeType: file.mimetype,
                uploadedAt: new Date(),
            });

            res.json(doc);
        } catch (error) {
            console.error("Error uploading document:", error);
            res.status(500).json({ message: "Failed to upload document" });
        }
    });

    // Get payment methods
    app.get('/api/payment-methods', async (req, res) => {
        try {
            const methods = await storage.getAllPaymentMethodDetails();
            res.json(methods);
        } catch (error) {
            console.error("Error fetching payment methods:", error);
            res.status(500).json({ message: "Failed to fetch payment methods" });
        }
    });

    // Create payment record
    app.post('/api/buyer/tier-upgrade/payment', requireAuth, async (req: any, res) => {
        try {
            const userId = getUserId(req);
            if (!userId) return res.status(401).json({ message: "Unauthorized" });

            const { upgradeRequestId, paymentMethod, amount } = req.body;

            if (!upgradeRequestId || !paymentMethod || !amount) {
                return res.status(400).json({ message: "Missing payment details" });
            }

            // Verify upgrade request exists and belongs to user
            const request = await storage.getTierUpgradeRequestById(upgradeRequestId);
            if (!request || request.userId !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            const payment = await storage.createTierUpgradePayment({
                upgradeRequestId,
                userId,
                paymentMethod,
                amount: amount.toString(),
                amountUSD: amount.toString(),
                requestedTier: request.requestedTier,
                currency: 'USD',
                status: 'pending',
                submittedAt: new Date(),
            });

            res.json(payment);
        } catch (error) {
            console.error("Error creating payment:", error);
            res.status(500).json({ message: "Failed to create payment" });
        }
    });

    // Upload proof of payment
    app.post('/api/buyer/tier-upgrade/payment/:paymentId/proof', requireAuth, tierUpgradeUpload.single('proofOfPayment'), async (req: any, res) => {
        try {
            const userId = getUserId(req);
            const paymentId = req.params.paymentId;
            const file = req.file;

            if (!file || !paymentId) {
                return res.status(400).json({ message: "Missing file or payment ID" });
            }

            // Verify payment belongs to user
            const payment = await storage.getTierUpgradePaymentById(paymentId);
            if (!payment || payment.userId !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            const updatedPayment = await storage.updateTierUpgradePayment(paymentId, {
                proofOfPaymentUrl: `/uploads/${file.filename}`,
                status: 'paid', // Mark as paid/pending verification
                updatedAt: new Date(),
            });

            res.json(updatedPayment);
        } catch (error) {
            console.error("Error uploading proof:", error);
            res.status(500).json({ message: "Failed to upload proof" });
        }
    });

    // Submit request (final step)
    app.post('/api/buyer/tier-upgrade/submit', requireAuth, async (req: any, res) => {
        try {
            const userId = getUserId(req);
            const { requestId } = req.body;

            if (!requestId) return res.status(400).json({ message: "Request ID is required" });

            const request = await storage.getTierUpgradeRequestById(requestId);
            if (!request || request.userId !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            const submitted = await storage.submitTierUpgradeRequest(requestId);
            res.json(submitted);
        } catch (error) {
            console.error("Error submitting request:", error);
            res.status(500).json({ message: "Failed to submit request" });
        }
    });
}
