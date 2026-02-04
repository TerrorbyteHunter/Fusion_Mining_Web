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
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Receipt,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  XCircle,
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
  companyName?: string;
  phoneNumber?: string;
  location?: string;
  paymentAmount?: string;
  paymentCurrency?: string;
  paymentMethod?: string;
  proofOfPaymentUrl?: string;
  paymentStatus?: string;
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

  const [expandedRequests, setExpandedRequests] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedRequests(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    rejected: 'bg-rose-100 text-rose-700 border-rose-200',
  };

  const getStatusBadge = (status: string) => {
    const colorClass = statusColors[status] || 'bg-slate-100 text-slate-700 border-slate-200';
    return (
      <Badge className={`${colorClass} border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider h-fit shadow-sm`}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getTierBadge = (tier: string) => {
    const tierStyles: Record<string, string> = {
      basic: 'from-slate-400 to-slate-500',
      standard: 'from-blue-500 to-indigo-600',
      premium: 'from-amber-400 to-orange-500',
    };
    const style = tierStyles[tier.toLowerCase()] || 'from-slate-400 to-slate-500';
    return (
      <Badge className={`bg-gradient-to-r ${style} text-white border-none shadow-md px-3 py-1 font-bold text-xs`}>
        {tier.toUpperCase()}
      </Badge>
    );
  };

  const RequestCard = ({ request, isExpanded, onToggle }: { request: BuyerUpgradeRequest, isExpanded: boolean, onToggle: () => void }) => (
    <Card className="overflow-hidden border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className={`h-1.5 w-full bg-gradient-to-r ${request.requestedTier.toLowerCase() === 'premium' ? 'from-amber-400 to-orange-500' : 'from-blue-500 to-indigo-600'
        }`} />

      <CardHeader className="pb-4 pt-6 cursor-pointer select-none" onClick={onToggle}>
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${request.requestedTier.toLowerCase() === 'premium' ? 'bg-amber-500' : 'bg-blue-600'
              }`}>
              {request.requestedTier.toLowerCase() === 'premium' ? <ShieldCheck className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">
                {request.companyName || `${request.buyerFirstName} ${request.buyerLastName}`}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                <Mail className="h-3.5 w-3.5" />
                {request.buyerEmail}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            {getStatusBadge(request.status)}
            {getTierBadge(request.requestedTier)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Documents</p>
              <p className="text-sm font-semibold text-slate-700">{request.documentCount} Files Provided</p>
            </div>
          </div>

          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Submitted On</p>
              <p className="text-sm font-semibold text-slate-700">
                {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Payment Proof</p>
              <p className="text-sm font-semibold text-slate-700 capitalize">
                {request.proofOfPaymentUrl ? 'Uploaded' : 'Pending'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
          <div className="flex gap-3">
            <Button
              onClick={() => handleViewDocuments(request)}
              variant="outline"
              size="sm"
              className="hover:bg-slate-50 border-slate-200"
            >
              <Eye className="h-4 w-4 mr-2 text-indigo-500" />
              Review Docs
            </Button>
            {request.proofOfPaymentUrl && (
              <Button
                onClick={() => window.open(request.proofOfPaymentUrl, '_blank')}
                variant="outline"
                size="sm"
                className="hover:bg-emerald-50 border-emerald-200 text-emerald-700"
              >
                <Receipt className="h-4 w-4 mr-2" />
                View Payment
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-slate-500 hover:text-slate-800"
            >
              {isExpanded ? (
                <>Hide Details <ChevronUp className="h-4 w-4 ml-1" /></>
              ) : (
                <>Show Details <ChevronDown className="h-4 w-4 ml-1" /></>
              )}
            </Button>
            {renderActionButtons(request)}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/30 -mx-6 px-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" /> Buyer Account Details
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between text-sm py-2 border-b border-slate-100">
                  <span className="text-slate-500">Contact Person</span>
                  <span className="font-medium">{request.buyerFirstName} {request.buyerLastName}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5"><Phone className="h-3 w-3" /> Phone Number</span>
                  <span className="font-medium">{request.phoneNumber || 'Not Provided'}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Business Location</span>
                  <span className="font-medium truncate max-w-[200px]">{request.location || 'Not Provided'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5" /> Transaction Summary
              </h4>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</span>
                  <span className="text-lg font-black text-indigo-600">
                    {request.paymentAmount ? `${request.paymentCurrency} ${request.paymentAmount}` : 'No Payment Info'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500">Method</span>
                  <span className="font-bold text-slate-700 capitalize">{request.paymentMethod?.replace('_', ' ') || '-'}</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500">Status</span>
                  <Badge variant="outline" className={`text-[9px] h-fit py-0 ${request.paymentStatus === 'verified' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' :
                    request.paymentStatus === 'paid' ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-amber-200 text-amber-600 bg-amber-50'
                    }`}>
                    {request.paymentStatus?.toUpperCase() || 'PENDING'}
                  </Badge>
                </div>
              </div>
            </div>

            {request.rejectionReason && (
              <div className="md:col-span-2 p-4 rounded-xl bg-rose-50 border border-rose-100 mt-2">
                <div className="flex items-center gap-2 text-rose-700 text-sm font-bold mb-1">
                  <XCircle className="h-4 w-4" /> Rejection History
                </div>
                <p className="text-xs text-rose-600 italic leading-relaxed">"{request.rejectionReason}"</p>
                <div className="text-[10px] text-rose-400 mt-2 uppercase font-bold tracking-tighter">
                  Reviewed on: {request.reviewedAt ? new Date(request.reviewedAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );



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

                <TabsContent value="pending" className="mt-6 space-y-6">
                  {pendingLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-32 w-full rounded-xl" />
                      <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                  ) : pendingRequests && pendingRequests.length > 0 ? (
                    <div className="space-y-6">
                      {pendingRequests.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          isExpanded={expandedRequests[request.id]}
                          onToggle={() => toggleExpand(request.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="border-dashed border-2 bg-slate-50/50">
                      <CardContent className="pt-12 pb-12 text-center">
                        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <p className="text-slate-500 font-medium">No pending upgrade requests</p>
                        <p className="text-sm text-slate-400 mt-1">Check back later for new submissions</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="all" className="mt-6 space-y-6">
                  {allLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-32 w-full rounded-xl" />
                      <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                  ) : allRequests && allRequests.length > 0 ? (
                    <div className="space-y-6">
                      {allRequests.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          isExpanded={expandedRequests[request.id]}
                          onToggle={() => toggleExpand(request.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <Card className="border-dashed border-2 bg-slate-50/50">
                      <CardContent className="pt-12 pb-12 text-center">
                        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <p className="text-slate-500 font-medium">No upgrade requests found</p>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(doc.filePath, '_blank')}
                    data-testid={`button-view-file-${doc.id}`}
                  >
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
