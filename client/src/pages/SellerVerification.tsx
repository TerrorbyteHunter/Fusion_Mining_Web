import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  FileText,
  Shield,
  AlertCircle,
} from "lucide-react";

type VerificationStatus = 'not_requested' | 'pending' | 'approved' | 'rejected';

type DocumentType = 
  | 'certificate_of_incorporation'
  | 'company_profile'
  | 'shareholder_list'
  | 'tax_certificate'
  | 'letter_of_authorization'
  | 'director_id';

interface VerificationDocument {
  id: string;
  documentType: DocumentType;
  fileName: string;
  filePath: string;
  uploadedAt: string;
}

interface VerificationRequest {
  id: string;
  status: VerificationStatus;
  rejectionReason?: string;
  submittedAt?: string;
  reviewedAt?: string;
  documents: VerificationDocument[];
}

export default function SellerVerification() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>('certificate_of_incorporation');
  const [uploading, setUploading] = useState(false);

  // Fetch verification request
  const { data: request, isLoading, refetch } = useQuery<VerificationRequest | null>({
    queryKey: ['/api/verification/my-request'],
    enabled: !!user && user.role === 'seller',
  });

  // Create verification request mutation
  const createRequestMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/verification/request'),
    onSuccess: () => {
      toast({
        title: "Verification Request Created",
        description: "You can now upload documents to support your verification request.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/my-request'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create verification request. Please try again.",
        variant: "destructive",
      });
    },
  });

  // File upload handler
  const handleFileUpload = async () => {
    if (!selectedFile || !request?.id) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('requestId', request.id);
      formData.append('documentType', documentType);

      const response = await fetch('/api/verification/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast({
        title: "Document Uploaded",
        description: `${selectedFile.name} has been uploaded successfully.`,
      });

      setSelectedFile(null);
      refetch();
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">Not Requested</Badge>;
    }
  };

  const documentTypeLabels: Record<DocumentType, string> = {
    certificate_of_incorporation: 'Certificate of Incorporation',
    company_profile: 'Company Profile',
    shareholder_list: 'Shareholder List',
    tax_certificate: 'Tax Certificate',
    letter_of_authorization: 'Letter of Authorization',
    director_id: 'Director ID',
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" data-testid="text-page-title">
            Seller Verification
          </h1>
          <p className="text-muted-foreground">
            Get verified to build trust with buyers and unlock premium features
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Verification Status</CardTitle>
                  <CardDescription className="text-xs">
                    Current account verification level
                  </CardDescription>
                </div>
              </div>
              {request && getStatusBadge(request.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!request && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Verified</AlertTitle>
                  <AlertDescription>
                    Submit a verification request to get started. You'll need to upload supporting
                    documents to verify your business.
                  </AlertDescription>
                </Alert>
              )}

              {request?.status === 'pending' && (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Under Review</AlertTitle>
                  <AlertDescription>
                    Your verification request is being reviewed by our team. This typically takes
                    1-2 business days.
                  </AlertDescription>
                </Alert>
              )}

              {request?.status === 'approved' && (
                <Alert className="border-green-600 bg-green-50 dark:bg-green-950">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900 dark:text-green-100">Verified!</AlertTitle>
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Congratulations! Your seller account has been verified. Your verification badge
                    is now displayed on your listings and profile.
                  </AlertDescription>
                </Alert>
              )}

              {request?.status === 'rejected' && request.rejectionReason && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Verification Rejected</AlertTitle>
                  <AlertDescription>
                    {request.rejectionReason}
                  </AlertDescription>
                </Alert>
              )}

              {!request && (
                <div className="flex gap-4 flex-wrap">
                  <Button
                    onClick={() => createRequestMutation.mutate()}
                    disabled={createRequestMutation.isPending}
                    data-testid="button-start-verification"
                  >
                    {createRequestMutation.isPending ? 'Creating...' : 'Start Verification Process'}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Section */}
        {request && request.status !== 'approved' && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <Upload className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-base">Upload Documents</CardTitle>
                  <CardDescription className="text-xs">
                    Upload supporting documents for verification
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="document-type">Document Type</Label>
                    <Select
                      value={documentType}
                      onValueChange={(value) => setDocumentType(value as DocumentType)}
                    >
                      <SelectTrigger id="document-type" data-testid="select-document-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(documentTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="file-upload">Select File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      data-testid="input-file-upload"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Accepted formats: PDF, JPG, PNG, DOC (Max 20MB)
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleFileUpload}
                  disabled={!selectedFile || uploading}
                  data-testid="button-upload-document"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Uploaded Documents */}
        {request && request.documents && request.documents.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-2/10 rounded-lg">
                  <FileText className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <CardTitle className="text-base">Uploaded Documents</CardTitle>
                  <CardDescription className="text-xs">
                    Documents submitted for verification
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {request.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-4 flex-wrap p-3 rounded-md border"
                    data-testid={`document-${doc.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {documentTypeLabels[doc.documentType]}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
