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
            Last updated: May 1, 2026
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                By accessing or using this site, you agree to be bound by these Terms of Use, including any modifications or additional terms that <strong>Fusion Mining</strong> may publish in the future.
              </p>
              <p>
                Please read these Terms and Conditions carefully, as they apply to you when using our website. Your continued access or use of the site will be deemed as acceptance of these changes. Visitors are responsible for staying informed about changes, as compliance with them is a requirement for using this website.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>2. Platform Services & Plans</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                This website solely functions as an <strong>online platform</strong> that facilitates interactions between users. It does not directly or indirectly participate in any negotiations, sales, purchases, or transactions between users unless the user requests to involve the platform in their negotiations.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>If you have not purchased a plan, you may not have access to all website services.</li>
                <li>All products and RFQs (Request for Quotations) submitted by companies will be published on the site for a specific period and will be automatically removed afterward.</li>
                <li>Payments can only be made using the methods specified on the website.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>3. User Accounts & Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                Each user account is assigned a <strong>unique set of login credentials</strong>. Users are responsible for maintaining the security and confidentiality of their credentials and are liable for all activities performed under their accounts.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must be of legal age to enter contracts in their respective countries.</li>
                <li>Sharing account details, even within your own business, is strictly prohibited.</li>
                <li>The website reserves the right to deny access to any user for any reason.</li>
                <li>Logging in from multiple locations simultaneously may result in permanent suspension.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>4. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>Each member confirms and agrees that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>They have full authority to accept these terms and fulfill their obligations.</li>
                <li>Their use of the website and services is <strong>solely for business purposes</strong>.</li>
                <li>Contact information stored in the database may be shared with other registered users for business collaboration.</li>
                <li>Users must provide necessary verification documents when required.</li>
                <li>Copying, uploading, or sharing copyrighted content without legal permission is prohibited.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>5. Content & Publishing Rules</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                Users must not publish content that is offensive, threatening, defamatory, or violates privacy. By submitting content, users confirm:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Content complies with laws and does not contain false or misleading information.</li>
                <li>They will not engage in fraudulent or illegal activities.</li>
                <li>They will not spread viruses or harmful software.</li>
                <li>Sending unsolicited messages (spam) is strictly prohibited.</li>
                <li>Submitting duplicate data (profiles, RFQs) may lead to removal without notice.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                The <strong>Fusion Mining</strong> brand, logos, and trademarks are legally protected. The website content is owned or licensed by Fusion Mining, and any unauthorized use, reproduction, or modification is illegal.
              </p>
              <p>
                Users grant the platform only the limited rights necessary to provide services and do not lose ownership over their original content.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                This website does <strong>not guarantee</strong> the accuracy, reliability, quality, or completeness of any information provided. Users download information at their own risk.
              </p>
              <p>
                Fusion Mining shall not be liable for any direct, indirect, incidental, or consequential damages, including loss of profits or data, arising from your use of the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>8. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                These Terms shall be governed and construed in accordance with the laws of <strong>Zambia</strong>, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>9. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 pt-4 border-t">
                <p>
                  <strong>Website:</strong> <a href="/contact" className="text-primary hover:underline">https://fusionmining.com/contact</a><br />
                  <strong>Telephone:</strong> +260 978 838 939<br />
                  <strong>Email:</strong> fusionminingltd@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
