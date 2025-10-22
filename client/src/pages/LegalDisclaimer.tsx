// Disclaimer legal page
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LegalDisclaimer() {
  return (
    <div className="flex flex-col">
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold font-display mb-4" data-testid="text-page-title">
            Disclaimer
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
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                The information provided by Fusion Mining Limited on our platform is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Investment Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p>
                Mining investments carry substantial risk. Past performance is not indicative of future results. Before making any investment decisions, you should:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conduct thorough due diligence</li>
                <li>Consult with qualified financial and legal advisors</li>
                <li>Understand all risks associated with mining investments</li>
                <li>Verify all information independently</li>
              </ul>
              <p>
                Fusion Mining Limited does not provide investment advice and is not responsible for any investment decisions made by users of the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Marketplace Listings</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Listings on our marketplace are created by third-party users. We do not verify, endorse, or guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The accuracy of listing information</li>
                <li>The quality, legality, or safety of listed minerals or partnerships</li>
                <li>The ability of sellers to deliver on their promises</li>
                <li>The suitability of any transaction for your needs</li>
              </ul>
              <p>
                Users are solely responsible for verifying all information and conducting appropriate due diligence before entering into any transaction.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>No Professional Relationship</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Your use of our service does not create a professional relationship between you and Fusion Mining Limited. We are a technology platform provider and do not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Act as a broker or intermediary</li>
                <li>Provide legal, financial, or investment advice</li>
                <li>Guarantee the outcome of any transaction</li>
                <li>Assume liability for user conduct or transactions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Users are solely responsible for ensuring their activities comply with all applicable laws and regulations, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Zambian mining regulations</li>
                <li>Environmental protection laws</li>
                <li>Tax obligations</li>
                <li>Import/export regulations</li>
                <li>Anti-money laundering requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Our service may contain links to external websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                For questions about this disclaimer, please contact:
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
