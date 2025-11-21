import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Shield,
  AlertCircle,
  Eye,
} from "lucide-react";

type VerificationStatus = 'not_requested' | 'pending' | 'approved' | 'rejected';

interface VerificationRequest {
  id: string;
  status: VerificationStatus;
  rejectionReason?: string;
  submittedAt?: string;
  reviewedAt?: string;
  sellerId: string;
  sellerEmail: string;
  sellerFirstName: string;
  sellerLastName: string;
  sellerCompanyName?: string;
}

interface VerificationDocument {
  id: string;
  documentType: string;
  fileName: string;
  filePath: string;
  uploadedAt: string;
}

export default function AdminVerificationReview() {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Fetch all verification requests
  const { data: allRequests, isLoading: allLoading } = useQuery<VerificationRequest[]>({
    queryKey: ['/api/verification/requests'],
  });

  // Fetch pending verification requests
  const { data: pendingRequests, isLoading: pendingLoading } = useQuery<VerificationRequest[]>({
    queryKey: ['/api/verification/requests/pending'],
  });

  // Fetch documents for selected request
  const { data: documents, isLoading: documentsLoading } = useQuery<VerificationDocument[]>({
    queryKey: ['/api/verification/documents', selectedRequestId],
    enabled: !!selectedRequestId && documentsDialogOpen,
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => apiRequest('POST', `/api/verification/approve/${id}`),
    onSuccess: () => {
      toast({
        title: "Request Approved",
        description: "Seller verification has been approved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/requests'] });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/requests/pending'] });
      setReviewDialogOpen(false);
      setSelectedRequest(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to approve verification request.",
        variant: "destructive",
      });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      apiRequest('POST', `/api/verification/reject/${id}`, { reason }),
    onSuccess: () => {
      toast({
        title: "Request Rejected",
        description: "Seller verification has been rejected.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/requests'] });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/requests/pending'] });
      setReviewDialogOpen(false);
      setSelectedRequest(null);
      setRejectionReason("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reject verification request.",
        variant: "destructive",
      });
    },
  });

  const handleApprove = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setReviewDialogOpen(true);
  };

  const handleReject = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setReviewDialogOpen(true);
  };

  const confirmApprove = () => {
    if (selectedRequest) {
      approveMutation.mutate(selectedRequest.id);
    }
  };

  const confirmReject = () => {
    if (selectedRequest && rejectionReason.trim()) {
      rejectMutation.mutate({ id: selectedRequest.id, reason: rejectionReason });
    } else {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
    }
  };

  const viewDocuments = (requestId: string) => {
    setSelectedRequestId(requestId);
    setDocumentsDialogOpen(true);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending</Badge>;
      default:
        return <Badge variant="secondary">Not Requested</Badge>;
    }
  };

  const renderRequestCard = (request: VerificationRequest, showActions: boolean = true) => (
    <Card key={request.id} data-testid={`request-${request.id}`}>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-base">
              {request.sellerFirstName} {request.sellerLastName}
            </CardTitle>
            <CardDescription className="text-xs">
              {request.sellerEmail}
              {request.sellerCompanyName && ` • ${request.sellerCompanyName}`}
            </CardDescription>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 flex-wrap text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Submitted</p>
              <p className="font-medium">
                {request.submittedAt
                  ? new Date(request.submittedAt).toLocaleDateString()
                  : 'Not submitted'}
              </p>
            </div>
            {request.reviewedAt && (
              <div>
                <p className="text-muted-foreground text-xs">Reviewed</p>
                <p className="font-medium">{new Date(request.reviewedAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {request.rejectionReason && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm font-medium text-destructive mb-1">Rejection Reason:</p>
              <p className="text-sm text-muted-foreground">{request.rejectionReason}</p>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => viewDocuments(request.id)}
              data-testid={`button-view-documents-${request.id}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Documents
            </Button>

            {showActions && request.status === 'pending' && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleApprove(request)}
                  disabled={approveMutation.isPending}
                  data-testid={`button-approve-${request.id}`}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(request)}
                  disabled={rejectMutation.isPending}
                  data-testid={`button-reject-${request.id}`}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold" data-testid="text-page-title">
              Seller Verification Review
            </h1>
          </div>
          <p className="text-muted-foreground">
            Review and approve seller verification requests
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending ({pendingRequests?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="all" data-testid="tab-all">
              All Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            ) : pendingRequests && pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => renderRequestCard(request, true))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
                  <p className="text-muted-foreground text-sm">
                    All verification requests have been reviewed
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            {allLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            ) : allRequests && allRequests.length > 0 ? (
              <div className="space-y-4">
                {allRequests.map((request) => renderRequestCard(request, request.status === 'pending'))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Requests Found</h3>
                  <p className="text-muted-foreground text-sm">
                    No verification requests have been submitted yet
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Verification Request</DialogTitle>
              <DialogDescription>
                {selectedRequest && (
                  <>
                    {selectedRequest.sellerFirstName} {selectedRequest.sellerLastName} (
                    {selectedRequest.sellerEmail})
                  </>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason (optional for approve)</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  data-testid="input-rejection-reason"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setReviewDialogOpen(false);
                  setRejectionReason("");
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmApprove}
                disabled={approveMutation.isPending}
                data-testid="button-confirm-approve"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={confirmReject}
                disabled={rejectMutation.isPending || !rejectionReason.trim()}
                data-testid="button-confirm-reject"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Documents Dialog */}
        <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Verification Documents</DialogTitle>
              <DialogDescription>Documents submitted for verification</DialogDescription>
            </DialogHeader>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {documentsLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : documents && documents.length > 0 ? (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-4 flex-wrap p-3 rounded-md border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.documentType.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc.filePath, '_blank')}
                        data-testid={`button-view-file-${doc.id}`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No documents uploaded</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDocumentsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
