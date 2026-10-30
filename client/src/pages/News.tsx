import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { format, isAfter, subDays, subMonths, subYears } from "date-fns";
import { ArrowRight, CalendarDays, Newspaper, Search, X } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import copperrise from "../../../attached_assets/files/Newsinsghts/copperrise.jpg";
import emeraldzambia from "../../../attached_assets/files/Newsinsghts/emeraldzambia.png";
import investmentguide from "../../../attached_assets/files/Newsinsghts/investmentguide.jpg";
import userNews from "../../../attached_assets/files/Newsinsghts/news1.jpeg";

const categories = ["Industry News", "Sustainability", "Market Trends", "Company Updates"];
const fallbackImages = [copperrise, emeraldzambia, investmentguide, userNews];

function getCategory(category?: string | null): string {
  const value = category?.trim().toLowerCase() || "";
  if (value.includes("sustain")) return "Sustainability";
  if (value.includes("market") || value.includes("analysis") || value.includes("trend")) return "Market Trends";
  if (value.includes("company") || value.includes("fusion") || value.includes("update")) return "Company Updates";
  return "Industry News";
}

function formatPublicationDate(createdAt: Date | string): string {
  const date = new Date(createdAt);
  return Number.isFinite(date.getTime()) ? format(date, "MMM d, yyyy") : "Date unavailable";
}

function dateTimeValue(createdAt: Date | string): string | undefined {
  const date = new Date(createdAt);
  return Number.isFinite(date.getTime()) ? date.toISOString() : undefined;
}

export default function News() {
  const [category, setCategory] = useState("all");
  const [dateRange, setDateRange] = useState("any");
  const [search, setSearch] = useState("");
  const { data: posts, isLoading, isError, refetch } = useQuery<BlogPost[]>({ queryKey: ["/api/blog"] });

  const filteredPosts = useMemo(() => {
    const now = new Date();
    const threshold = dateRange === "30" ? subDays(now, 30)
      : dateRange === "90" ? subDays(now, 90)
        : dateRange === "365" ? subYears(now, 1)
          : null;
    const keyword = search.trim().toLowerCase();
    return (posts || [])
      .filter((post) => {
        const matchesCategory = category === "all" || getCategory(post.category) === category;
        const content = `${post.title} ${post.excerpt || ""} ${post.content} ${post.category || ""}`.toLowerCase();
        const matchesKeyword = !keyword || content.includes(keyword);
        const publishedDate = new Date(post.createdAt);
        const matchesDate = !threshold || (Number.isFinite(publishedDate.getTime()) && isAfter(publishedDate, threshold));
        return matchesCategory && matchesKeyword && matchesDate;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [posts, category, dateRange, search]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-900/[0.04] via-background to-background">
      <section className="border-b border-amber-900/10 bg-gradient-to-br from-amber-900/[0.08] via-background to-emerald-900/[0.04]">
        <div className="container mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-5 gap-2 border-amber-800/20 bg-background/70 px-3 py-1 text-amber-900 dark:text-amber-200">
              <Newspaper className="h-4 w-4" /> Mining sector intelligence
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl" data-testid="text-page-title">News &amp; Insights</h1>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-muted-foreground">
              Stay updated with the latest trends, news, and insights from Zambia&apos;s mining sector.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="sticky top-16 z-20 mb-8 rounded-2xl border border-border/70 bg-background/95 p-3 shadow-sm backdrop-blur md:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_200px_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search news, topics, or keywords"
                aria-label="Search news and insights"
                className="pl-9"
              />
              {search && (
                <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8" onClick={() => setSearch("")} aria-label="Clear search">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger aria-label="Filter articles by date"><SelectValue placeholder="Any time" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="30">Past 30 days</SelectItem>
                <SelectItem value="90">Past 90 days</SelectItem>
                <SelectItem value="365">Past year</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 overflow-x-auto lg:justify-end">
              <Button variant={category === "all" ? "default" : "outline"} size="sm" onClick={() => setCategory("all")}>All</Button>
              {categories.map((item) => (
                <Button key={item} variant={category === item ? "default" : "outline"} size="sm" className="shrink-0" onClick={() => setCategory(item)}>{item}</Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {isLoading ? "Loading latest articles…" : `${filteredPosts.length} ${filteredPosts.length === 1 ? "article" : "articles"}`}
          </p>
          {(category !== "all" || dateRange !== "any" || search) && (
            <Button variant="ghost" size="sm" onClick={() => { setCategory("all"); setDateRange("any"); setSearch(""); }}>Clear filters</Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden rounded-2xl">
                <Skeleton className="aspect-[16/9] w-full" />
                <CardContent className="space-y-4 p-5"><Skeleton className="h-5 w-28" /><Skeleton className="h-6 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <Card className="py-14 text-center">
            <CardContent>
              <h2 className="text-xl font-semibold">News is temporarily unavailable</h2>
              <p className="mt-2 text-muted-foreground">We couldn&apos;t load the latest articles. Please try again.</p>
              <Button className="mt-5" onClick={() => void refetch()}>Try again</Button>
            </CardContent>
          </Card>
        ) : filteredPosts.length > 0 ? (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => {
              const articleCategory = getCategory(post.category);
              const excerpt = (post.excerpt || post.content.replace(/[#*_`>]/g, "").trim()).slice(0, 170);
              return (
                <Card key={post.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-800/30 hover:shadow-lg" data-testid={`card-post-${post.id}`}>
                  <Link href={`/news/${encodeURIComponent(post.slug)}`} className="relative block aspect-[16/9] overflow-hidden bg-muted" aria-label={`Read ${post.title}`}>
                    <img
                      src={post.imageUrl || fallbackImages[index % fallbackImages.length]}
                      alt=""
                      loading={index > 2 ? "lazy" : "eager"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <Badge className="absolute left-4 top-4 border-white/30 bg-black/60 text-white backdrop-blur">{articleCategory}</Badge>
                  </Link>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                      <time dateTime={dateTimeValue(post.createdAt)}>{formatPublicationDate(post.createdAt)}</time>
                    </div>
                    <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
                      <Link href={`/news/${encodeURIComponent(post.slug)}`} className="transition-colors hover:text-amber-800 dark:hover:text-amber-300">{post.title}</Link>
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{excerpt}{excerpt.length >= 170 ? "…" : ""}</p>
                    <Link href={`/news/${encodeURIComponent(post.slug)}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-amber-800 transition-colors hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-200">
                      Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="py-14 text-center">
            <CardContent>
              <Newspaper className="mx-auto h-10 w-10 text-amber-800/60" />
              <h2 className="mt-4 text-xl font-semibold">{posts?.length ? "No matching articles" : "No articles published yet"}</h2>
              <p className="mt-2 text-muted-foreground">{posts?.length ? "Try a different search or adjust your filters." : "Check back soon for updates from Zambia's mining sector."}</p>
              {(category !== "all" || dateRange !== "any" || search) && (
                <Button variant="outline" className="mt-5" onClick={() => { setCategory("all"); setDateRange("any"); setSearch(""); }}>Clear filters</Button>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
