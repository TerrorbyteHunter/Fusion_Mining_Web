// News & Insights blog page
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";
import { Link } from "wouter";
import { Calendar, ArrowRight } from "lucide-react";
// user-provided news images (preferred)
import copperrise from "../../../attached_assets/files/Newsinsghts/copperrise.jpg";
import emeraldzambia from "../../../attached_assets/files/Newsinsghts/emeraldzambia.png";
import investmentguide from "../../../attached_assets/files/Newsinsghts/investmentguide.jpg";
import user_news1 from "../../../attached_assets/files/Newsinsghts/news1.jpeg";
import { format } from "date-fns";

export default function News() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const publishedPosts = posts?.filter(post => post.published);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 border-b bg-gradient-to-b from-chart-4/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6" data-testid="text-page-title">
              News & Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest trends, news, and insights from Zambia's mining sector
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : publishedPosts && publishedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post, idx) => (
                <Link key={post.id} href={`/news/${post.slug}`}>
                  <Card className="hover-elevate active-elevate-2 h-full cursor-pointer transition-all" data-testid={`card-post-${post.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center overflow-hidden">
                      <img src={[copperrise, emeraldzambia, investmentguide, user_news1][idx % 4]} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + "..."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
              <Card className="text-center py-16">
              <CardContent>
                <img src={user_news1} className="h-24 w-24 mx-auto mb-4 object-cover rounded" alt="no-posts" />
                <h3 className="text-2xl font-semibold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for industry news and insights
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
