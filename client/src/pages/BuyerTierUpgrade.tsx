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
import { Link } from "wouter";
import { motion } from "framer-motion";
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
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Building2,
  Users,
  Receipt,
  Download,
  ArrowLeft
} from "lucide-react";

type DocumentType =
  | 'mineral_trading_permit'
  | 'certificate_of_incorporation'
  | 'company_profile'
  | 'shareholder_list'
  | 'tax_certificate'
  | 'relevant_documents'
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
  documentCount?: number;
  documents?: Array<{
    id: string;
    documentType: DocumentType;
    fileName: string;
    uploadedAt: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

interface PendingDocument {
  file: File;
  documentType: DocumentType;
  id: string;
}

interface PaymentMethod {
  id: string;
  method: string;
  name: string;
  description: string;
  instructions: string;
  accountDetails: any;
  currencyCode: string;
  currencyName: string;
}

interface TierUpgradePayment {
  id: string;
  upgradeRequestId: string;
  userId: string;
  requestedTier: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: string;
  proofOfPaymentUrl?: string;
  submittedAt: string;
  amountUSD?: number;
  exchangeRate?: number;
  formattedAmount?: string;
  paymentMethodDetails?: {
    name: string;
    currencyCode: string;
    currencyName: string;
  };
}

export default function BuyerTierUpgrade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [activeUpload, setActiveUpload] = useState<{ type: DocumentType, label: string } | null>(null);

  // Payment flow state
  const [currentStep, setCurrentStep] = useState<'documents' | 'payment' | 'proof'>('documents');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [proofOfPaymentFile, setProofOfPaymentFile] = useState<File | null>(null);
  const [createdPayment, setCreatedPayment] = useState<TierUpgradePayment | null>(null);
  const [currentUpgradeRequestId, setCurrentUpgradeRequestId] = useState<string | null>(null);

  // Fetch current tier upgrade request
  const { data: upgradeRequest, isLoading } = useQuery<TierUpgradeRequest | null>({
    queryKey: ['/api/buyer/tier-upgrade-request'],
    enabled: !!user, // Temporarily enable for all authenticated users
  });

  // Fetch payment methods
  const { data: paymentMethods } = useQuery<PaymentMethod[]>({
    queryKey: ['/api/payment-methods'],
  });

  // Fetch upgrade history
  const { data: upgradeHistory } = useQuery<TierUpgradeRequest[]>({
    queryKey: ['/api/buyer/tier-upgrade/history'],
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
        setSubmitting(false);
        return;
      }

      setCurrentUpgradeRequestId(upgradeId);

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

        if (uploadCount > 0) {
          toast({
            title: "Documents Uploaded",
            description: `Successfully uploaded ${uploadCount} documents.`,
          });
        }
      }

      // Move to payment step
      setCurrentStep('payment');
      setSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['/api/buyer/tier-upgrade-request'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create upgrade request. Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    },
  });

  // Create payment mutation
  const createPaymentMutation = useMutation({
    mutationFn: (paymentData: { upgradeRequestId: string; paymentMethod: string; amount: number }) =>
      apiRequest('POST', '/api/buyer/tier-upgrade/payment', paymentData),
    onSuccess: async (response) => {
      const data = await response.json();
      setCreatedPayment(data);
      setCurrentStep('proof');
      toast({
        title: "Payment Method Selected",
        description: "Please upload proof of payment to complete your request.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create payment record. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Upload proof of payment mutation
  const uploadProofMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const paymentId = formData.get('paymentId') as string;
      const response = await fetch(`/api/buyer/tier-upgrade/payment/${paymentId}/proof`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to upload proof');
      }
      return response.json();
    },
    onSuccess: async () => {
      // Submit the upgrade request after uploading proof
      try {
        await apiRequest('POST', '/api/buyer/tier-upgrade/submit', { requestId: currentUpgradeRequestId });
        toast({
          title: "Success!",
          description: "Proof of payment uploaded and tier upgrade request submitted successfully. We'll review your request within 1-2 business days.",
        });
      } catch (error) {
        toast({
          title: "Partial Success",
          description: "Proof uploaded but request submission failed. Please contact support.",
          variant: "destructive",
        });
      }

      setModalOpen(false);
      setCurrentStep('documents');
      setSelectedPaymentMethod("");
      setProofOfPaymentFile(null);
      setCreatedPayment(null);
      setPendingDocuments([]);
      setSelectedTier("");
      setCurrentUpgradeRequestId(null);
      queryClient.invalidateQueries({ queryKey: ['/api/buyer/tier-upgrade-request'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload proof of payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRemoveDocument = (id: string) => {
    setPendingDocuments(pendingDocuments.filter(doc => doc.id !== id));
  };

  const documentTypeLabels: Record<DocumentType, string> = {
    mineral_trading_permit: 'Mineral Trading Permit',
    certificate_of_incorporation: 'Certificate of Incorporation',
    company_profile: 'Company Profile',
    shareholder_list: 'Shareholder/Director List',
    tax_certificate: 'Tax Certificate',
    relevant_documents: 'Other Relevant Documents',
    letter_of_authorization: 'Letter of Authorization',
    director_id: 'Director ID',
  };

  const handleSubmitUpgrade = async () => {
    const mandatoryTypes: DocumentType[] = [
      'mineral_trading_permit',
      'certificate_of_incorporation',
      'company_profile',
      'shareholder_list',
      'tax_certificate'
    ];

    const uploadedTypes = new Set([
      ...(upgradeRequest?.documents?.map(d => d.documentType) || []),
      ...pendingDocuments.map(d => d.documentType)
    ]);

    const missingTypes = mandatoryTypes.filter(type => !uploadedTypes.has(type));

    if (missingTypes.length > 0) {
      toast({
        title: "Missing Mandatory Documents",
        description: `Please upload the following mandatory documents: ${missingTypes.map(t => documentTypeLabels[t]).join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    createUpgradeRequestMutation.mutate(selectedTier);
  };

  const handleSelectPaymentMethod = () => {
    const requestId = upgradeRequest?.id || currentUpgradeRequestId;

    if (!requestId) {
      toast({
        title: "Error",
        description: "No upgrade request found. Please try again.",
        variant: "destructive",

      });
      return;
    }

    const tier = membershipTiers.find(t => t.tier === (selectedTier || upgradeRequest?.requestedTier));
    const usdAmount = tier?.tier === 'standard' ? 50 : tier?.tier === 'premium' ? 200 : 0;

    createPaymentMutation.mutate({
      upgradeRequestId: requestId,
      paymentMethod: selectedPaymentMethod,
      amount: usdAmount,
    });
  };

  const handleResume = () => {
    if (!upgradeRequest) return;
    setSelectedTier(upgradeRequest.requestedTier);
    setCurrentUpgradeRequestId(upgradeRequest.id);

    // If documents are already uploaded, jump to payment
    if (upgradeRequest.documentCount && upgradeRequest.documentCount > 0) {
      setCurrentStep('payment');
    } else {
      setCurrentStep('documents');
    }

    setModalOpen(true);
  };

  const handleUploadProof = () => {
    if (!proofOfPaymentFile || !createdPayment?.id) {
      toast({
        title: "Error",
        description: "Please select a proof of payment file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('proofOfPayment', proofOfPaymentFile);
    formData.append('paymentId', createdPayment.id);

    uploadProofMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending Review</Badge>;
      case 'draft':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="secondary">No Active Request</Badge>;
    }
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
  const selectedTierInfo = membershipTiers.find(t => t.tier === (selectedTier || upgradeRequest?.requestedTier));

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      {/* Premium Header */}
      <section className="py-8 border-b bg-gradient-to-r from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground mb-2" data-testid="text-page-title">
                Membership Tiers
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg">
                Unlock exclusive trading capabilities, market insights, and priority verification
              </p>
            </div>
            {currentTier !== 'premium' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden md:block"
              >
                <Badge variant="outline" className="px-4 py-1.5 text-sm bg-primary/5 border-primary/20 text-primary uppercase tracking-wider font-semibold">
                  Current Plan: <span className="font-bold ml-1 capitalize">{currentTier}</span>
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Status Alert/Card */}
        {upgradeRequest && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Card className="border-primary/20 bg-primary/5 overflow-hidden relative shadow-md">
              <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                <TrendingUp className="h-32 w-32 text-primary rotate-12" />
              </div>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">Upgrade Request Status</h3>
                      {getStatusBadge(upgradeRequest.status)}
                    </div>
                    <p className="text-muted-foreground max-w-2xl text-base">
                      {upgradeRequest.status === 'draft' && `You have a draft application for ${upgradeRequest.requestedTier} tier. Please complete the document submission.`}
                      {upgradeRequest.status === 'pending' && `Your application for ${upgradeRequest.requestedTier} tier is under review by our team.`}
                      {upgradeRequest.status === 'approved' && `Congratulations! Your upgrade to ${upgradeRequest.requestedTier} has been approved.`}
                      {upgradeRequest.status === 'rejected' && `Application rejected. Reason: ${upgradeRequest.rejectionReason}`}
                    </p>
                  </div>

                  {upgradeRequest.status === 'draft' && (
                    <Button onClick={handleResume} size="lg" className="shadow-lg font-semibold px-8">
                      Resume Application
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tiers Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {membershipTiers.map((tierInfo) => {
            const Icon = tierInfo.icon;
            const isCurrent = currentTier === tierInfo.tier;
            const isSelected = selectedTier === tierInfo.tier || upgradeRequest?.requestedTier === tierInfo.tier;
            const isPopular = tierInfo.tier === 'standard';
            const isPremium = tierInfo.tier === 'premium';

            // Determination of header styling
            let headerBg = "bg-muted/30";
            let borderColor = "border-border";
            let shadowClass = "shadow-sm hover:shadow-md";

            if (isPremium) {
              headerBg = "bg-gradient-to-br from-amber-500/10 to-transparent";
              borderColor = "border-amber-500/30";
              shadowClass = "shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10";
            } else if (isPopular) {
              headerBg = "bg-gradient-to-br from-blue-500/10 to-transparent";
              borderColor = "border-blue-500/30";
              shadowClass = "shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 scale-[1.02] z-10";
            }

            return (
              <motion.div variants={item} key={tierInfo.tier} className="h-full flex">
                <Card
                  className={`relative overflow-hidden transition-all duration-300 w-full flex flex-col ${borderColor} ${shadowClass} ${isCurrent ? 'bg-muted/5' : 'bg-card'}`}
                >
                  {isPopular && !isCurrent && (
                    <div className="absolute top-0 right-0 z-20">
                      <div className="text-[10px] font-bold bg-blue-600 text-white px-3 py-1 rounded-bl-xl shadow-sm tracking-wider uppercase">
                        Most Popular
                      </div>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute top-0 right-0 z-20">
                      <div className="text-[10px] font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                        Current Plan
                      </div>
                    </div>
                  )}

                  <div className={`p-6 md:p-8 ${headerBg} border-b ${borderColor}/50`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${isPremium ? 'bg-amber-100/80 text-amber-600' : isPopular ? 'bg-blue-100/80 text-blue-600' : 'bg-white text-slate-600'}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tierInfo.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{tierInfo.price.split('/')[0]}</span>
                      {tierInfo.price.includes('/') && <span className="text-muted-foreground font-medium">/{tierInfo.price.split('/')[1]}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-2 min-h-[40px]">
                      {isPremium ? 'For enterprise-scale trading operations requiring dedicated support.' : isPopular ? 'Advanced tools for growing businesses and active traders.' : 'Essential features to get started.'}
                    </p>
                  </div>

                  <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="space-y-4 flex-1 mb-8">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Includes:</p>
                      {tierInfo.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${isPremium ? 'bg-amber-100 text-amber-600' : isPopular ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-sm text-foreground/80 leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => {
                        const canUpgrade = !isCurrent && (!upgradeRequest || upgradeRequest.status === 'approved' || upgradeRequest.status === 'rejected');
                        if (canUpgrade) {
                          setSelectedTier(tierInfo.tier);
                          setModalOpen(true);
                          if (upgradeRequest?.requestedTier === tierInfo.tier && upgradeRequest.status === 'draft') {
                            handleResume();
                          }
                        }
                      }}
                      disabled={isCurrent || (!!upgradeRequest && upgradeRequest.status !== 'approved' && upgradeRequest.status !== 'rejected' && upgradeRequest.requestedTier !== tierInfo.tier)}
                      variant={isCurrent ? "outline" : "default"}
                      className={`w-full h-12 text-base font-semibold transition-all ${isPremium ? 'bg-amber-600 hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/20' : isPopular ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20' : ''}`}
                    >
                      {isCurrent ? 'Current Plan' : upgradeRequest?.requestedTier === tierInfo.tier && upgradeRequest.status === 'draft' ? 'Resume Application' : `Get ${tierInfo.name}`}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* History Section */}
        {upgradeHistory && upgradeHistory.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4 px-1">Application History</h2>
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border/50 text-left">
                      <th className="p-4 font-medium text-muted-foreground">Date</th>
                      <th className="p-4 font-medium text-muted-foreground">Tier</th>
                      <th className="p-4 font-medium text-muted-foreground">Status</th>
                      <th className="p-4 font-medium text-muted-foreground text-right">Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upgradeHistory.map((req) => (
                      <tr key={req.id} className="border-b border-border/50 last:border-0 hover:bg-muted/5 transition-colors">
                        <td className="p-4 font-medium">{new Date(req.submittedAt || (req as any).createdAt || new Date()).toLocaleDateString()}</td>
                        <td className="p-4 capitalize">{req.requestedTier}</td>
                        <td className="p-4">{getStatusBadge(req.status)}</td>
                        <td className="p-4 text-right text-muted-foreground">{new Date((req as any).updatedAt || (req as any).createdAt || new Date()).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">

          {/* Header */}
          <div className="p-6 border-b bg-muted/30 flex-none bg-background">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {currentStep === 'documents' && `Upgrade to ${selectedTierInfo?.name}`}
                {currentStep === 'payment' && 'Select Payment Method'}
                {currentStep === 'proof' && 'Upload Proof of Payment'}
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                {currentStep === 'documents' && 'Complete your business verification to unlock this tier.'}
                {currentStep === 'payment' && 'Secure payment processing via our supported gateways.'}
                {currentStep === 'proof' && 'Upload your payment receipt for final validation.'}
              </DialogDescription>
            </DialogHeader>

            {/* Stepper */}
            <div className="mt-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 rounded-full" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 rounded-full transition-all duration-500"
                style={{ width: currentStep === 'payment' ? '50%' : currentStep === 'proof' ? '100%' : '0%' }}
              />
              <div className="relative flex justify-between">
                {['Documents', 'Payment', 'Proof'].map((step, idx) => {
                  const isActive = (currentStep === 'documents' && idx === 0) || (currentStep === 'payment' && idx <= 1) || (currentStep === 'proof' && idx <= 2);
                  const isCompleted = (currentStep === 'payment' && idx === 0) || (currentStep === 'proof' && idx <= 1);

                  return (
                    <div key={step} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${isActive ? (isCompleted ? 'bg-primary border-primary text-white' : 'bg-background border-primary text-primary') : 'bg-background border-muted text-muted-foreground'}`}>
                        {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{step}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-background flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Tier Summary */}
              <div className="bg-muted/30 p-4 rounded-xl border border-border/50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Selected Plan</p>
                  <p className="text-lg font-bold text-foreground">{selectedTierInfo?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p className="text-lg font-bold text-primary">{selectedTierInfo?.price}</p>
                </div>
              </div>

              {/* Documents content */}
              {currentStep === 'documents' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { type: 'mineral_trading_permit' as DocumentType, label: 'Mineral Trading Permit', icon: ShieldCheck, description: 'Valid permit issued by the Ministry of Mines' },
                      { type: 'certificate_of_incorporation' as DocumentType, label: 'Certificate of Incorporation', icon: FileText, description: 'Official company registration certificate' },
                      { type: 'company_profile' as DocumentType, label: 'Company Profile', icon: Building2, description: 'Overview of company operations and history' },
                      { type: 'shareholder_list' as DocumentType, label: 'Shareholder/Director List', icon: Users, description: 'List of all directors and shareholders' },
                      { type: 'tax_certificate' as DocumentType, label: 'Tax Certificate', icon: Receipt, description: 'Valid TPIN or Tax Clearance Certificate' }
                    ].map((req) => {
                      const Icon = req.icon;
                      const pendingFile = pendingDocuments.find(d => d.documentType === req.type);
                      const uploadedFile = upgradeRequest?.documents?.find(d => d.documentType === req.type);
                      const isHandled = !!pendingFile || !!uploadedFile;

                      return (
                        <div
                          key={req.type}
                          className={`group relative p-4 rounded-xl border transition-all duration-300 ${isHandled ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50' : 'bg-card border-border hover:border-primary/50 hover:bg-muted/20'}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-colors ${isHandled ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="space-y-0.5">
                                <h4 className={`text-sm font-bold ${isHandled ? 'text-emerald-900 dark:text-emerald-300' : 'text-foreground'}`}>
                                  {req.label}
                                </h4>
                                <p className="text-xs text-muted-foreground max-w-[280px]">
                                  {req.description}
                                </p>
                                {(pendingFile || uploadedFile) && (
                                  <div className="flex items-center gap-2 mt-2 px-2 py-1 bg-white/80 dark:bg-background border border-emerald-100 dark:border-emerald-900 rounded-md w-fit shadow-sm">
                                    <FileText className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300 truncate max-w-[150px]">
                                      {pendingFile?.file.name || uploadedFile?.fileName}
                                    </span>
                                    {pendingFile && (
                                      <button
                                        onClick={() => handleRemoveDocument(pendingFile.id)}
                                        className="ml-1 p-0.5 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-full text-rose-500 transition-colors"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              {isHandled ? (
                                <Badge variant="outline" className="bg-emerald-100/50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900 text-[10px] font-bold">
                                  <Check className="h-3 w-3 mr-1" /> READY
                                </Badge>
                              ) : (
                                <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[10px] font-bold uppercase">Required</div>
                              )}
                              <div className="relative">
                                <input
                                  type="file"
                                  id={`file-${req.type}`}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const newDoc: PendingDocument = {
                                        file,
                                        documentType: req.type,
                                        id: Math.random().toString(36).substr(2, 9),
                                      };
                                      setPendingDocuments(prev => [
                                        ...prev.filter(d => d.documentType !== req.type),
                                        newDoc
                                      ]);
                                    }
                                  }}
                                />
                                <Button
                                  variant={isHandled ? "ghost" : "outline"}
                                  size="sm"
                                  className={`h-8 text-xs font-bold ${isHandled ? 'text-primary hover:bg-primary/10' : 'border-primary/20 text-primary hover:bg-primary hover:text-white'}`}
                                  onClick={() => setActiveUpload({ type: req.type, label: req.label })}
                                >
                                  {isHandled ? 'Change' : 'Upload'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* Other Documents Section */}
                    <div className="mt-2 p-4 rounded-xl border border-dashed border-border bg-muted/10 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Additional Documents</h4>
                          <p className="text-[10px] text-muted-foreground/80">Any other files relevant to your application</p>
                        </div>
                        <input
                          type="file"
                          id="file-relevant"
                          className="hidden"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const newDocs: PendingDocument[] = files.map(file => ({
                              file,
                              documentType: 'relevant_documents',
                              id: Math.random().toString(36).substr(2, 9),
                            }));
                            setPendingDocuments(prev => [...prev, ...newDocs]);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] font-bold text-primary hover:bg-primary/10"
                          onClick={() => document.getElementById('file-relevant')?.click()}
                        >
                          <Check className="h-3 w-3 mr-1" /> Add Files
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {pendingDocuments.filter(d => d.documentType === 'relevant_documents').map(doc => (
                          <div key={doc.id} className="flex items-center gap-1.5 px-2 py-1 bg-background border border-border rounded-lg shadow-sm">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] font-medium text-foreground truncate max-w-[100px]">{doc.file.name}</span>
                            <button onClick={() => handleRemoveDocument(doc.id)} className="text-rose-400 hover:text-rose-600">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select Payment Method</Label>
                    <div className="grid gap-3">
                      {paymentMethods?.map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedPaymentMethod === method.method
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-primary/50 hover:bg-muted/10'
                            }`}
                          onClick={() => setSelectedPaymentMethod(method.method)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${selectedPaymentMethod === method.method ? 'bg-background shadow-sm' : 'bg-muted'}`}>
                              {method.method === 'bank_transfer' && <Banknote className="h-6 w-6 text-blue-600" />}
                              {method.method === 'airtel_money' && <Smartphone className="h-6 w-6 text-green-600" />}
                              {method.method === 'wechat_alipay' && <CreditCard className="h-6 w-6 text-purple-600" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm">{method.name}</p>
                              <p className="text-xs text-muted-foreground">{method.description}</p>
                            </div>
                            {selectedPaymentMethod === method.method && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Method Details + QR Codes */}
                  {selectedPaymentMethod && (
                    <div className="bg-muted/30 p-5 rounded-xl border border-border/50 animate-in fade-in zoom-in-95">
                      <p className="text-sm font-medium mb-3">Payment Instructions</p>
                      <div className="prose prose-sm text-xs text-muted-foreground bg-background p-4 rounded-lg border border-border">
                        {paymentMethods?.find(m => m.method === selectedPaymentMethod)?.instructions}
                      </div>

                      {/* QR Codes */}
                      {selectedPaymentMethod === 'wechat_alipay' && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          {paymentMethods?.find(m => m.method === 'wechat_alipay')?.accountDetails?.wechatQrCode && (
                            <div className="text-center bg-white p-3 rounded-lg border shadow-sm">
                              <p className="text-xs font-bold mb-2 text-[#07C160]">WeChat Pay</p>
                              <img src={paymentMethods.find(m => m.method === 'wechat_alipay')?.accountDetails?.wechatQrCode} className="mx-auto rounded" alt="WeChat QR" />
                            </div>
                          )}
                          {paymentMethods?.find(m => m.method === 'wechat_alipay')?.accountDetails?.alipayQrCode && (
                            <div className="text-center bg-white p-3 rounded-lg border shadow-sm">
                              <p className="text-xs font-bold mb-2 text-[#1677FF]">Alipay</p>
                              <img src={paymentMethods.find(m => m.method === 'wechat_alipay')?.accountDetails?.alipayQrCode} className="mx-auto rounded" alt="Alipay QR" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Conversion Notice */}
                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3 text-blue-700 dark:text-blue-300">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <div className="text-xs">
                          <p className="font-bold mb-1">Currency Conversion Required</p>
                          <p>Please pay the equivalent of <span className="font-bold">${selectedTierInfo?.tier === 'standard' ? '50' : selectedTierInfo?.tier === 'premium' ? '200' : '0'} USD</span> in your local currency at today's rate.</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Proof Step */}
              {currentStep === 'proof' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="border border-dashed border-border rounded-xl p-8 text-center bg-muted/10">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Upload Proof of Payment</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">Please upload a clear screenshot or photo of your payment receipt.</p>

                    <Input
                      id="proof-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => setProofOfPaymentFile(e.target.files?.[0] || null)}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {proofOfPaymentFile && (
                    <div className="flex items-center gap-3 p-3 bg-primary/10 text-primary border border-primary/20 rounded-lg justify-center">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium text-sm">{proofOfPaymentFile.name}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="p-6 bg-muted/30 border-t flex-none flex justify-between gap-3">
            {currentStep === 'documents' && (
              <>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    setPendingDocuments([]);
                    setCurrentStep('documents');
                  }}
                  variant="ghost"
                  data-testid="button-cancel-upgrade"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitUpgrade}
                  disabled={submitting || pendingDocuments.length === 0}
                  data-testid="button-submit-upgrade-modal"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px]"
                >
                  {submitting ? 'Submitting...' : 'Continue to Payment'}
                </Button>
              </>
            )}
            {currentStep === 'payment' && (
              <>
                <Button onClick={() => setCurrentStep('documents')} variant="outline">Back</Button>
                <Button onClick={handleSelectPaymentMethod} disabled={!selectedPaymentMethod || createPaymentMutation.isPending} className="min-w-[140px]">
                  {createPaymentMutation.isPending ? 'Processing...' : 'Continue to Proof'}
                </Button>
              </>
            )}
            {currentStep === 'proof' && (
              <>
                <Button onClick={() => setCurrentStep('payment')} variant="outline">Back</Button>
                <Button onClick={handleUploadProof} disabled={!proofOfPaymentFile || uploadProofMutation.isPending} className="min-w-[140px]">
                  {uploadProofMutation.isPending ? 'Uploading...' : 'Submit Request'}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeUpload} onOpenChange={(open) => !open && setActiveUpload(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-950 border-0 shadow-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white text-center">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
              <Upload className="h-8 w-8" />
            </div>
            <DialogTitle className="text-xl font-bold">{activeUpload?.label}</DialogTitle>
          </div>
          <div className="p-6">
            <div
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 cursor-pointer transition-colors"
              onClick={() => document.getElementById('dialog-file-input')?.click()}
            >
              <input
                type="file"
                id="dialog-file-input"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && activeUpload) {
                    const newDoc: PendingDocument = {
                      file,
                      documentType: activeUpload.type,
                      id: Math.random().toString(36).substr(2, 9),
                    };
                    setPendingDocuments(prev => [
                      ...prev.filter(d => d.documentType !== activeUpload.type),
                      newDoc
                    ]);
                    setActiveUpload(null);
                    toast({
                      title: "Document Added",
                      description: `${activeUpload.label} has been staged.`,
                    });
                  }
                }}
              />
              <Upload className="h-8 w-8 mx-auto text-indigo-400 mb-2" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Click to Upload</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
