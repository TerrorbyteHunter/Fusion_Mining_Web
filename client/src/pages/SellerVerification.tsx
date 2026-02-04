import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  Shield,
  AlertCircle,
  Check,
  Building2,
  Users,
  Receipt,
  ShieldCheck,
  ArrowRight,
  Info,
  ExternalLink,
} from "lucide-react";

type VerificationStatus = 'draft' | 'pending' | 'approved' | 'rejected';

type DocumentType =
  | 'certificate_of_incorporation'
  | 'company_profile'
  | 'shareholder_list'
  | 'tax_certificate'
  | 'letter_of_authorization'
  | 'director_id'
  | 'relevant_documents';

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

const documentTypeLabels: Record<DocumentType, string> = {
  certificate_of_incorporation: 'Certificate of Incorporation',
  company_profile: 'Company Profile',
  shareholder_list: 'Shareholder/Director List',
  tax_certificate: 'Tax Certificate (TPIN)',
  letter_of_authorization: 'Letter of Authorization',
  director_id: 'Director ID/Passport',
  relevant_documents: 'Other Relevant Documents',
};

const documentDescriptions: Record<DocumentType, string> = {
  certificate_of_incorporation: 'Official company registration certificate from PACRA or relevant authority.',
  company_profile: 'A detailed overview of your company, operations, and business history.',
  shareholder_list: 'Current list of all shareholders and directors of the company.',
  tax_certificate: 'Valid Tax Payer Identification Number (TPIN) or Tax Clearance Certificate.',
  letter_of_authorization: 'Required if you are applying on behalf of the company and are not a director.',
  director_id: 'Valid National ID or Passport of one of the company directors.',
  relevant_documents: 'Any additional certifications, permits, or supporting evidence.',
};

export default function SellerVerification() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeUpload, setActiveUpload] = useState<{ type: DocumentType, label: string } | null>(null);
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
        title: "Verification Started",
        description: "Upload your business documents to begin the verification process.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/my-request'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start verification. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit verification mutation
  const submitVerificationMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/verification/submit'),
    onSuccess: () => {
      toast({
        title: "Verification Submitted",
        description: "Your documents are now under review. This usually takes 1-2 business days.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/verification/my-request'] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please ensure all mandatory documents are uploaded.",
        variant: "destructive",
      });
    },
  });

  // File upload handler
  const handleFileUpload = async (file: File, type: DocumentType) => {
    if (!file || !request?.id) {
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
      formData.append('file', file);
      formData.append('requestId', request.id);
      formData.append('documentType', type);

      const response = await fetch('/api/verification/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Upload failed');
      }

      toast({
        title: "Document Uploaded",
        description: `${documentTypeLabels[type]} has been uploaded successfully.`,
      });

      refetch();
      setActiveUpload(null);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="px-3 py-1">Action Required</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1">In Review</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="px-3 py-1">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="px-3 py-1">Not Started</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const mandatoryDocuments: { type: DocumentType, icon: any }[] = [
    { type: 'certificate_of_incorporation', icon: FileText },
    { type: 'company_profile', icon: Building2 },
    { type: 'shareholder_list', icon: Users },
    { type: 'tax_certificate', icon: Receipt },
    { type: 'director_id', icon: ShieldCheck },
  ];

  const totalMandatory = mandatoryDocuments.length;
  const uploadedCount = request?.documents.filter(d =>
    mandatoryDocuments.some(m => m.type === d.documentType)
  ).length || 0;
  const progressPercent = Math.round((uploadedCount / totalMandatory) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Seller Verification
            </h1>
            <p className="text-slate-500 max-w-md">
              Complete your business profile to build trust and unlock premium marketplace features.
            </p>
          </div>
          {request && (
            <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                <Shield className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Account Level</p>
                {getStatusBadge(request.status)}
              </div>
            </div>
          )}
        </div>

        {!request ? (
          <Card className="border-none shadow-xl shadow-slate-200/60 overflow-hidden rounded-3xl">
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 p-12 text-center text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-64 h-64 rotate-12" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Start Your Verification</h2>
                <p className="text-indigo-100 text-lg mb-8">
                  Get the "Verified Seller" badge, increase your listing visibility, and gain access to high-value RFQs.
                </p>
                <Button
                  size="lg"
                  onClick={() => createRequestMutation.mutate()}
                  disabled={createRequestMutation.isPending}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold h-14 px-8 rounded-2xl shadow-lg shadow-indigo-900/20"
                >
                  {createRequestMutation.isPending ? 'Initializing...' : 'Begin Process'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Status Banner */}
              {request.status === 'approved' && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex items-start gap-4">
                  <div className="bg-emerald-500 rounded-2xl p-3 text-white shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 text-lg">You're Verified!</h3>
                    <p className="text-emerald-700/80 text-sm">Your business has been successfully verified. You now have full access to all seller features.</p>
                  </div>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex items-start gap-4">
                  <div className="bg-amber-500 rounded-2xl p-3 text-white shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900 text-lg">Verification Under Review</h3>
                    <p className="text-amber-700/80 text-sm">We're reviewing your documents. You'll receive a notification once the process is complete.</p>
                  </div>
                </div>
              )}

              {request.status === 'rejected' && (
                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex items-start gap-4">
                  <div className="bg-rose-500 rounded-2xl p-3 text-white shrink-0">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-rose-900 text-lg">Resubmission Required</h3>
                    <p className="text-rose-700/80 text-sm mb-3">{request.rejectionReason || "Some documents were not accepted. Please check the requirements and re-upload."}</p>
                    <Button variant="outline" size="sm" className="bg-white border-rose-200 text-rose-700 hover:bg-rose-100 font-bold">
                      View Feedback
                    </Button>
                  </div>
                </div>
              )}

              {/* Document Checklist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800">Required Documents</h3>
                  <div className="text-sm font-medium text-slate-500">
                    {uploadedCount} of {totalMandatory} completed
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {mandatoryDocuments.map((req) => {
                    const Icon = req.icon;
                    const uploadedDoc = request.documents.find(d => d.documentType === req.type);
                    const isHandled = !!uploadedDoc;
                    const canUpload = request.status === 'draft' || request.status === 'rejected';

                    return (
                      <div
                        key={req.type}
                        className={`group relative p-5 rounded-2xl border transition-all duration-300 ${isHandled
                          ? 'bg-emerald-50/20 border-emerald-200 hover:border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md shadow-sm'
                          }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${isHandled
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                              }`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <h4 className={`text-base font-bold ${isHandled ? 'text-emerald-900' : 'text-slate-800'}`}>
                                {documentTypeLabels[req.type]}
                              </h4>
                              <p className="text-xs text-slate-500 leading-relaxed max-w-[400px]">
                                {documentDescriptions[req.type]}
                              </p>
                              {uploadedDoc && (
                                <div className="flex items-center gap-2 mt-3 px-3 py-1.5 bg-white border border-emerald-100 rounded-xl w-fit shadow-sm">
                                  <FileText className="h-3.5 w-3.5 text-emerald-600" />
                                  <span className="text-[11px] font-bold text-emerald-700 truncate max-w-[200px]">
                                    {uploadedDoc.fileName}
                                  </span>
                                  {canUpload && (
                                    <Badge variant="secondary" className="bg-emerald-50 text-[9px] h-4 uppercase tracking-tighter ml-1">Current</Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3 shrink-0">
                            {isHandled ? (
                              <div className="flex items-center gap-1 text-emerald-600">
                                <Check className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Ready</span>
                              </div>
                            ) : (
                              <div className="text-slate-300">
                                <span className="text-[10px] font-bold uppercase tracking-wider">Missing</span>
                              </div>
                            )}

                            {canUpload && (
                              <Button
                                variant={isHandled ? "outline" : "default"}
                                size="sm"
                                className={`h-9 px-4 rounded-xl font-bold text-xs transition-all ${isHandled
                                  ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                                  }`}
                                onClick={() => setActiveUpload({ type: req.type, label: documentTypeLabels[req.type] })}
                              >
                                {isHandled ? 'Update' : 'Upload'}
                                {!isHandled && <Upload className="ml-2 h-3.5 w-3.5" />}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Other Relevant Documents */}
                  <div className="mt-6 p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <ExternalLink className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-tight">Additional Documents</h4>
                          <p className="text-xs text-slate-500">Other permits, tax clearance, or trade certifications.</p>
                        </div>
                      </div>
                      {(request.status === 'draft' || request.status === 'rejected') && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-slate-300 text-slate-600 hover:bg-white font-bold h-9"
                          onClick={() => setActiveUpload({ type: 'relevant_documents', label: 'Other Relevant Documents' })}
                        >
                          Add Document
                          <Upload className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    {request.documents.filter(d => d.documentType === 'relevant_documents').length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {request.documents
                          .filter(d => d.documentType === 'relevant_documents')
                          .map(doc => (
                            <div key={doc.id} className="flex items-center gap-2 p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm">
                              <FileText className="h-4 w-4 text-indigo-500" />
                              <span className="text-xs font-medium text-slate-700 truncate flex-1">{doc.fileName}</span>
                              <Badge variant="secondary" className="h-5 text-[9px] text-slate-400">Uploaded</Badge>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats/Actions */}
            <div className="space-y-6">
              <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50 pb-4">
                  <CardTitle className="text-base font-bold text-slate-800">Completion</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="relative h-24 w-24 mx-auto">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                          className="stroke-slate-100"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="stroke-indigo-600 transition-all duration-700 ease-in-out"
                          strokeDasharray={`${progressPercent}, 100`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.5" className="fill-slate-700 text-[10px] font-bold" textAnchor="middle">
                          {progressPercent}%
                        </text>
                      </svg>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800">Verification Score</p>
                      <p className="text-xs text-slate-500 mt-1">
                        High completion rates increase buyer trust scores by up to 80%.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1.5"><Check className={`h-3.5 w-3.5 ${progressPercent > 0 ? 'text-emerald-500' : 'text-slate-200'}`} /> Profile Info</span>
                        <span className="font-bold text-slate-700">Done</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1.5"><Check className={`h-3.5 w-3.5 ${progressPercent >= 100 ? 'text-emerald-500' : 'text-slate-200'}`} /> Legal Docs</span>
                        <span className={`font-bold ${progressPercent >= 100 ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {uploadedCount}/{totalMandatory}
                        </span>
                      </div>
                    </div>

                    {(request.status === 'draft' || request.status === 'rejected') && (
                      <Button
                        onClick={() => submitVerificationMutation.mutate()}
                        disabled={submitVerificationMutation.isPending || uploadedCount < totalMandatory}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-2xl shadow-lg shadow-indigo-100"
                      >
                        {submitVerificationMutation.isPending ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    )}

                    {uploadedCount < totalMandatory && (request.status === 'draft' || request.status === 'rejected') && (
                      <p className="text-[10px] text-center text-slate-400 font-medium px-2">
                        Complete all required documents to enable submission.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5">
                <h4 className="flex items-center gap-2 text-indigo-900 font-bold mb-3">
                  <Info className="h-4 w-4" />
                  <span className="text-sm">Why Verify?</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    "Boost buyer confidence and trust",
                    "Access exclusive premium RFQs",
                    "Display verified badge on profile",
                    "Faster payment processing"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-indigo-700/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Focused Upload Dialog */}
        <Dialog open={!!activeUpload} onOpenChange={(open) => !open && !uploading && setActiveUpload(null)}>
          <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl p-0 overflow-hidden rounded-[2rem]">
            <DialogHeader className="pt-8 px-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-4 transition-transform hover:scale-105 duration-300">
                {activeUpload?.type === 'certificate_of_incorporation' && <FileText className="h-10 w-10" />}
                {activeUpload?.type === 'company_profile' && <Building2 className="h-10 w-10" />}
                {activeUpload?.type === 'shareholder_list' && <Users className="h-10 w-10" />}
                {activeUpload?.type === 'tax_certificate' && <Receipt className="h-10 w-10" />}
                {activeUpload?.type === 'director_id' && <ShieldCheck className="h-10 w-10" />}
                {activeUpload?.type === 'letter_of_authorization' && <FileText className="h-10 w-10" />}
                {activeUpload?.type === 'relevant_documents' && <Upload className="h-10 w-10" />}
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
                {activeUpload?.label}
              </DialogTitle>
              <DialogDescription className="text-slate-500 mt-2 px-4 leading-relaxed">
                {activeUpload && documentDescriptions[activeUpload.type]}
              </DialogDescription>
            </DialogHeader>

            <div className="p-8">
              <div
                className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all group ${uploading
                  ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-70'
                  : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 cursor-pointer'
                  }`}
                onClick={() => !uploading && document.getElementById('dialog-file-input')?.click()}
              >
                <input
                  type="file"
                  id="dialog-file-input"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && activeUpload) {
                      handleFileUpload(file, activeUpload.type);
                    }
                  }}
                  disabled={uploading}
                />

                {!uploading ? (
                  <>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all mb-4">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Click to Select File</p>
                    <p className="text-xs text-slate-400 mt-2">PDF, JPG, PNG or DOC (Max 20MB)</p>
                  </>
                ) : (
                  <div className="py-2 flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm font-bold text-indigo-600">Uploading Document...</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1 h-12 rounded-2xl font-bold text-slate-500 hover:bg-slate-50"
                  onClick={() => setActiveUpload(null)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
