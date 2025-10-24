// Terms of Service legal page
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LegalTerms() {
  return (
    <div className="flex flex-col">
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-display mb-4" data-testid="text-page-title">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: October 2024
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                By accessing and using the Fusion Mining Limited platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>2. Use of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                Our platform provides a marketplace for mining investment opportunities, mineral trading, and partnership connections. You agree to use the service only for lawful purposes and in accordance with these Terms.
              </p>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service in any way that violates any applicable law or regulation</li>
                <li>Impersonate or attempt to impersonate the Company, another user, or any other person</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                <li>Use any automated means to access the service for any purpose without our express written permission</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding your account credentials.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>4. Transactions and Listings</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                All marketplace listings must be accurate and comply with applicable mining regulations. Fusion Mining Limited acts as a platform provider and is not party to any transactions between users. We do not guarantee the quality, safety, or legality of items listed.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>5. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                In no event shall Fusion Mining Limited be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or other intangible losses.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>6. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. Your continued use of the service following the posting of any changes constitutes acceptance of those changes.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>7. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@fusionmining.com<br />
                Address: Lusaka, Zambia
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
