import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["sitemap-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("slug, updated_at, date")
        .eq("published", true)
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !posts) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gerando Sitemap...</h1>
          <p className="text-muted-foreground">
            Aguarde enquanto geramos o sitemap.xml
          </p>
        </div>
      </div>
    );
  }

  const baseUrl = "https://socio.tuxtecbh.com.br";
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/sobre</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contato</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
${posts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return (
    <pre style={{ 
      margin: 0, 
      padding: 0, 
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    }}>
      {sitemap}
    </pre>
  );
};

export default Sitemap;
