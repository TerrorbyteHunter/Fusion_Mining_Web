// Sustainability page with community and environmental initiatives
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Users, 
  GraduationCap, 
  Heart, 
  Droplet,
  Recycle,
  Trees,
  Home
} from "lucide-react";

const communityInitiatives = [
  {
    icon: GraduationCap,
    title: "Education Programs",
    description: "Providing scholarships and building schools in mining communities",
    impact: "500+ students supported annually"
  },
  {
    icon: Heart,
    title: "Healthcare Access",
    description: "Mobile clinics and health facilities for remote mining areas",
    impact: "10,000+ people served"
  },
  {
    icon: Home,
    title: "Community Development",
    description: "Infrastructure improvements and housing projects",
    impact: "15 communities transformed"
  },
  {
    icon: Users,
    title: "Job Creation",
    description: "Local employment and skills training programs",
    impact: "2,000+ jobs created"
  },
];

const environmentalInitiatives = [
  {
    icon: Trees,
    title: "Reforestation",
    description: "Planting trees in areas affected by mining operations",
    impact: "50,000+ trees planted"
  },
  {
    icon: Droplet,
    title: "Water Conservation",
    description: "Implementing water recycling and protection systems",
    impact: "70% water recycling rate"
  },
  {
    icon: Recycle,
    title: "Waste Management",
    description: "Zero-waste mining practices and recycling programs",
    impact: "90% waste recycled"
  },
  {
    icon: Leaf,
    title: "Biodiversity Protection",
    description: "Preserving local ecosystems and wildlife habitats",
    impact: "500 hectares protected"
  },
];

export default function Sustainability() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6" data-testid="text-page-title">
              Our Commitment to Sustainability
            </h1>
            <p className="text-xl text-muted-foreground">
              Building a responsible mining future that benefits communities and protects our environment
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              At Fusion Mining Limited, we believe that profitable mining and sustainable development go hand in hand. Our comprehensive sustainability strategy focuses on environmental stewardship, community empowerment, and responsible business practices.
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "70%", label: "Renewable Energy Use" },
              { value: "2,000+", label: "Jobs Created" },
              { value: "50,000+", label: "Trees Planted" },
              { value: "15", label: "Communities Supported" },
            ].map((metric, index) => (
              <Card key={index} className="text-center" data-testid={`metric-${index}`}>
                <CardHeader>
                  <div className="text-3xl font-bold font-display text-green-600 dark:text-green-500">
                    {metric.value}
                  </div>
                  <CardDescription className="font-medium">
                    {metric.label}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Initiatives */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="community" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="community" data-testid="tab-community">
                <Users className="mr-2 h-4 w-4" />
                Community
              </TabsTrigger>
              <TabsTrigger value="environment" data-testid="tab-environment">
                <Leaf className="mr-2 h-4 w-4" />
                Environment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="community">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display mb-4">
                  Community Initiatives
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Investing in the people and communities that power Zambia's mining sector
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityInitiatives.map((initiative, index) => (
                  <Card key={index} data-testid={`card-community-${index}`}>
                    <CardHeader>
                      <initiative.icon className="h-12 w-12 text-green-600 dark:text-green-500 mb-4" />
                      <CardTitle className="text-xl">{initiative.title}</CardTitle>
                      <CardDescription>{initiative.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-medium">
                        {initiative.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="environment">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display mb-4">
                  Environmental Initiatives
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Protecting Zambia's natural resources for future generations
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {environmentalInitiatives.map((initiative, index) => (
                  <Card key={index} data-testid={`card-environment-${index}`}>
                    <CardHeader>
                      <initiative.icon className="h-12 w-12 text-green-600 dark:text-green-500 mb-4" />
                      <CardTitle className="text-xl">{initiative.title}</CardTitle>
                      <CardDescription>{initiative.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-medium">
                        {initiative.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-display mb-6">
              Our Commitments & Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">🌍</div>
                  <h3 className="font-semibold mb-2">UN SDGs</h3>
                  <p className="text-sm text-muted-foreground">
                    Aligned with UN Sustainable Development Goals
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">♻️</div>
                  <h3 className="font-semibold mb-2">ISO 14001</h3>
                  <p className="text-sm text-muted-foreground">
                    Environmental Management Systems
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <h3 className="font-semibold mb-2">EITI</h3>
                  <p className="text-sm text-muted-foreground">
                    Extractive Industries Transparency Initiative
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
