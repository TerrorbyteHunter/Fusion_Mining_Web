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
            Last updated: May 1, 2026
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                First of all, thank you for trusting our website. We use your personal data to optimize and improve our services. By using our services, you agree to the collection and use of information in accordance with this Privacy Policy. Your use of <a href="https://fusionmining.com/" className="text-primary hover:underline">https://fusionmining.com/</a> constitutes your acceptance of these terms.
              </p>
              <p>
                This policy explains how we protect your privacy, which is of great importance to us. To maintain your trust, we have implemented strict measures to safeguard your information.
              </p>
              <p>
                The website <a href="https://fusionmining.com/" className="text-primary hover:underline">https://fusionmining.com/</a> serves as a specialized platform for the mining and mineral industries. We may share your business details with companies or individuals interested in potential business collaboration with you. However, your contact information will <strong>never</strong> be disclosed to unregistered users.
              </p>
              <p>
                We use your personal information solely to manage your account and provide the products or services you have requested. Occasionally, we may send updates or special offers via email, WhatsApp, or website notifications.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>A. Collection of Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-6">
              <div>
                <h4 className="font-semibold mb-2">I. Personal Information</h4>
                <p>
                  To access our services, you must create an account that includes your name, contact number, email address, and password. Even for basic site features, registration or the provision of specific information is required.
                </p>
                <p>
                  We collect data such as email, country, name, company name, mobile number, business type, buying and selling preferences, annual purchase volume, and frequency of transactions. This helps us present more relevant content and services to you.
                </p>
                <p>
                  By providing your email address or other contact methods, you consent to receive notifications, updates, and security alerts related to our services or products.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">II. Business Information</h4>
                <p>
                  To use the website's services, you are required to share certain business details to build trust – including your field of activity and credibility-related information.
                </p>
                <p>
                  We collect data such as contact details, company profiles, business leads, purchases, catalogs, and inquiries. This information is gathered when you voluntarily submit it on the website (for example, during registration, newsletter subscription, sending emails, or completing feedback forms).
                </p>
                <p>
                  All business-related information on the website is publicly visible and can be accessed by any internet user. Please be cautious when uploading copyrighted or confidential materials.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>B. Deletion of Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                You may request the deletion of your personal data by contacting the site administrators.
              </p>
              <p>
                Please note that deleting your account will also remove all your company's RFQs and listed products. If you wish to return later, you will need to re-register to regain access.
              </p>
              <p>
                Once a deletion request is processed, we will make reasonable efforts to inform other entities that have received your data to delete it, unless restricted by law.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>C. Updates to the Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                This policy may be updated from time to time. Any changes will be announced on this page, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Changes in the use of personal information</li>
                <li>Changes in the data controller (e.g., in case of company merger or acquisition)</li>
                <li>Changes in the main purposes of data sharing or transfer</li>
                <li>Updates to the department responsible for data security or contact details</li>
                <li>New findings from personal data security assessments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>D. Security Measures</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                We have implemented strict security measures to prevent unauthorized access, maintain data accuracy, and ensure proper management of your information.
              </p>
              <p>
                Your account information is protected by password-secured systems. We recommend that you do <strong>not</strong> share your password with anyone and avoid saving it on public devices.
              </p>
              <p>
                Our staff will <strong>never</strong> request your password through unofficial calls or emails.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>E. Data Retention Period</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                We retain your personal information as long as necessary to provide our services or as required by applicable laws.
              </p>
              <p>
                Once the information is no longer needed, it will be deleted or anonymized. If immediate deletion is not feasible, it will be securely stored until it can be removed.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>G. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                We use cookies and similar tracking technologies to track activity on our platform and maintain certain session information. Cookies are small data files that may include an anonymous unique identifier. You can configure your browser to refuse all cookies or to notify you when a cookie is being sent; however, some parts of our platform may not function correctly without them.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>H. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                For questions, comments, or suggestions regarding personal information protection, please contact us.
              </p>
              <p>
                For feedback on our Privacy Policy or services, please visit <a href="/contact" className="text-primary hover:underline">contact us</a> to share your reviews and opinions.
              </p>
              <div className="mt-4 pt-4 border-t">
                <p>
                  <strong>Email:</strong> fusionminingltd@gmail.com<br />
                  <strong>Phone:</strong> +260 978 838 939
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
