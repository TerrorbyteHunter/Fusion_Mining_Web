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
  Clock,
  Upload,
  TrendingUp,
  AlertCircle,
  Crown,
  Zap,
  Star,
  Check,
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
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export default function BuyerTierUpgrade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>('certificate_of_incorporation');
  const [uploading, setUploading] = useState(false);

  // Fetch current tier upgrade request
  const { data: upgradeRequest, isLoading, refetch } = useQuery<TierUpgradeRequest | null>({
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
    onSuccess: () => {
      toast({
        title: "Upgrade Request Submitted",
        description: "Your tier upgrade request has been submitted. Please upload required documents.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/buyer/tier-upgrade-request'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit upgrade request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTierUpgradeRequest = () => {
    if (!selectedTier) {
      toast({
        title: "Error",
        description: "Please select a membership tier to upgrade to.",
        variant: "destructive",
      });
      return;
    }
    createUpgradeRequestMutation.mutate(selectedTier);
  };

  // File upload handler
  const handleFileUpload = async () => {
    if (!selectedFile || !upgradeRequest?.id) {
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
      formData.append('requestId', upgradeRequest.id);
      formData.append('documentType', documentType);

      const response = await fetch('/api/buyer/tier-upgrade/upload', {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">No Request</Badge>;
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

  const currentTier = user?.membershipTier || 'basic';

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
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
                  <CardTitle className="text-base">Current Membership</CardTitle>
                  <CardDescription className="text-xs">
                    Your active membership tier
                  </CardDescription>
                </div>
              </div>
              <Badge className="capitalize">{currentTier}</Badge>
            </div>
          </CardHeader>
          {upgradeRequest && (
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Upgrade Request Status</AlertTitle>
                  <AlertDescription>
                    You have a {upgradeRequest.status} upgrade request for {upgradeRequest.requestedTier} tier.
                    {upgradeRequest.status === 'pending' && ' Please upload required documents below.'}
                    {upgradeRequest.rejectionReason && (
                      <p className="mt-2 text-destructive">{upgradeRequest.rejectionReason}</p>
                    )}
                  </AlertDescription>
                </Alert>
                {getStatusBadge(upgradeRequest.status)}
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
            const isSelected = selectedTier === tierInfo.tier;
            
            return (
              <Card
                key={tierInfo.tier}
                className={`relative transition-all ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''} ${isCurrent ? 'opacity-50' : 'hover-elevate cursor-pointer'}`}
                onClick={() => !isCurrent && setSelectedTier(tierInfo.tier)}
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
        {!upgradeRequest && selectedTier && selectedTier !== currentTier && (
          <div className="mb-8">
            <Button
              onClick={handleTierUpgradeRequest}
              disabled={createUpgradeRequestMutation.isPending}
              size="lg"
              className="w-full md:w-auto"
              data-testid="button-submit-upgrade-request"
            >
              {createUpgradeRequestMutation.isPending ? 'Submitting...' : `Request Upgrade to ${selectedTier}`}
            </Button>
          </div>
        )}

        {/* Document Upload Section */}
        {upgradeRequest && upgradeRequest.status === 'pending' && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <Upload className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-base">Upload Documents</CardTitle>
                  <CardDescription className="text-xs">
                    Upload supporting documents for tier upgrade verification
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Required Documents</AlertTitle>
                  <AlertDescription>
                    Please upload the same documents required for seller verification to verify your business
                    and unlock premium features.
                  </AlertDescription>
                </Alert>

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

        {/* Information */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Select Your Tier</p>
                <p className="text-sm text-muted-foreground">Choose the membership level that fits your needs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Submit Request</p>
                <p className="text-sm text-muted-foreground">Click the upgrade button to submit your request</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Upload Documents</p>
                <p className="text-sm text-muted-foreground">Provide required business verification documents</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">4</span>
                </div>
              </div>
              <div>
                <p className="font-medium">Get Approved</p>
                <p className="text-sm text-muted-foreground">Our team reviews and approves within 1-2 business days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
