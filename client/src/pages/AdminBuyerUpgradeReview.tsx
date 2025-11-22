import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  FileText,
  Eye,
} from "lucide-react";
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

                              <div className="flex gap-2 pt-2">
                                <Button
                                  onClick={() => handleViewDocuments(request)}
                                  variant="outline"
                                  size="sm"
                                  data-testid={`button-view-docs-${request.id}`}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Documents
                                </Button>
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

                              <div className="flex gap-2 pt-2">
                                <Button
                                  onClick={() => handleViewDocuments(request)}
                                  variant="outline"
                                  size="sm"
                                  data-testid={`button-view-docs-all-${request.id}`}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Documents
                                </Button>
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
    </div>
  );
}
