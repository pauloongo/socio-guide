import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "todos";
  const [selectedCategory, setSelectedCategory] = useState(category);
  
  const POSTS_PER_PAGE = 10;

  const { data: allPosts, isLoading } = useQuery({
    queryKey: ["posts", selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select("*, authors(name, bio, photo_url)", { count: 'exact' })
        .eq("published", true);
      
      if (selectedCategory !== "todos") {
        query = query.eq("category", selectedCategory);
      }
      
      query = query.order("date", { ascending: false });
      
      const { data, error, count } = await query;
      
      if (error) throw error;
      return { posts: data, total: count || 0 };
    },
  });

  const totalPages = allPosts ? Math.ceil(allPosts.total / POSTS_PER_PAGE) : 0;
  const posts = allPosts?.posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSearchParams({ category: value, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ category: selectedCategory, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Blog Benefícios Sociais 2025 | Guias Atualizados</title>
        <meta name="description" content="Descubra guias atualizados sobre Bolsa Família, INSS e BPC LOAS. Simuladores grátis e tabelas 2025." />
        <meta name="keywords" content="benefícios sociais 2025, bolsa família novembro, inss simulador, bpc loas requisitos, aposentadoria regras" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog Benefícios Sociais 2025 | Guias Atualizados" />
        <meta property="og:description" content="Descubra guias atualizados sobre Bolsa Família, INSS e BPC LOAS. Simuladores grátis e tabelas 2025." />
        <meta property="og:image" content="/placeholder.svg" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Benefícios Sociais 2025 | Guias Atualizados" />
        <meta name="twitter:description" content="Descubra guias atualizados sobre Bolsa Família, INSS e BPC LOAS. Simuladores grátis e tabelas 2025." />
        <meta name="twitter:image" content="/placeholder.svg" />
        
        {/* Canonical */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
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
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Filtrar por categoria:</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Bolsa Família">Bolsa Família</SelectItem>
                    <SelectItem value="INSS Aposentadoria">INSS Aposentadoria</SelectItem>
                    <SelectItem value="BPC LOAS">BPC LOAS</SelectItem>
                    <SelectItem value="Auxílio Gás">Auxílio Gás</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {allPosts && (
                <p className="text-sm text-muted-foreground">
                  {allPosts.total} {allPosts.total === 1 ? 'post encontrado' : 'posts encontrados'}
                </p>
              )}
            </div>

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
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts?.map((post) => (
                    <Card key={post.id} className="shadow-card hover:shadow-lg transition-all animate-fade-in">
                      {post.image_url && (
                        <div className="w-full h-48 overflow-hidden rounded-t-lg">
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="secondary">{post.category || "Outros"}</Badge>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription>
                          Por {(post as any).authors?.name || "Anônimo"} • {new Date(post.date).toLocaleDateString("pt-BR")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt || post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                        </p>
                        <Button asChild variant="secondary" className="w-full">
                          <Link to={`/blog/${post.slug}`}>Ler artigo completo</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "outline"}
                          size="icon"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}

            {posts && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum post encontrado para esta categoria.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;
