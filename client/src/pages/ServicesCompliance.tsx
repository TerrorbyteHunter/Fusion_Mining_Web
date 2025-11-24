import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FileCheck, 
  Shield, 
  CheckCircle2,
  ExternalLink,
  FileText,
  Briefcase,
  Search,
  FlaskConical,
  Factory,
  Pickaxe,
  Package,
  ClipboardCheck,
  Gavel,
  Truck,
  AlertCircle,
  Leaf,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ServicesCompliance() {
  const { t } = useLanguage();
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
            {t('services.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-page-subtitle">
            {t('services.subtitle')}
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button asChild size="lg" data-testid="button-request-quote">
              <Link href="/contact">
                <Briefcase className="h-5 w-5 mr-2" />
                {t('services.requestQuote')}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              data-testid="button-view-compliance"
              onClick={() => {
                const element = document.getElementById('detailed-compliance-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FileText className="h-5 w-5 mr-2" />
              {t('services.viewCompliance')}
            </Button>
          </div>
        </div>

        {/* Compliance Highlights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{t('services.compliance.title')}</h2>
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
          <h2 className="text-3xl font-bold mb-8 text-center">{t('services.ourServices')}</h2>
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

        {/* Licence Types Section - Restructured */}
        <div className="mb-12" id="detailed-compliance-section">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Licence Types</CardTitle>
              <CardDescription className="text-base">
                Comprehensive licensing framework for mining operations in Zambia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-licence-types">
                
                {/* Artisanal Mining Rights */}
                <AccordionItem value="amr" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline" data-testid="accordion-trigger-amr">
                    <div className="flex items-center gap-3 text-left">
                      <FileCheck className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold">Artisanal Mining Rights (AMR)</h3>
                        <p className="text-sm text-muted-foreground">For small-scale artisanal operations</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4" data-testid="accordion-content-amr">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Eligibility Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Zambian citizens only</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Individual or cooperative ownership</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Limited to 2+ cadastre units</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <ClipboardCheck className="h-4 w-4 text-primary" />
                          Key Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Basic environmental management plan</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Safety equipment and practices</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Annual reporting to MRC</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Small Scale Mining */}
                <AccordionItem value="small-scale" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline" data-testid="accordion-trigger-small-scale">
                    <div className="flex items-center gap-3 text-left">
                      <Pickaxe className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold">Small Scale (SEL & SML)</h3>
                        <p className="text-sm text-muted-foreground">Small-scale Exploration License & Small-scale Mining License</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4" data-testid="accordion-content-small-scale">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Eligibility Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Minimum 5% Zambian shareholding required</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Coverage: 3-120 cadastre units</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Renewable license period</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <ClipboardCheck className="h-4 w-4 text-primary" />
                          Key Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Environmental Impact Assessment (EIA)</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Local content compliance (employment & procurement)</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Quarterly production reporting</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Health & safety certification</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Large Scale Mining */}
                <AccordionItem value="large-scale" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline" data-testid="accordion-trigger-large-scale">
                    <div className="flex items-center gap-3 text-left">
                      <Factory className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold">Large Scale (LEL & LML)</h3>
                        <p className="text-sm text-muted-foreground">Large-scale Exploration License & Large-scale Mining License</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4" data-testid="accordion-content-large-scale">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Eligibility Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>No ownership restrictions</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Coverage: 400+ hectares</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>License duration: Up to 25 years</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <ClipboardCheck className="h-4 w-4 text-primary" />
                          Key Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Comprehensive EIA from ZEMA</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Detailed mine plan and feasibility study</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Local content & skills transfer programs</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Mine rehabilitation fund contributions</span>
                          </li>
                          <li className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            <span>Monthly production and tax reporting</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Other Permits */}
                <AccordionItem value="other-permits" className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline" data-testid="accordion-trigger-other-permits">
                    <div className="flex items-center gap-3 text-left">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold">Other Permits</h3>
                        <p className="text-sm text-muted-foreground">Trading and processing permits</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-6" data-testid="accordion-content-other-permits">
                    {/* Mineral Trading Permit */}
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        Mineral Trading Permit
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 pl-6">
                        <div>
                          <p className="text-sm font-medium mb-2">Eligibility:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Registered business entity in Zambia</span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Tax compliance certificate</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Requirements:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Trading license from MRC</span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Export documentation compliance</span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Monthly transaction reporting</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Mineral Processing Permit */}
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Factory className="h-4 w-4 text-primary" />
                        Mineral Processing Permit
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 pl-6">
                        <div>
                          <p className="text-sm font-medium mb-2">Eligibility:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Licensed processing facility</span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Technical capacity certification</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Requirements:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Environmental compliance (ZEMA)</span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Waste management plan</span>
                            </li>
                            <li className="flex gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <span>Quarterly production reporting</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>

              {/* Regulatory Authorities Info */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-semibold mb-4">Regulatory Authorities</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Ministry of Mines</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p className="mb-1">Primary regulatory authority</p>
                      <a 
                        href="https://www.mmmd.gov.zm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        www.mmmd.gov.zm
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">MRC</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p className="mb-1">License issuance & compliance</p>
                      <a 
                        href="https://www.mmmd.gov.zm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Contact via Ministry
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">ZEMA</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p className="mb-1">Environmental approvals</p>
                      <a 
                        href="https://www.zema.org.zm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        www.zema.org.zm
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('services.ready')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('services.ready.subtitle')}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" data-testid="button-contact-services">
                <Link href="/contact">
                  <Briefcase className="h-5 w-5 mr-2" />
                  {t('services.contactTeam')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="button-view-marketplace">
                <Link href="/marketplace">
                  <Package className="h-5 w-5 mr-2" />
                  {t('services.browseMarketplace')}
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                data-testid="button-download-guide"
                onClick={() => {
                  window.print();
                }}
              >
                <FileText className="h-5 w-5 mr-2" />
                {t('services.downloadGuide')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
