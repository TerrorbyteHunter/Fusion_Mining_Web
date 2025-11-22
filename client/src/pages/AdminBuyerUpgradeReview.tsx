import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  FileText,
  Eye,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AdminSidebar } from "@/components/AdminSidebar";

interface BuyerUpgradeRequest {
  id: string;
  userId: string;
  buyerEmail: string;
  buyerFirstName: string;
  buyerLastName: string;
  requestedTier: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt?: string;
  reviewedAt?: string;
  documentCount: number;
}

interface UpgradeDocument {
  id: string;
  documentType: string;
  fileName: string;
  filePath: string;
  uploadedAt: string;
}

export default function AdminBuyerUpgradeReview() {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<BuyerUpgradeRequest | null>(null);
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch pending upgrade requests
  const { data: pendingRequests, isLoading: pendingLoading } = useQuery<BuyerUpgradeRequest[]>({
    queryKey: ['/api/admin/buyer-upgrades/pending'],
  });

  // Fetch all upgrade requests
  const { data: allRequests, isLoading: allLoading } = useQuery<BuyerUpgradeRequest[]>({
    queryKey: ['/api/admin/buyer-upgrades'],
  });

  // Fetch documents for selected request
  const { data: documents, isLoading: documentsLoading } = useQuery<UpgradeDocument[]>({
    queryKey: ['/api/admin/buyer-upgrades/documents', selectedRequestId],
    enabled: !!selectedRequestId && documentsDialogOpen,
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: (id: string) => apiRequest('POST', `/api/admin/buyer-upgrades/approve/${id}`),
    onSuccess: () => {
      toast({
        title: "Request Approved",
        description: "Tier upgrade has been approved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/buyer-upgrades/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/buyer-upgrades'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setSelectedRequest(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to approve tier upgrade request.",
        variant: "destructive",
      });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      apiRequest('POST', `/api/admin/buyer-upgrades/reject/${id}`, { reason }),
    onSuccess: () => {
      toast({
        title: "Request Rejected",
        description: "Tier upgrade has been rejected.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/buyer-upgrades/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/buyer-upgrades'] });
      setRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedRequest(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reject tier upgrade request.",
        variant: "destructive",
      });
    },
  });

  // Revert mutation
  const revertMutation = useMutation({
    mutationFn: (id: string) => apiRequest('POST', `/api/admin/buyer-upgrades/revert/${id}`),
    onSuccess: () => {
      toast({
        title: "Request Reverted",
        description: "Tier upgrade request has been reverted to draft.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/buyer-upgrades/pending'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/buyer-upgrades'] });
      setSelectedRequest(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to revert tier upgrade request.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'standard':
        return 'text-blue-600';
      case 'premium':
        return 'text-amber-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleViewDocuments = (request: BuyerUpgradeRequest) => {
    setSelectedRequest(request);
    setSelectedRequestId(request.id);
    setDocumentsDialogOpen(true);
  };

  const handleApprove = (request: BuyerUpgradeRequest) => {
    setSelectedRequest(request);
    approveMutation.mutate(request.id);
  };

  const handleRejectClick = (request: BuyerUpgradeRequest) => {
    setSelectedRequest(request);
    setRejectDialogOpen(true);
  };

  const handleRejectSubmit = () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a rejection reason.",
        variant: "destructive",
      });
      return;
    }
    rejectMutation.mutate({ id: selectedRequest.id, reason: rejectionReason });
  };

  const handleRevert = (request: BuyerUpgradeRequest) => {
    setSelectedRequest(request);
    revertMutation.mutate(request.id);
  };

  const renderActionButtons = (request: BuyerUpgradeRequest) => {
    if (request.status === 'approved' || request.status === 'rejected') {
      return (
        <Button
          onClick={() => handleRevert(request)}
          disabled={revertMutation.isPending}
          variant="outline"
          size="sm"
          data-testid={`button-revert-${request.id}`}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {revertMutation.isPending ? 'Reverting...' : 'Revert'}
        </Button>
      );
    }

    return (
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() => handleApprove(request)}
          disabled={approveMutation.isPending}
          variant="outline"
          size="sm"
          className="text-green-600 hover:text-green-700"
          data-testid={`button-approve-${request.id}`}
        >
          <Check className="h-4 w-4 mr-2" />
          {approveMutation.isPending ? 'Approving...' : 'Approve'}
        </Button>
        <Button
          onClick={() => handleRejectClick(request)}
          disabled={rejectMutation.isPending}
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700"
          data-testid={`button-reject-${request.id}`}
        >
          <X className="h-4 w-4 mr-2" />
          Reject
        </Button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-6xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
                  Buyer Tier Upgrades
                </h1>
                <p className="text-muted-foreground">
                  Review and manage buyer tier upgrade requests
                </p>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pending" data-testid="tab-pending-upgrades">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending ({pendingRequests?.length || 0})
                  </TabsTrigger>
                  <TabsTrigger value="all" data-testid="tab-all-upgrades">
                    All Requests ({allRequests?.length || 0})
                  </TabsTrigger>
                </TabsList>

                {/* Pending Requests Tab */}
                <TabsContent value="pending" className="space-y-4">
                  {pendingLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ) : pendingRequests && pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                      {pendingRequests.map((request) => (
                        <Card key={request.id} data-testid={`upgrade-card-${request.id}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1">
                                <CardTitle className="text-lg">
                                  {request.buyerFirstName} {request.buyerLastName}
                                </CardTitle>
                                <CardDescription className="text-xs mt-1">
                                  {request.buyerEmail}
                                </CardDescription>
                              </div>
                              {getStatusBadge(request.status)}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Requested Tier</p>
                                  <p className={`font-semibold capitalize text-sm ${getTierColor(request.requestedTier)}`}>
                                    {request.requestedTier}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Documents</p>
                                  <p className="font-semibold text-sm">{request.documentCount} uploaded</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                                  <p className="font-semibold text-sm">
                                    {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : 'N/A'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2 flex-wrap">
                                <Button
                                  onClick={() => handleViewDocuments(request)}
                                  variant="outline"
                                  size="sm"
                                  data-testid={`button-view-docs-${request.id}`}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Documents
                                </Button>
                                {renderActionButtons(request)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground">No pending upgrade requests</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* All Requests Tab */}
                <TabsContent value="all" className="space-y-4">
                  {allLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ) : allRequests && allRequests.length > 0 ? (
                    <div className="space-y-4">
                      {allRequests.map((request) => (
                        <Card key={request.id} data-testid={`upgrade-card-all-${request.id}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1">
                                <CardTitle className="text-lg">
                                  {request.buyerFirstName} {request.buyerLastName}
                                </CardTitle>
                                <CardDescription className="text-xs mt-1">
                                  {request.buyerEmail}
                                </CardDescription>
                              </div>
                              {getStatusBadge(request.status)}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="grid grid-cols-4 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Requested Tier</p>
                                  <p className={`font-semibold capitalize text-sm ${getTierColor(request.requestedTier)}`}>
                                    {request.requestedTier}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Documents</p>
                                  <p className="font-semibold text-sm">{request.documentCount} uploaded</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                                  <p className="font-semibold text-sm">
                                    {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Reviewed</p>
                                  <p className="font-semibold text-sm">
                                    {request.reviewedAt ? new Date(request.reviewedAt).toLocaleDateString() : 'Pending'}
                                  </p>
                                </div>
                              </div>

                              {request.rejectionReason && (
                                <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                                  <p className="text-xs font-medium text-red-900 dark:text-red-200 mb-1">Rejection Reason:</p>
                                  <p className="text-xs text-red-800 dark:text-red-300">{request.rejectionReason}</p>
                                </div>
                              )}

                              <div className="flex gap-2 pt-2 flex-wrap">
                                <Button
                                  onClick={() => handleViewDocuments(request)}
                                  variant="outline"
                                  size="sm"
                                  data-testid={`button-view-docs-all-${request.id}`}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Documents
                                </Button>
                                {renderActionButtons(request)}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground">No upgrade requests</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Dialog */}
      <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedRequest?.buyerFirstName} {selectedRequest?.buyerLastName} - Documents
            </DialogTitle>
            <DialogDescription>
              {selectedRequest?.requestedTier} tier upgrade request
            </DialogDescription>
          </DialogHeader>

          {documentsLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : documents && documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-card"
                  data-testid={`document-${doc.id}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {doc.documentType.replace(/_/g, ' ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" data-testid={`button-view-file-${doc.id}`}>
                    View
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No documents uploaded</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Tier Upgrade Request</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting {selectedRequest?.buyerFirstName}'s tier upgrade request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-reason" className="text-sm">
                Rejection Reason
              </Label>
              <Textarea
                id="rejection-reason"
                placeholder="Explain why this tier upgrade request is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-2 min-h-[120px]"
                data-testid="textarea-rejection-reason"
              />
            </div>
          </div>

          <DialogFooter className="gap-3 pt-4">
            <Button
              onClick={() => {
                setRejectDialogOpen(false);
                setRejectionReason("");
              }}
              variant="outline"
              data-testid="button-cancel-reject"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRejectSubmit}
              disabled={rejectMutation.isPending || !rejectionReason.trim()}
              variant="destructive"
              data-testid="button-confirm-reject"
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Reject Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
