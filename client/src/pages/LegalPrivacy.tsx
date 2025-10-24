// Privacy Policy legal page
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LegalPrivacy() {
  return (
    <div className="flex flex-col">
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-display mb-4" data-testid="text-page-title">
            Privacy Policy
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
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                We collect several types of information to provide and improve our service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company details</li>
                <li><strong>Account Information:</strong> Username, profile information, authentication data</li>
                <li><strong>Transaction Data:</strong> Listing details, buyer requests, partnership inquiries</li>
                <li><strong>Communication Data:</strong> Messages sent through our platform</li>
                <li><strong>Usage Data:</strong> Access times, pages viewed, features used</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>We use the collected information for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To facilitate marketplace transactions between users</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                The security of your data is important to us. We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With other users when you create marketplace listings or express interest in projects</li>
                <li>With service providers who assist us in operating the platform</li>
                <li>To comply with legal obligations</li>
                <li>To protect the rights and safety of Fusion Mining Limited and our users</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Data Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Data portability</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p>
                Email: privacy@fusionmining.com<br />
                Address: Lusaka, Zambia
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
