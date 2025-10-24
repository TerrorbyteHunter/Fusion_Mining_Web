// Services page with service offerings
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Gem, 
  FileText, 
  Users, 
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Facilitation",
    description: "Connect with profitable mining opportunities across Zambia",
    features: [
      "Curated investment opportunities",
      "Due diligence support",
      "Financial structuring assistance",
      "Regulatory compliance guidance",
      "Risk assessment and mitigation",
      "Ongoing investment monitoring"
    ],
    color: "text-chart-1"
  },
  {
    icon: Gem,
    title: "Mineral Brokerage",
    description: "Trade minerals efficiently in our verified marketplace",
    features: [
      "Direct buyer-seller connections",
      "Quality verification services",
      "Competitive pricing tools",
      "Secure transaction processing",
      "Logistics coordination",
      "Market price intelligence"
    ],
    color: "text-chart-2"
  },
  {
    icon: FileText,
    title: "Licensing Support",
    description: "Navigate the complexities of mining licenses and permits",
    features: [
      "License application assistance",
      "Regulatory compliance consulting",
      "Documentation preparation",
      "Government liaison services",
      "Renewal and extension support",
      "Legal advisory connections"
    ],
    color: "text-chart-3"
  },
  {
    icon: Users,
    title: "Partnership Consulting",
    description: "Build strategic partnerships for mining success",
    features: [
      "Partnership matching services",
      "Joint venture structuring",
      "Negotiation support",
      "Partnership agreement drafting",
      "Conflict resolution services",
      "Exit strategy planning"
    ],
    color: "text-chart-4"
  },
];

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6" data-testid="text-page-title">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive solutions for mining investment, mineral trading, and partnership development
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden" data-testid={`card-service-${index}`}>
                <div className="grid md:grid-cols-3 gap-8">
                  <CardHeader className="md:col-span-1">
                    <service.icon className={`h-16 w-16 mb-4 ${service.color}`} />
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                    <Button className="mt-4 w-full" data-testid={`button-learn-more-${index}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="md:col-span-2 pt-6">
                    <h3 className="font-semibold text-lg mb-4">What We Offer:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-chart-3 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card/50 border-t">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold font-display mb-4">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg">
                Let us help you achieve your mining and investment goals
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button asChild size="lg" data-testid="button-cta-contact">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="button-cta-projects">
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
