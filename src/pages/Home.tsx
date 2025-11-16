import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const Home = () => {
  const [renda, setRenda] = useState("");
  const [membros, setMembros] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  const { data: posts } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, authors(name, bio, photo_url)")
        .eq("published", true)
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const calcularBolsa = () => {
    const rendaNum = parseFloat(renda);
    const membrosNum = parseInt(membros);
    
    if (isNaN(rendaNum) || isNaN(membrosNum) || membrosNum === 0) {
      setResultado(0);
      return;
    }
    
    const perCapita = rendaNum / membrosNum;
    let valor = 0;
    
    if (perCapita <= 218) {
      valor = 700;
    } else if (perCapita <= 300) {
      valor = 500;
    }
    
    setResultado(valor);
  };

  return (
    <>
      <Helmet>
        <title>Auxílios BR 2025 | Simulador Bolsa Família, INSS e BPC LOAS</title>
        <meta name="description" content="Guia completo de benefícios sociais 2025. Simule Bolsa Família, INSS e BPC grátis. Informações atualizadas sobre seus direitos." />
        <meta name="keywords" content="benefícios sociais 2025, bolsa família simulador, inss aposentadoria, bpc loas, auxílios brasil, simulador grátis" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Auxílios BR 2025 | Simulador Bolsa Família, INSS e BPC LOAS" />
        <meta property="og:description" content="Guia completo de benefícios sociais 2025. Simule Bolsa Família, INSS e BPC grátis. Informações atualizadas sobre seus direitos." />
        <meta property="og:image" content="https://auxiliosbr.com.br/placeholder.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://auxiliosbr.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Auxílios BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auxílios BR 2025 | Simulador Bolsa Família, INSS e BPC LOAS" />
        <meta name="twitter:description" content="Guia completo de benefícios sociais 2025. Simule Bolsa Família, INSS e BPC grátis. Informações atualizadas sobre seus direitos." />
        <meta name="twitter:image" content="https://auxiliosbr.com.br/placeholder.svg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://auxiliosbr.com.br" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Auxílios BR 2025 | Simulador Bolsa Família, INSS e BPC LOAS" />
        <meta property="og:description" content="Guia completo de benefícios sociais 2025. Simule Bolsa Família, INSS e BPC grátis." />
        <meta property="og:image" content="/placeholder.svg" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auxílios BR 2025 | Simulador Bolsa Família, INSS e BPC LOAS" />
        <meta name="twitter:description" content="Guia completo de benefícios sociais 2025. Simule Bolsa Família, INSS e BPC grátis." />
        <meta name="twitter:image" content="/placeholder.svg" />
        
        {/* Canonical */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center text-primary-foreground">
            <h1 className="mb-6 text-4xl md:text-6xl font-bold animate-fade-in">
              Benefícios Sociais 2025
            </h1>
            <p className="mb-8 text-lg md:text-xl max-w-2xl animate-fade-in opacity-95">
              Simule Bolsa Família, INSS e BPC grátis. Informações atualizadas sobre seus direitos.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button asChild variant="hero" size="lg">
                <a href="#simulador">Simular Agora</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/blog">Ver Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simulador Section */}
      <section id="simulador" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Calculator className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl">Simulador Bolsa Família</CardTitle>
              <CardDescription className="text-base">
                Descubra se você tem direito e qual o valor estimado para novembro de 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="renda">Renda Familiar Total (R$)</Label>
                  <Input
                    id="renda"
                    type="number"
                    placeholder="Ex: 1500"
                    value={renda}
                    onChange={(e) => setRenda(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membros">Número de Pessoas na Família</Label>
                  <Input
                    id="membros"
                    type="number"
                    placeholder="Ex: 4"
                    value={membros}
                    onChange={(e) => setMembros(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calcularBolsa} className="w-full" size="lg">
                Calcular Valor
              </Button>
              
              {resultado !== null && (
                <div className="mt-6 p-6 bg-gradient-card rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Valor estimado do benefício:</p>
                  <p className="text-4xl font-bold text-primary">R$ {resultado},00</p>
                  {resultado > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      *Valor estimado. Consulte os critérios completos no blog.
                    </p>
                  )}
                  {resultado === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Renda per capita acima do limite. Veja outros benefícios disponíveis.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <Calculator className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Simuladores Grátis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Calcule Bolsa Família, aposentadoria INSS e BPC LOAS de forma rápida e precisa.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-secondary mb-4" />
                <CardTitle>Informações Atualizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conteúdo sempre atualizado com as últimas mudanças na legislação de 2025.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Guias Completos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Passo a passo detalhado para solicitar cada benefício social disponível.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Posts em Destaque */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Todos os Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
                    <Link to={`/blog/${post.slug}`}>Ler mais</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {posts && posts.length > 8 && (
            <div className="text-center mt-8">
              <Button asChild size="lg" variant="default">
                <Link to="/blog">Ver Todos os Posts no Blog</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;
