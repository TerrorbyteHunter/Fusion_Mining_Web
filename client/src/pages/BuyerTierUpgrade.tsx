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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Clock,
  Upload,
  TrendingUp,
  AlertCircle,
  Crown,
  Zap,
  Star,
  Check,
  FileText,
  X,
} from "lucide-react";

type DocumentType = 
  | 'certificate_of_incorporation'
  | 'company_profile'
  | 'shareholder_list'
  | 'tax_certificate'
  | 'letter_of_authorization'
  | 'director_id';

interface TierUpgradeRequest {
  id: string;
  userId: string;
  requestedTier: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  documents?: Array<{
    id: string;
    documentType: DocumentType;
    fileName: string;
    uploadedAt: string;
  }>;
}

interface PendingDocument {
  file: File;
  documentType: DocumentType;
  id: string;
}

export default function BuyerTierUpgrade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>('certificate_of_incorporation');
  const [submitting, setSubmitting] = useState(false);

  // Fetch current tier upgrade request
  const { data: upgradeRequest, isLoading } = useQuery<TierUpgradeRequest | null>({
    queryKey: ['/api/buyer/tier-upgrade-request'],
    enabled: !!user && user.role === 'buyer',
  });

  const membershipTiers = [
    {
      tier: 'basic',
      name: 'Basic',
      price: 'Free',
      color: 'bg-gray-500',
      icon: Star,
      features: [
        'Access to marketplace listings',
        'Basic search and filters',
        'Up to 2 active RFQs',
        'Email support',
      ]
    },
    {
      tier: 'standard',
      name: 'Standard',
      price: '$50/month',
      color: 'bg-blue-600',
      icon: Zap,
      features: [
        'All Basic features',
        'Advanced analytics dashboard',
        'Up to 10 active RFQs',
        'Direct messaging with sellers',
        'Priority search ranking',
        'Market insights and trends',
      ]
    },
    {
      tier: 'premium',
      name: 'Premium',
      price: '$200/month',
      color: 'bg-amber-600',
      icon: Crown,
      features: [
        'All Standard features',
        'Unlimited active RFQs',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom market reports',
        'Early access to new features',
        'Premium verification badge',
      ]
    }
  ];

  // Create tier upgrade request mutation
  const createUpgradeRequestMutation = useMutation({
    mutationFn: (tier: string) => apiRequest('POST', '/api/buyer/tier-upgrade-request', { requestedTier: tier }),
    onSuccess: async (response) => {
      const data = await response.json();
      const upgradeId = data?.id;
      if (!upgradeId) {
        toast({
          title: "Error",
          description: "Failed to create upgrade request.",
          variant: "destructive",
        });
        return;
      }

      // Upload all pending documents
      if (pendingDocuments.length > 0) {
        let uploadCount = 0;
        for (const doc of pendingDocuments) {
          try {
            const formData = new FormData();
            formData.append('file', doc.file);
            formData.append('requestId', upgradeId);
            formData.append('documentType', doc.documentType);

            const response = await fetch('/api/buyer/tier-upgrade/upload', {
              method: 'POST',
              body: formData,
              credentials: 'include',
            });

            if (response.ok) {
              uploadCount++;
            }
          } catch (error) {
            console.error('Upload failed:', error);
          }
        }

        // Submit the request after uploads
        try {
          await apiRequest('POST', '/api/buyer/tier-upgrade/submit');
          toast({
            title: "Success!",
            description: `Tier upgrade request submitted with ${uploadCount} documents. We'll review your request within 1-2 business days.`,
          });
          setModalOpen(false);
          setPendingDocuments([]);
          setSelectedTier("");
          queryClient.invalidateQueries({ queryKey: ['/api/buyer/tier-upgrade-request'] });
        } catch (error) {
          toast({
            title: "Partial Success",
            description: `Documents uploaded but request submission failed. Please try again.`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "No Documents",
          description: "Please upload at least one document before submitting.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create upgrade request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddDocument = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    const newDoc: PendingDocument = {
      file: selectedFile,
      documentType: documentType,
      id: Math.random().toString(36).substr(2, 9),
    };

    setPendingDocuments([...pendingDocuments, newDoc]);
    setSelectedFile(null);
    setDocumentType('certificate_of_incorporation');
    
    toast({
      title: "Document Added",
      description: `${selectedFile.name} has been added to your upload list.`,
    });
  };

  const handleRemoveDocument = (id: string) => {
    setPendingDocuments(pendingDocuments.filter(doc => doc.id !== id));
  };

  const handleSubmitUpgrade = async () => {
    if (pendingDocuments.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one document before submitting.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    createUpgradeRequestMutation.mutate(selectedTier);
    setSubmitting(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending Review</Badge>;
      case 'draft':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="secondary">No Active Request</Badge>;
    }
  };

  const documentTypeLabels: Record<DocumentType, string> = {
    certificate_of_incorporation: 'Certificate of Incorporation',
    company_profile: 'Company Profile',
    shareholder_list: 'Shareholder/Director List',
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

  const currentTier = user?.membershipTier || 'basic';
  const selectedTierInfo = membershipTiers.find(t => t.tier === selectedTier);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
            Upgrade Your Membership
          </h1>
          <p className="text-muted-foreground">
            Unlock premium features and grow your business with an upgraded membership tier
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Upgrade Status</CardTitle>
                  <CardDescription className="text-xs">
                    Your current membership and upgrade progress
                  </CardDescription>
                </div>
              </div>
              {upgradeRequest ? getStatusBadge(upgradeRequest.status) : <Badge variant="secondary">No Active Request</Badge>}
            </div>
          </CardHeader>
          {upgradeRequest && (
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>
                    {upgradeRequest.status === 'draft' && 'Uploading Documents'}
                    {upgradeRequest.status === 'pending' && 'Under Review'}
                    {upgradeRequest.status === 'approved' && 'Upgrade Approved'}
                    {upgradeRequest.status === 'rejected' && 'Upgrade Rejected'}
                  </AlertTitle>
                  <AlertDescription>
                    {upgradeRequest.status === 'draft' && `You have a ${upgradeRequest.requestedTier} tier upgrade request in progress. Upload all required documents and click Submit when ready.`}
                    {upgradeRequest.status === 'pending' && `Your upgrade request for ${upgradeRequest.requestedTier} tier is being reviewed by our team. This typically takes 1-2 business days.`}
                    {upgradeRequest.status === 'approved' && `Congratulations! Your upgrade to ${upgradeRequest.requestedTier} tier has been approved.`}
                    {upgradeRequest.status === 'rejected' && upgradeRequest.rejectionReason && upgradeRequest.rejectionReason}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Membership Tiers */}
        <h2 className="text-2xl font-bold mb-6">Choose Your Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {membershipTiers.map((tierInfo) => {
            const Icon = tierInfo.icon;
            const isCurrent = currentTier === tierInfo.tier;
            const isSelected = selectedTier === tierInfo.tier || upgradeRequest?.requestedTier === tierInfo.tier;
            
            return (
              <Card
                key={tierInfo.tier}
                className={`relative transition-all ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''} ${isCurrent ? 'opacity-50 cursor-not-allowed' : 'hover-elevate cursor-pointer'}`}
                onClick={() => {
                  // Allow selection if no request, or if request is approved/rejected (can upgrade again)
                  const canSelect = !isCurrent && (!upgradeRequest || upgradeRequest.status === 'approved' || upgradeRequest.status === 'rejected');
                  if (canSelect) {
                    setSelectedTier(tierInfo.tier);
                  }
                }}
                data-testid={`card-tier-${tierInfo.tier}`}
              >
                {isCurrent && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">Current</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${tierInfo.color} bg-opacity-10`}>
                      <Icon className={`h-6 w-6 ${tierInfo.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <CardTitle>{tierInfo.name}</CardTitle>
                      <CardDescription className="text-lg font-bold">{tierInfo.price}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tierInfo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Request Upgrade Button */}
        {(!upgradeRequest || upgradeRequest.status === 'approved' || upgradeRequest.status === 'rejected') && selectedTier && selectedTier !== currentTier && (
          <div className="mb-8">
            <Button
              onClick={() => setModalOpen(true)}
              size="lg"
              className="w-full md:w-auto"
              data-testid="button-request-upgrade"
            >
              Request Upgrade to {selectedTierInfo?.name}
            </Button>
          </div>
        )}

        {/* Upgrade Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upgrade to {selectedTierInfo?.name}</DialogTitle>
              <DialogDescription>
                Upload your business verification documents to complete your upgrade request
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Tier Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Selected Tier: <span className="text-primary">{selectedTierInfo?.name}</span></p>
                <p className="text-xs text-muted-foreground">{selectedTierInfo?.price}</p>
              </div>

              {/* Required Documents Info */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Required Documents</AlertTitle>
                <AlertDescription>
                  Please upload all required business verification documents:
                </AlertDescription>
              </Alert>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Documents needed:</p>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>a) Company Certificate of Incorporation</li>
                  <li>b) Company Profile</li>
                  <li>c) Shareholder/Director List</li>
                  <li>d) Tax Certificate</li>
                  <li>e) Letter of Authorization (if applicable)</li>
                </ul>
              </div>

              {/* Document Upload Form */}
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="modal-document-type" className="text-sm">Document Type</Label>
                    <Select
                      value={documentType}
                      onValueChange={(value) => setDocumentType(value as DocumentType)}
                    >
                      <SelectTrigger id="modal-document-type" data-testid="select-modal-document-type" className="mt-1">
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
                    <Label htmlFor="modal-file-upload" className="text-sm">Select File</Label>
                    <Input
                      id="modal-file-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      data-testid="input-modal-file-upload"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Accepted formats: PDF, JPG, PNG, DOC (Max 20MB)
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleAddDocument}
                  disabled={!selectedFile}
                  variant="outline"
                  size="sm"
                  className="w-full"
                  data-testid="button-add-document"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>

              {/* Uploaded Documents List */}
              {pendingDocuments.length > 0 && (
                <div className="space-y-3 border-t pt-4">
                  <p className="text-sm font-medium">Documents to Upload ({pendingDocuments.length})</p>
                  <div className="space-y-2">
                    {pendingDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                        data-testid={`pending-document-${doc.id}`}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{doc.file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {documentTypeLabels[doc.documentType]}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRemoveDocument(doc.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 flex-shrink-0 ml-2"
                          data-testid={`button-remove-document-${doc.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-3 pt-4 border-t">
              <Button
                onClick={() => {
                  setModalOpen(false);
                  setPendingDocuments([]);
                  setSelectedFile(null);
                }}
                variant="outline"
                data-testid="button-cancel-upgrade"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitUpgrade}
                disabled={submitting || pendingDocuments.length === 0}
                data-testid="button-submit-upgrade-modal"
              >
                {submitting ? 'Submitting...' : 'Submit Upgrade Request'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
