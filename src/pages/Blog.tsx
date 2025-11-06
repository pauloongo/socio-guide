import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button asChild variant="outline" className="mb-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">Blog</h1>
          <p className="text-lg text-primary-foreground/90 mt-2">
            Informações atualizadas sobre benefícios sociais
          </p>
        </div>
      </header>

      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="shadow-card animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post) => (
                <Card key={post.id} className="shadow-card hover:shadow-lg transition-all animate-fade-in">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to={`/blog/${post.slug}`}>Ler artigo completo</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhum post publicado ainda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
