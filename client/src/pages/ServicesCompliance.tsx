import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileCheck, 
  Shield, 
  Leaf, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  FileText,
  Landmark,
  Briefcase,
  Truck,
  Search,
  FlaskConical,
  Factory,
  Pickaxe,
  Package,
  ClipboardCheck,
  Gavel
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function ServicesCompliance() {
  const serviceCategories = [
    {
      title: "Consulting & Advisory",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      services: [
        {
          name: "Mining Feasibility Studies",
          description: "Comprehensive analysis of mining project viability, including resource assessment, financial modeling, and risk analysis"
        },
        {
          name: "Strategic Planning",
          description: "Long-term mining strategy development, market analysis, and investment planning for sustainable growth"
        },
        {
          name: "Operational Optimization",
          description: "Process improvement consulting to maximize efficiency, reduce costs, and increase mineral recovery rates"
        },
        {
          name: "Market Intelligence",
          description: "Real-time commodity pricing, market trends, and buyer-seller matchmaking services"
        }
      ]
    },
    {
      title: "Legal & Compliance Services",
      icon: Gavel,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      services: [
        {
          name: "Licensing & Permits",
          description: "Full support for mining license applications, renewals, and compliance with Zambian mining regulations"
        },
        {
          name: "Contract Drafting & Review",
          description: "Legal documentation for mineral sales, partnerships, joint ventures, and offtake agreements"
        },
        {
          name: "Regulatory Compliance",
          description: "Ensure adherence to environmental, safety, and local content requirements under new 2025 legislation"
        },
        {
          name: "Dispute Resolution",
          description: "Mediation and arbitration services for mining disputes, contract disagreements, and partnership conflicts"
        }
      ]
    },
    {
      title: "Analysis & Laboratory Services",
      icon: FlaskConical,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      services: [
        {
          name: "Mineral Analysis",
          description: "Advanced laboratory testing for mineral grade, purity, and composition analysis with certified results"
        },
        {
          name: "Geological Surveys",
          description: "Professional geological assessments, core sampling, and resource estimation for exploration projects"
        },
        {
          name: "Environmental Testing",
          description: "Soil, water, and air quality analysis to meet ZEMA environmental compliance requirements"
        },
        {
          name: "Quality Assurance",
          description: "Third-party verification and certification for mineral exports and international buyers"
        }
      ]
    },
    {
      title: "Exploration & Surveying",
      icon: Search,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      services: [
        {
          name: "Geophysical Surveys",
          description: "Advanced geophysical techniques to identify mineral deposits and optimize exploration programs"
        },
        {
          name: "Drilling Services",
          description: "Diamond and reverse circulation drilling for resource definition and grade control"
        },
        {
          name: "Topographical Mapping",
          description: "High-precision surveying and 3D terrain modeling for mine planning and infrastructure development"
        },
        {
          name: "Resource Estimation",
          description: "JORC/NI 43-101 compliant resource and reserve calculations for investor reporting"
        }
      ]
    },
    {
      title: "Mining Engineering Services",
      icon: Pickaxe,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      services: [
        {
          name: "Mine Design & Planning",
          description: "Comprehensive mine design, pit optimization, and production scheduling for maximum profitability"
        },
        {
          name: "Blasting & Excavation",
          description: "Professional drilling and blasting services with safety-first approach and minimal environmental impact"
        },
        {
          name: "Mine Extraction",
          description: "Full-service ore extraction, hauling, and waste management for both open-pit and underground operations"
        },
        {
          name: "Equipment Supply",
          description: "Mining equipment procurement, maintenance, and technical support services"
        }
      ]
    },
    {
      title: "Mineral Processing",
      icon: Factory,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
      services: [
        {
          name: "Ore Processing",
          description: "Crushing, grinding, and concentration services to improve mineral grade and market value"
        },
        {
          name: "Metallurgical Testing",
          description: "Laboratory and pilot-scale testing to optimize mineral recovery and processing methods"
        },
        {
          name: "Tailings Management",
          description: "Environmentally responsible tailings disposal, water treatment, and reclamation services"
        },
        {
          name: "Processing Plant Design",
          description: "Custom processing plant engineering and construction for specific mineral types"
        }
      ]
    },
    {
      title: "Logistics & Supply Chain",
      icon: Truck,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
      services: [
        {
          name: "Freight Services",
          description: "Road, rail, and sea freight coordination for mineral exports across Southern Africa"
        },
        {
          name: "Export Documentation",
          description: "Complete export permit processing, customs clearance, and shipping documentation"
        },
        {
          name: "Warehousing & Storage",
          description: "Secure mineral storage facilities with inventory management and quality preservation"
        },
        {
          name: "Supply Chain Optimization",
          description: "End-to-end supply chain planning from mine to market, reducing costs and transit time"
        }
      ]
    },
    {
      title: "Safety & Training",
      icon: Shield,
      color: "text-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
      services: [
        {
          name: "Health & Safety Audits",
          description: "Comprehensive safety assessments and compliance with mining health and safety regulations"
        },
        {
          name: "Worker Training Programs",
          description: "Certified training in mining operations, equipment handling, and emergency response"
        },
        {
          name: "Environmental Management",
          description: "EIA preparation, ZEMA compliance support, and ongoing environmental monitoring"
        },
        {
          name: "Community Relations",
          description: "Corporate social responsibility programs and community engagement for sustainable mining"
        }
      ]
    }
  ];

  const complianceHighlights = [
    {
      title: "New 2025 Mining Legislation",
      description: "Minerals Regulation Commission Act and GMDA now in effect with stricter local content requirements",
      icon: AlertCircle,
      color: "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
    },
    {
      title: "License Types Available",
      description: "Artisanal, Small-Scale, and Large-Scale mining licenses with varying ownership requirements",
      icon: FileCheck,
      color: "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Environmental Compliance",
      description: "ZEMA approval required for all mining activities with mandatory EIA and environmental management plans",
      icon: Leaf,
      color: "border-green-500 bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Local Content Obligations",
      description: "Minimum 5% Zambian shareholding for small-scale, with employment and procurement preferences",
      icon: Users,
      color: "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4" data-testid="text-page-title">
            Professional Mining Services & Compliance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-page-subtitle">
            Your one-stop solution for mineral trading, engineering services, legal compliance, and consulting in Zambia's mining sector
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button size="lg" data-testid="button-request-quote">
              <Briefcase className="h-5 w-5 mr-2" />
              Request Quote
            </Button>
            <Button size="lg" variant="outline" data-testid="button-view-compliance">
              <FileText className="h-5 w-5 mr-2" />
              View Compliance Guide
            </Button>
          </div>
        </div>

        {/* Compliance Highlights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Regulatory Compliance at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className={`${item.color} border-2`} data-testid={`card-compliance-highlight-${index}`}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Icon className="h-6 w-6 mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-sm">{item.title}</CardTitle>
                        <CardDescription className="text-xs mt-2">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Professional Services</h2>
          <div className="grid gap-8">
            {serviceCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <Card key={categoryIndex} className="hover:shadow-lg transition-shadow" data-testid={`card-service-category-${categoryIndex}`}>
                  <CardHeader className={category.bgColor}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-background ${category.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{category.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          Professional {category.title.toLowerCase()} for Zambia's mining industry
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="space-y-2" data-testid={`service-${categoryIndex}-${serviceIndex}`}>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-base">{service.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Detailed Compliance Section */}
        <div className="mb-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Detailed Compliance Requirements</CardTitle>
              <CardDescription className="text-base">
                Comprehensive regulatory framework for mining operations in Zambia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="licenses" className="space-y-6" data-testid="tabs-detailed-compliance">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="licenses" data-testid="tab-licenses-detailed">
                    <FileText className="h-4 w-4 mr-2" />
                    License Types
                  </TabsTrigger>
                  <TabsTrigger value="requirements" data-testid="tab-requirements-detailed">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Requirements
                  </TabsTrigger>
                  <TabsTrigger value="authorities" data-testid="tab-authorities-detailed">
                    <Landmark className="h-4 w-4 mr-2" />
                    Authorities
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="licenses" className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        name: "Artisanal Mining Rights (AMR)",
                        eligibility: "Zambian citizens only",
                        area: "2+ cadastre units",
                        duration: "Varies"
                      },
                      {
                        name: "Small-Scale Mining License",
                        eligibility: "Min 5% Zambian shareholding",
                        area: "3-120 cadastre units",
                        duration: "Renewable"
                      },
                      {
                        name: "Large-Scale Mining License",
                        eligibility: "No ownership restrictions",
                        area: "400+ hectares",
                        duration: "Up to 25 years"
                      }
                    ].map((license, index) => (
                      <Card key={index} data-testid={`card-license-type-${index}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{license.name}</CardTitle>
                            <Badge variant="secondary">{license.duration}</Badge>
                          </div>
                          <CardDescription>
                            <strong>Eligibility:</strong> {license.eligibility} • <strong>Area:</strong> {license.area}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-4">
                  <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-900 dark:text-blue-100">Key Compliance Areas</AlertTitle>
                    <AlertDescription className="text-blue-800 dark:text-blue-200">
                      All mining operations must comply with environmental, local content, health & safety, and tax requirements
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-600" />
                          Environmental
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>EIA approval from ZEMA required</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Environmental Management Plan</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Rehabilitation fund contributions</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          Local Content
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Hire qualified Zambian citizens</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Procurement from local suppliers</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Skills transfer programs</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="authorities" className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        name: "Ministry of Mines and Minerals Development",
                        role: "Primary regulatory authority",
                        contact: "Nasser Road, Lusaka",
                        website: "https://www.mmmd.gov.zm"
                      },
                      {
                        name: "Minerals Regulation Commission (MRC)",
                        role: "License issuance and compliance monitoring",
                        contact: "Contact via Ministry",
                        website: "https://www.mmmd.gov.zm"
                      },
                      {
                        name: "Zambia Environmental Management Agency (ZEMA)",
                        role: "Environmental approvals and monitoring",
                        contact: "Environmental compliance authority",
                        website: "www.zema.org.zm"
                      }
                    ].map((authority, index) => (
                      <Card key={index} data-testid={`card-authority-detailed-${index}`}>
                        <CardHeader>
                          <CardTitle className="text-lg">{authority.name}</CardTitle>
                          <CardDescription>{authority.role}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <p className="mb-2">{authority.contact}</p>
                          <a 
                            href={authority.website.startsWith('http') ? authority.website : `https://${authority.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                            data-testid={`link-authority-detailed-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            {authority.website}
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Partner with Fusion Mining Limited for comprehensive mining services, legal compliance, and market access across Zambia and Southern Africa
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" data-testid="button-contact-services">
                <Briefcase className="h-5 w-5 mr-2" />
                Contact Our Team
              </Button>
              <Button size="lg" variant="outline" data-testid="button-view-marketplace">
                <Package className="h-5 w-5 mr-2" />
                Browse Marketplace
              </Button>
              <Button size="lg" variant="outline" data-testid="button-download-guide">
                <FileText className="h-5 w-5 mr-2" />
                Download Compliance Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
