import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Copy, ExternalLink, Newspaper, Share2 } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import copperrise from "../../../attached_assets/files/Newsinsghts/copperrise.jpg";
import emeraldzambia from "../../../attached_assets/files/Newsinsghts/emeraldzambia.png";
import investmentguide from "../../../attached_assets/files/Newsinsghts/investmentguide.jpg";
import userNews from "../../../attached_assets/files/Newsinsghts/news1.jpeg";

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
  return Number.isFinite(date.getTime()) ? format(date, "MMMM d, yyyy") : "Date unavailable";
}

function dateTimeValue(createdAt: Date | string): string | undefined {
  const date = new Date(createdAt);
  return Number.isFinite(date.getTime()) ? date.toISOString() : undefined;
}

export default function NewsArticle() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug;
  const { toast } = useToast();
  const articleQuery = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await fetch(`/api/blog/${encodeURIComponent(slug!)}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error("This article could not be found.");
        throw new Error("Unable to load this article.");
      }
      return response.json() as Promise<BlogPost>;
    },
  });
  const relatedQuery = useQuery<BlogPost[]>({ queryKey: ["/api/blog"] });
  const article = articleQuery.data;

  useEffect(() => {
    if (!article) return;
    const previousTitle = document.title;
    const description = article.excerpt || article.content.slice(0, 155);
    document.title = `${article.title} | News & Insights | Fusion Mining`;

    let descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdDescriptionMeta = !descriptionMeta;
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.name = "description";
      document.head.appendChild(descriptionMeta);
    }
    const previousDescription = descriptionMeta.content;
    descriptionMeta.content = description.replace(/\s+/g, " ").slice(0, 160);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.href;
    canonical.href = new URL(`/news/${encodeURIComponent(article.slug)}`, window.location.origin).toString();

    return () => {
      document.title = previousTitle;
      if (descriptionMeta) {
        if (createdDescriptionMeta) descriptionMeta.remove();
        else descriptionMeta.content = previousDescription;
      }
      if (canonical) {
        if (createdCanonical) canonical.remove();
        else canonical.href = previousCanonical;
      }
    };
  }, [article]);

  const articleUrl = article
    ? new URL(`/news/${encodeURIComponent(article.slug)}`, window.location.origin).toString()
    : "";
  const shareArticle = async () => {
    if (!article) return;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: article.title, url: articleUrl });
        return;
      }
      await navigator.clipboard.writeText(articleUrl);
      toast({ title: "Link copied", description: "The article link is ready to share." });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      toast({
        title: "Unable to share this article",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      toast({ title: "Link copied", description: "The article link is ready to share." });
    } catch (error) {
      toast({
        title: "Unable to copy the link",
        description: error instanceof Error ? error.message : "Clipboard access is unavailable in this browser.",
        variant: "destructive",
      });
    }
  };

  if (articleQuery.isLoading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Skeleton className="mb-6 h-9 w-40" />
        <Skeleton className="aspect-[16/7] w-full rounded-2xl" />
        <div className="mx-auto mt-8 max-w-3xl space-y-4"><Skeleton className="h-8 w-32" /><Skeleton className="h-12 w-full" /><Skeleton className="h-5 w-48" /><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-4/5" /></div>
      </main>
    );
  }

  if (articleQuery.isError || !article) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <Newspaper className="mx-auto h-12 w-12 text-amber-800/60" />
        <h1 className="mt-4 text-2xl font-semibold">Article unavailable</h1>
        <p className="mt-2 text-muted-foreground">{articleQuery.error instanceof Error ? articleQuery.error.message : "This article may have been removed."}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => void articleQuery.refetch()}>Try again</Button>
          <Button asChild><Link href="/news">Back to News &amp; Insights</Link></Button>
        </div>
      </main>
    );
  }

  const relatedArticles = (relatedQuery.data || [])
    .filter((post) => post.id !== article.id && getCategory(post.category) === getCategory(article.category))
    .slice(0, 3);
  const moreFromFusion = (relatedQuery.data || [])
    .filter((post) => post.id !== article.id && getCategory(post.category) === "Company Updates")
    .slice(0, 3);
  const articleContent = article.content
    .replace(/^\s*(?:#{1,6}\s*)?\[?add your insights here\]?\s*$/gim, "")
    .trim();
  const shareText = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(articleUrl);

  const articleCard = (post: BlogPost, index: number) => (
    <Link key={post.id} href={`/news/${encodeURIComponent(post.slug)}`}>
      <Card className="h-full overflow-hidden rounded-xl border-border/70 transition-all hover:-translate-y-0.5 hover:border-amber-800/30 hover:shadow-lg">
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img src={post.imageUrl || fallbackImages[index % fallbackImages.length]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
        </div>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">{getCategory(post.category)}</Badge>
          <h3 className="line-clamp-2 font-semibold leading-snug">{post.title}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{formatPublicationDate(post.createdAt)}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-800 dark:text-amber-300">Read article <ArrowRight className="h-4 w-4" /></span>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-900/[0.03] via-background to-background">
      <article>
        <header className="container mx-auto max-w-6xl px-4 pt-8 md:pt-12">
          <Button asChild variant="ghost" className="mb-6 -ml-3 text-muted-foreground">
            <Link href="/news"><ArrowLeft className="mr-2 h-4 w-4" />All news &amp; insights</Link>
          </Button>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm">
            <img src={article.imageUrl || fallbackImages[0]} alt={article.title} className="aspect-[16/7] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 md:p-10">
              <Badge className="mb-3 border-white/30 bg-black/50 text-white backdrop-blur">{getCategory(article.category)}</Badge>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">{article.title}</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:py-12">
          <div className="min-w-0">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-amber-700 dark:text-amber-400" /><time dateTime={dateTimeValue(article.createdAt)}>{formatPublicationDate(article.createdAt)}</time></span>
                <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-700" />Fusion Mining Editorial</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => void shareArticle()}><Share2 className="mr-2 h-4 w-4" />Share</Button>
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => void copyLink()} aria-label="Copy article link"><Copy className="h-4 w-4" /></Button>
              </div>
            </div>

            {article.excerpt && <p className="mb-8 border-l-2 border-amber-700 pl-5 text-lg leading-8 text-foreground/80">{article.excerpt}</p>}
            <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-amber-800 prose-img:rounded-xl dark:prose-invert dark:prose-a:text-amber-300">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{articleContent}</ReactMarkdown>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="border-amber-800/15 bg-gradient-to-br from-amber-800/[0.05] to-card">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Article source</p>
                <h2 className="mt-2 font-semibold">Fusion Mining Editorial</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Mining sector reporting and insights curated for the Zambian mining community.</p>
                <Link href="/about" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-800 hover:underline dark:text-amber-300">About Fusion Mining <ExternalLink className="h-3.5 w-3.5" /></Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold">Share this insight</h2>
                <div className="mt-3 grid gap-2">
                  <Button variant="outline" className="justify-start" asChild><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />LinkedIn</a></Button>
                  <Button variant="outline" className="justify-start" asChild><a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />X / Twitter</a></Button>
                  <Button variant="outline" className="justify-start" onClick={() => void copyLink()}><Copy className="mr-2 h-4 w-4" />Copy link</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t border-border/60 bg-muted/20">
          <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
            <h2 className="text-2xl font-semibold tracking-tight">Similar Insights</h2>
            <p className="mt-1 text-sm text-muted-foreground">More reporting in {getCategory(article.category)}.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{relatedArticles.map(articleCard)}</div>
          </div>
        </section>
      )}
      {moreFromFusion.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-2xl font-semibold tracking-tight">More from Fusion Mining</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{moreFromFusion.map(articleCard)}</div>
        </section>
      )}
    </main>
  );
}
