import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileCheck, 
  Shield, 
  Building2, 
  Leaf, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  Scale,
  FileText,
  Landmark
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Compliance() {
  const licenseTypes = [
    {
      name: "Artisanal Mining Rights (AMR)",
      eligibility: "Zambian citizens only or cooperatives wholly owned by Zambian citizens",
      area: "2 cadastre units minimum",
      duration: "Varies",
      requirements: ["Proof of Zambian citizenship", "Business plan", "Tax clearance certificate", "Environmental protection plan"]
    },
    {
      name: "Small-Scale Exploration License",
      eligibility: "Citizen-owned (75.1%+ Zambian equity), citizen-empowered (25-50%), or citizen-influenced (5-25%)",
      area: "3 to 300 cadastre units",
      duration: "4 years (not renewable except for diamonds)",
      requirements: ["Company registration", "GPS coordinates", "Tax clearance", "Business plan"]
    },
    {
      name: "Small-Scale Mining License",
      eligibility: "Companies with minimum 5% Zambian shareholding",
      area: "3 to 120 cadastre units (up to 400 hectares)",
      duration: "Renewable",
      requirements: ["Completed application with GPS coordinates", "Prospecting permits and reports", "Employment and training proposals", "Tax clearance certificate", "Land consent documentation", "Certificate of incorporation", "Environmental commitment plan"]
    },
    {
      name: "Large-Scale Exploration License",
      eligibility: "No ownership restrictions (foreign entities permitted)",
      area: "Exceeds 300 cadastre units",
      duration: "Renewable",
      requirements: ["Detailed exploration plan", "Financial capacity proof", "Technical expertise", "Environmental assessment"]
    },
    {
      name: "Large-Scale Mining License",
      eligibility: "No ownership restrictions",
      area: "Exceeds 400 hectares",
      duration: "Up to 25 years",
      requirements: ["Feasibility study", "Approved Environmental Impact Assessment (EIA) from ZEMA", "Infrastructure requirements", "Employment and training proposals", "Local business development proposals", "Tax clearance certificate", "Plan of proposed mining area", "Certificate of incorporation"]
    }
  ];

  const complianceAreas = [
    {
      title: "Environmental Compliance",
      icon: Leaf,
      color: "text-green-600",
      items: [
        "Environmental Impact Assessment (EIA) required for all exploration, mining, or mineral processing",
        "Environmental authorization from ZEMA mandatory before operations begin",
        "Environmental Management Plan must be attached to mining license conditions",
        "Hazardous waste licenses issued by ZEMA upon application",
        "Environmental Management Fund contributions for large-scale projects",
        "Environmental restoration obligations monitored by ZEMA"
      ]
    },
    {
      title: "Local Content Requirements",
      icon: Users,
      color: "text-blue-600",
      items: [
        "Procurement preference for goods/services produced or supplied in Zambia",
        "Must employ qualified Zambian citizens where possible",
        "Implement training programs to transfer technical and managerial skills",
        "Support citizen-owned and citizen-empowered companies",
        "Penalties: Minimum 1 million penalty units (~ZMW 400,000) for non-compliance",
        "Additional 150,000 penalty units/day (~ZMW 60,000) for ongoing violations"
      ]
    },
    {
      title: "Health & Safety Standards",
      icon: Shield,
      color: "text-red-600",
      items: [
        "Compliance with health and safety regulations to protect workers",
        "Regular safety reporting to Ministry of Mines",
        "Community safety protocols for nearby populations",
        "Emergency response plans and equipment",
        "Worker training and certification programs",
        "Regular safety audits and inspections"
      ]
    },
    {
      title: "Operational Compliance",
      icon: FileCheck,
      color: "text-purple-600",
      items: [
        "Develop mining area with due diligence per approved program",
        "Maintain full and accurate records of all operations",
        "Preserve environmental protection records",
        "Notify government of discovery of commercially valuable minerals",
        "Submit regular production and sales reports",
        "Compliance with approved EIA and mining plan",
        "Regular environmental compliance reporting"
      ]
    },
    {
      title: "Tax & Financial Compliance",
      icon: Building2,
      color: "text-amber-600",
      items: [
        "Tax clearance certificate required for all license applications and renewals",
        "Mineral royalty rates: 4-10% depending on copper prices (based on LME prices)",
        "Mineral royalties are tax-deductible in corporate income tax assessments",
        "Regular financial reporting to Zambia Revenue Authority (ZRA)",
        "Proper accounting and record-keeping systems",
        "Transfer pricing compliance for international transactions"
      ]
    }
  ];

  const keyBodies = [
    {
      name: "Ministry of Mines and Minerals Development",
      role: "Primary government authority overseeing mining sector",
      contact: "New Government Complex Building, Nasser Road, 12th & 14th Floor, Lusaka",
      email: "info@mmmd.gov.zm",
      website: "https://www.mmmd.gov.zm"
    },
    {
      name: "Minerals Regulation Commission (MRC)",
      role: "Independent regulator responsible for granting, suspending, and revoking mining rights",
      contact: "Centralized licensing and monitoring authority",
      email: "Contact via Ministry of Mines",
      website: "https://www.mmmd.gov.zm"
    },
    {
      name: "Zambia Environmental Management Agency (ZEMA)",
      role: "Issues environmental authorizations and EIA approvals; mandatory for all exploration and mining",
      contact: "Environmental oversight and compliance",
      email: "Contact for EIA requirements",
      website: "Environmental Protection Authority"
    },
    {
      name: "Zambia Revenue Authority (ZRA)",
      role: "Tax clearance certificates, mineral royalty clearance, and revenue collection",
      contact: "Tax and financial compliance",
      email: "Contact for tax matters",
      website: "Zambia Revenue Authority"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">
            Mining Compliance Requirements
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">
            Regulatory framework and compliance requirements for mining in Zambia (2025)
          </p>
        </div>

        <Alert className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/20" data-testid="alert-legislation-update">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 dark:text-amber-100">Major Legislative Change – June 2025</AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            Two new laws came into effect on June 3, 2025: the <strong>Minerals Regulation Commission Act, 2024</strong> and 
            the <strong>Geological and Minerals Development Act, 2015</strong>. These introduce stricter compliance requirements, 
            enhanced local content obligations, and stronger regulatory oversight.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="licenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3" data-testid="tabs-compliance">
            <TabsTrigger value="licenses" data-testid="tab-licenses">
              <FileText className="h-4 w-4 mr-2" />
              Licenses & Permits
            </TabsTrigger>
            <TabsTrigger value="compliance" data-testid="tab-compliance">
              <Scale className="h-4 w-4 mr-2" />
              Compliance Areas
            </TabsTrigger>
            <TabsTrigger value="authorities" data-testid="tab-authorities">
              <Landmark className="h-4 w-4 mr-2" />
              Regulatory Bodies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="licenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Types of Mining Licenses & Permits</CardTitle>
                <CardDescription>
                  Overview of available mining rights in Zambia under the new 2025 legislation
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {licenseTypes.map((license, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow" data-testid={`card-license-${index}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{license.name}</CardTitle>
                        <CardDescription className="mt-2">
                          <strong>Eligibility:</strong> {license.eligibility}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{license.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Area Coverage:</p>
                        <p className="text-sm text-muted-foreground">{license.area}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Key Requirements:</p>
                        <ul className="space-y-1">
                          {license.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Additional Permits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Mineral Processing License</h4>
                    <p className="text-muted-foreground">Approval from Minerals Regulation Commission required</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Mineral Trading Permit</h4>
                    <p className="text-muted-foreground">For indigenous Zambians or registered Zambian companies</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Gold Panning Certificate</h4>
                    <p className="text-muted-foreground">Zambian citizens only</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Mineral Export/Import Permit</h4>
                    <p className="text-muted-foreground">Requires MRC approval, mineral analysis, royalty clearance, and security clearance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mandatory Compliance Requirements</CardTitle>
                <CardDescription>
                  Key compliance areas that all mining operations must adhere to
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {complianceAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow" data-testid={`card-compliance-${index}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${area.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{area.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <CardHeader>
                <CardTitle className="text-red-900 dark:text-red-100 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Penalties for Non-Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-red-800 dark:text-red-200">
                <p className="mb-4">
                  The government can <strong>cancel mining rights</strong> if holders:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li>Fail to comply with license conditions or MMDA requirements</li>
                  <li>Fail to conduct operations per approved plan</li>
                  <li>Are convicted of safety, health, or environmental violations</li>
                  <li>Fail to meet minimum production thresholds (large-scale licenses)</li>
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Criminal prosecutions</strong> for environmental violations are overseen by ZEMA.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authorities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Regulatory Bodies</CardTitle>
                <CardDescription>
                  Government agencies responsible for mining regulation and compliance oversight
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {keyBodies.map((body, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow" data-testid={`card-authority-${index}`}>
                  <CardHeader>
                    <CardTitle className="text-xl">{body.name}</CardTitle>
                    <CardDescription className="mt-2">{body.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">{body.contact}</span>
                      </div>
                      {body.email !== "Contact via Ministry of Mines" && body.email !== "Contact for EIA requirements" && body.email !== "Contact for tax matters" && (
                        <div className="flex items-start gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-muted-foreground">{body.email}</span>
                        </div>
                      )}
                      {body.website && (
                        <div className="flex items-start gap-2">
                          <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <a 
                            href={body.website.startsWith('http') ? body.website : '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                            data-testid={`link-authority-website-${index}`}
                          >
                            {body.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Application Process Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">1</Badge>
                    <div>
                      <strong>Initial Research:</strong> Identify minerals and location
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">2</Badge>
                    <div>
                      <strong>Company Registration:</strong> Register with PACRA, obtain TIN from ZRA
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">3</Badge>
                    <div>
                      <strong>Foreign Entities:</strong> Obtain Investment License (ZDA) and Investor's Permit
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">4</Badge>
                    <div>
                      <strong>Documentation:</strong> Prepare business plan, feasibility study, environmental assessments
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">5</Badge>
                    <div>
                      <strong>EIA Approval:</strong> Obtain approved EIA from ZEMA before license application
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">6</Badge>
                    <div>
                      <strong>Submit Application:</strong> To Ministry of Mines (Mining Cadastre in Lusaka)
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">7</Badge>
                    <div>
                      <strong>Review Process:</strong> Ministry review with possible site visits and evaluations
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge variant="secondary" className="h-6 px-2">8</Badge>
                    <div>
                      <strong>License Issuance:</strong> If approved, commence operations under license conditions
                    </div>
                  </li>
                </ol>
                <p className="mt-4 text-xs text-muted-foreground">
                  Note: Applications can be filed at regional/provincial offices but are processed centrally in Lusaka. 
                  The new legislation has introduced shortened decision-making timeframes.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Business Licenses Portal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              For online license applications and information, visit the official Zambian government portal:
            </p>
            <a 
              href="https://www.businesslicenses.gov.zm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
              data-testid="link-business-portal"
            >
              <ExternalLink className="h-4 w-4" />
              https://www.businesslicenses.gov.zm
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
