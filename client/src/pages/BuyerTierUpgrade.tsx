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
  FileText,
  CheckCircle2,
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
        title: "Upgrade Request Created",
        description: "Please upload your required documents below.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/buyer/tier-upgrade-request'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create upgrade request. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit tier upgrade request mutation
  const submitUpgradeRequestMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/buyer/tier-upgrade/submit'),
    onSuccess: () => {
      toast({
        title: "Upgrade Request Submitted",
        description: "Your tier upgrade request has been submitted for review. We'll get back to you within 1-2 business days.",
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
      case 'draft':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Not Requested</Badge>;
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

  const documentDescriptions: Record<DocumentType, string> = {
    certificate_of_incorporation: 'Official document proving your company is registered',
    company_profile: 'Details about your company, business focus, and operations',
    shareholder_list: 'List of all shareholders/directors and their ownership percentages',
    tax_certificate: 'Current tax registration and compliance certificate',
    letter_of_authorization: 'Authorization letter from the company (required if you are not a director or shareholder)',
    director_id: 'National ID or passport of the company director/authorized representative',
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

        {/* Step 1: Select Your Tier */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <CardTitle className="text-base">Select Your Tier</CardTitle>
                <CardDescription className="text-xs">
                  Choose the membership level that fits your needs
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tierInfo) => {
                const Icon = tierInfo.icon;
                const isCurrent = currentTier === tierInfo.tier;
                const isSelected = selectedTier === tierInfo.tier || upgradeRequest?.requestedTier === tierInfo.tier;
                
                return (
                  <Card
                    key={tierInfo.tier}
                    className={`relative transition-all ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''} ${isCurrent ? 'opacity-50 cursor-not-allowed' : 'hover-elevate cursor-pointer'}`}
                    onClick={() => !isCurrent && !upgradeRequest && setSelectedTier(tierInfo.tier)}
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

            {/* Request Upgrade Button - Step 1 Action */}
            {!upgradeRequest && selectedTier && selectedTier !== currentTier && (
              <div className="mt-6">
                <Button
                  onClick={() => createUpgradeRequestMutation.mutate(selectedTier)}
                  disabled={createUpgradeRequestMutation.isPending}
                  size="lg"
                  className="w-full md:w-auto"
                  data-testid="button-request-upgrade"
                >
                  {createUpgradeRequestMutation.isPending ? 'Creating Request...' : `Request Upgrade to ${selectedTier}`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Upload Documents */}
        {upgradeRequest && upgradeRequest.status !== 'approved' && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Upload Documents</CardTitle>
                    <CardDescription className="text-xs">
                      Provide required business verification documents
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
                      Please upload all the following documents to complete your tier upgrade request.
                    </AlertDescription>
                  </Alert>

                  {/* Required Documents List */}
                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 rounded-md bg-muted/50">
                      <div className="flex-shrink-0 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">a) Company Certificate of Incorporation</p>
                        <p className="text-xs text-muted-foreground">
                          {documentDescriptions.certificate_of_incorporation}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-md bg-muted/50">
                      <div className="flex-shrink-0 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">b) Company Profile</p>
                        <p className="text-xs text-muted-foreground">
                          {documentDescriptions.company_profile}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-md bg-muted/50">
                      <div className="flex-shrink-0 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">c) Shareholder/Director List</p>
                        <p className="text-xs text-muted-foreground">
                          {documentDescriptions.shareholder_list}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-md bg-muted/50">
                      <div className="flex-shrink-0 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">d) Tax Certificate</p>
                        <p className="text-xs text-muted-foreground">
                          {documentDescriptions.tax_certificate}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50">
                      <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">e) Letter of Authorization</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {documentDescriptions.letter_of_authorization}
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300 italic">
                          Note: If you are a director or shareholder of the company, you may skip this document. Otherwise, you must provide a letter from a director or authorized person giving you permission to register and manage this account on behalf of the company.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload Section */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-chart-1/10 rounded-lg">
                    <Upload className="h-5 w-5 text-chart-1" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Upload Documents</CardTitle>
                    <CardDescription className="text-xs">
                      Select and upload your verification documents
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

            {/* Uploaded Documents */}
            {upgradeRequest.documents && upgradeRequest.documents.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-chart-2/10 rounded-lg">
                      <FileText className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Uploaded Documents</CardTitle>
                      <CardDescription className="text-xs">
                        Documents submitted for your upgrade request ({upgradeRequest.documents.length})
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upgradeRequest.documents.map((doc) => (
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

            {/* Step 3: Submit Request */}
            {(upgradeRequest.status === 'draft' || upgradeRequest.status === 'rejected') && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Submit Request</CardTitle>
                      <CardDescription className="text-xs">
                        Click the button below to submit your upgrade request
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => submitUpgradeRequestMutation.mutate()}
                    disabled={submitUpgradeRequestMutation.isPending}
                    size="lg"
                    className="w-full"
                    data-testid="button-submit-upgrade"
                  >
                    {submitUpgradeRequestMutation.isPending ? 'Submitting...' : 'Submit Upgrade Request'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Step 4: Get Approved - Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <CardTitle className="text-base">Get Approved</CardTitle>
                <CardDescription className="text-xs">
                  Our team reviews and approves your request
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">Our team will review your documents within 1-2 business days</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">Once approved, your new tier will be activated immediately</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">You'll receive an email notification when your upgrade is complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
