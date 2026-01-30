import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, User, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Onboarding() {
    const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    const handleComplete = async () => {
        setIsSubmitting(true);
        try {
            await apiRequest('POST', '/api/complete-onboarding', { role: selectedRole });
            queryClient.invalidateQueries({ queryKey: ['auth-user'] });
            toast({
                title: "Welcome!",
                description: `Your account as a ${selectedRole} has been set up.`,
            });
            setLocation('/dashboard');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to complete onboarding. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-lg shadow-xl border-t-4 border-t-primary">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">One Last Step!</CardTitle>
                    <CardDescription className="text-lg">
                        Tell us how you plan to use Fusion Mining Limited.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <button
                            onClick={() => setSelectedRole('buyer')}
                            className={`relative flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all duration-200 ${selectedRole === 'buyer'
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-muted bg-card hover:border-primary/50'
                                }`}
                        >
                            <div className={`p-4 rounded-full ${selectedRole === 'buyer' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                                <User className="h-8 w-8" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg">Buyer</p>
                                <p className="text-sm text-muted-foreground">I want to browse projects and invest.</p>
                            </div>
                            {selectedRole === 'buyer' && (
                                <CheckCircle2 className="absolute top-3 right-3 h-6 w-6 text-primary" />
                            )}
                        </button>

                        <button
                            onClick={() => setSelectedRole('seller')}
                            className={`relative flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all duration-200 ${selectedRole === 'seller'
                                ? 'border-primary bg-primary/5 shadow-md'
                                : 'border-muted bg-card hover:border-primary/50'
                                }`}
                        >
                            <div className={`p-4 rounded-full ${selectedRole === 'seller' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                                <Store className="h-8 w-8" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg">Seller</p>
                                <p className="text-sm text-muted-foreground">I want to list mining assets and projects.</p>
                            </div>
                            {selectedRole === 'seller' && (
                                <CheckCircle2 className="absolute top-3 right-3 h-6 w-6 text-primary" />
                            )}
                        </button>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                        <div className="mt-1 p-1 bg-primary/10 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Don't worry! You can still change your role later in your profile settings or by contacting support.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full h-12 text-lg font-semibold"
                        size="lg"
                        onClick={handleComplete}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Setting up..." : "Complete Setup"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
