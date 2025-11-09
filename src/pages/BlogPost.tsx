import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import AdSlot from "@/components/AdSlot";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
        <Button asChild>
          <Link to="/blog">Voltar ao Blog</Link>
        </Button>
      </div>
    );
  }

  const description = post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 160);
  const keywords = post.keywords || `benefícios sociais 2025, ${post.title.toLowerCase().split(' ').slice(0, 5).join(', ')}`;

  return (
    <>
      <Helmet>
        <title>{post.title} | Benefícios Sociais 2025</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={post.image_url || '/placeholder.svg'} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={post.image_url || '/placeholder.svg'} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": description,
            "image": post.image_url || '/placeholder.svg',
            "datePublished": post.date,
            "dateModified": post.updated_at,
            "author": {
              "@type": "Organization",
              "name": "Benefícios Sociais"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Benefícios Sociais",
              "logo": {
                "@type": "ImageObject",
                "url": "/placeholder.svg"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Button asChild variant="outline" className="mb-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Link>
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-primary-foreground/80">
              {new Date(post.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </header>

        <main className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <AdSlot pageSlug={`/blog/${slug}`} position="topo" />
            
            {post.image_url && (
              <div className="w-full h-[400px] overflow-hidden rounded-lg mt-8 mb-8">
                <img 
                  src={post.image_url} 
                  alt={`Ilustração: ${post.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <article 
              className="prose prose-lg max-w-none mt-8 prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <AdSlot pageSlug={`/blog/${slug}`} position="meio" className="my-12" />
            
            <div className="mt-12 pt-8 border-t border-border">
              <Button asChild variant="secondary" size="lg">
                <Link to="/blog">Ver mais artigos</Link>
              </Button>
            </div>

            <AdSlot pageSlug={`/blog/${slug}`} position="rodape" className="mt-12" />
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPost;
