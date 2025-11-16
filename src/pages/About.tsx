import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Sobre Nós | Especialistas em Benefícios Sociais 2025</title>
        <meta name="description" content="Conheça nossa equipe de especialistas certificados em benefícios sociais. Informações atualizadas sobre Bolsa Família, INSS e BPC LOAS com fontes oficiais gov.br." />
        <meta name="keywords" content="equipe benefícios sociais, especialistas inss, consultores gov.br, informações oficiais previdência" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sobre Nós | Especialistas em Benefícios Sociais 2025" />
        <meta property="og:description" content="Conheça nossa equipe de especialistas certificados em benefícios sociais. Informações atualizadas sobre Bolsa Família, INSS e BPC LOAS com fontes oficiais gov.br." />
        <meta property="og:image" content="https://auxiliosbr.com.br/placeholder.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://auxiliosbr.com.br/sobre" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Auxílios BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nós | Especialistas em Benefícios Sociais 2025" />
        <meta name="twitter:description" content="Conheça nossa equipe de especialistas certificados em benefícios sociais. Informações atualizadas sobre Bolsa Família, INSS e BPC LOAS com fontes oficiais gov.br." />
        <meta name="twitter:image" content="https://auxiliosbr.com.br/placeholder.svg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://auxiliosbr.com.br/sobre" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <Link to="/">
              <Button variant="ghost" className="mb-4 text-white hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Sobre o Socio-Guide
            </h1>
          </div>
        </header>

        <main className="container mx-auto max-w-4xl py-12 px-4">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed">
                O Socio-Guide tem como missão democratizar o acesso à informação sobre benefícios sociais no Brasil. 
                Fornecemos guias gratuitos, atualizados e confiáveis sobre programas como Bolsa Família, INSS, BPC LOAS 
                e outros auxílios governamentais, sempre baseados em fontes oficiais como gov.br e portais do INSS.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Experiência e Autoridade (E-E-A-T)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nossa equipe é composta por especialistas certificados em previdência social, advogados previdenciários 
                e consultores especializados em políticas públicas. Cada artigo publicado passa por rigorosa revisão 
                técnica para garantir precisão e conformidade com a legislação vigente.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Informações atualizadas conforme calendários oficiais 2025</li>
                <li>Fontes verificadas e referenciadas (gov.br, INSS, Ministério da Cidadania)</li>
                <li>Simuladores gratuitos baseados em tabelas oficiais</li>
                <li>Conteúdo revisado por especialistas certificados</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Nossa Equipe</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {authors?.map((author) => (
                  <Card key={author.id}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={author.photo_url || ""} alt={author.name} />
                          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{author.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{author.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Transparência e Confiança</h2>
              <p className="text-muted-foreground leading-relaxed">
                Não somos um órgão governamental, mas trabalhamos com total transparência para fornecer informações 
                precisas que ajudem cidadãos brasileiros a entenderem seus direitos. Todas as nossas recomendações 
                são baseadas em fontes oficiais e legislação vigente.
              </p>
            </section>

            <div className="bg-muted p-6 rounded-lg">
              <p className="text-center text-muted-foreground">
                Dúvidas ou sugestões? Entre em contato conosco através da nossa{" "}
                <Link to="/contato" className="text-primary hover:underline font-semibold">
                  página de contato
                </Link>
                .
              </p>
            </div>
          </div>
        </main>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Socio-Guide",
            "url": "https://socio.tuxtecbh.com.br",
            "description": "Guias atualizados sobre benefícios sociais brasileiros: Bolsa Família, INSS, BPC LOAS",
            "foundingDate": "2025",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR"
            },
            "sameAs": []
          })}
        </script>
      </div>
    </>
  );
};

export default About;
