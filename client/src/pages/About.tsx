// About Us page with company info, leadership, mission/vision
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  Download, 
  ArrowRight,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// assets for About page
import companyProfilePdf from "../../../attached_assets/files/about-us/Company-Profile.pdf";
import fusionImage from "../../../attached_assets/files/about-us/fusionimage.png";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { Link } from "wouter";
import { format } from "date-fns";

const leadership = [
  {
    name: "James Mwansa",
    title: "Chief Executive Officer",
    bio: "20+ years of experience in mining operations and investment management",
    initials: "JM"
  },
  {
    name: "Sarah Banda",
    title: "Chief Operating Officer",
    bio: "Expert in mineral trading with extensive knowledge of African markets",
    initials: "SB"
  },
  {
    name: "David Phiri",
    title: "Head of Investments",
    bio: "Former mining engineer with focus on sustainable practices",
    initials: "DP"
  },
  {
    name: "Grace Lungu",
    title: "Head of Partnerships",
    bio: "Specialist in international mining partnerships and joint ventures",
    initials: "GL"
  },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in all our operations and partnerships"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We build strong relationships with stakeholders across the mining ecosystem"
  },
  {
    icon: Target,
    title: "Integrity",
    description: "We operate with transparency and honesty in every transaction"
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "We leverage technology to transform the mining investment landscape"
  },
];

export default function About() {
  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const featuredPosts = posts?.filter(post => post.published).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6" data-testid="text-page-title">
              About Fusion Mining Limited
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering Zambia's mining sector through innovative investment solutions and strategic partnerships
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fusion Mining Limited is Zambia's premier mining investment and trading platform, connecting investors, miners, and partners across the region. Since our establishment, we've facilitated over $50M in successful transactions and partnerships.
                </p>
                <p>
                  Our platform streamlines the entire mining ecosystem - from exploration licenses to mineral trading, from partnership formation to investment facilitation. We leverage cutting-edge technology and deep industry expertise to create value for all stakeholders.
                </p>
                <p>
                  With a strong presence across Zambia's key mining regions and partnerships with international investors, we're uniquely positioned to unlock the full potential of Africa's mineral wealth while ensuring sustainable, responsible practices.
                </p>
              </div>
              <a
                className="inline-block mt-6"
                href={companyProfilePdf}
                download
                data-testid="button-download-profile"
              >
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Company Profile
                </Button>
              </a>
            </div>
            <div className="bg-muted rounded-xl h-96 flex items-center justify-center overflow-hidden">
              <img src={fusionImage} alt="Company" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize access to mining investments and create a transparent, efficient marketplace that empowers investors, miners, and partners to succeed while promoting sustainable development in Zambia's mining sector.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-12 w-12 text-chart-2 mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become Africa's leading digital platform for mining investment and mineral trading, setting the standard for transparency, efficiency, and sustainable practices in the global mining industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals driving innovation in Zambia's mining sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} data-testid={`card-leader-${index}`}>
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {leader.initials}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {leader.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {leader.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-card/50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guiding principles that define how we operate and serve our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center" data-testid={`card-value-${index}`}>
                <CardHeader>
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Latest Insights
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with our latest news and industry insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/news/${post.slug}`}>
                  <Card className="hover-elevate active-elevate-2 h-full cursor-pointer transition-all">
                    <CardHeader>
                      {post.category && (
                        <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>
                      )}
                      <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + "..."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/news">
                <Button size="lg">
                  View All News & Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
