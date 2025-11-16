import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle, FileText, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SimuladorBolsaFamilia2026 = () => {
  const [renda, setRenda] = useState("");
  const [membros, setMembros] = useState("");
  const [criancas, setCriancas] = useState("");
  const [gestantes, setGestantes] = useState("");
  const [resultado, setResultado] = useState<{
    elegivel: boolean;
    valor: number;
    detalhes: string;
  } | null>(null);

  const calcularBolsa = () => {
    const rendaNum = parseFloat(renda);
    const membrosNum = parseInt(membros);
    const criancasNum = parseInt(criancas || "0");
    const gestantesNum = parseInt(gestantes || "0");
    
    if (isNaN(rendaNum) || isNaN(membrosNum) || membrosNum === 0) {
      setResultado({
        elegivel: false,
        valor: 0,
        detalhes: "Por favor, preencha todos os campos obrigatórios corretamente."
      });
      return;
    }
    
    const perCapita = rendaNum / membrosNum;
    let valor = 0;
    let detalhes = "";
    
    // Valores base previstos para 2026 (baseados em projeções)
    const LIMITE_POBREZA_EXTREMA = 218;
    const LIMITE_POBREZA = 300;
    const VALOR_BASE_EXTREMA = 700;
    const VALOR_BASE_POBREZA = 500;
    const VALOR_ADICIONAL_CRIANCA = 150;
    const VALOR_ADICIONAL_GESTANTE = 150;
    
    if (perCapita <= LIMITE_POBREZA_EXTREMA) {
      valor = VALOR_BASE_EXTREMA;
      detalhes = `Família em situação de extrema pobreza (renda per capita R$ ${perCapita.toFixed(2)}). Valor base: R$ ${VALOR_BASE_EXTREMA}.`;
      
      if (criancasNum > 0) {
        valor += criancasNum * VALOR_ADICIONAL_CRIANCA;
        detalhes += ` + R$ ${criancasNum * VALOR_ADICIONAL_CRIANCA} (${criancasNum} criança(s)).`;
      }
      
      if (gestantesNum > 0) {
        valor += gestantesNum * VALOR_ADICIONAL_GESTANTE;
        detalhes += ` + R$ ${gestantesNum * VALOR_ADICIONAL_GESTANTE} (${gestantesNum} gestante(s)).`;
      }
      
      setResultado({
        elegivel: true,
        valor,
        detalhes
      });
    } else if (perCapita <= LIMITE_POBREZA) {
      valor = VALOR_BASE_POBREZA;
      detalhes = `Família em situação de pobreza (renda per capita R$ ${perCapita.toFixed(2)}). Valor base: R$ ${VALOR_BASE_POBREZA}.`;
      
      if (criancasNum > 0) {
        valor += criancasNum * VALOR_ADICIONAL_CRIANCA;
        detalhes += ` + R$ ${criancasNum * VALOR_ADICIONAL_CRIANCA} (${criancasNum} criança(s)).`;
      }
      
      if (gestantesNum > 0) {
        valor += gestantesNum * VALOR_ADICIONAL_GESTANTE;
        detalhes += ` + R$ ${gestantesNum * VALOR_ADICIONAL_GESTANTE} (${gestantesNum} gestante(s)).`;
      }
      
      setResultado({
        elegivel: true,
        valor,
        detalhes
      });
    } else {
      setResultado({
        elegivel: false,
        valor: 0,
        detalhes: `Renda per capita (R$ ${perCapita.toFixed(2)}) acima do limite de R$ ${LIMITE_POBREZA}. Família não elegível para Bolsa Família em 2026.`
      });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Simulador Bolsa Família 2026",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        },
        "description": "Calculadora gratuita para simular o valor do Bolsa Família 2026 com base na renda familiar e composição do grupo. Resultados instantâneos baseados nas regras oficiais do MDS.",
        "author": {
          "@type": "Organization",
          "name": "Auxílios BR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Como funciona o Bolsa Família 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Bolsa Família 2026 é um programa de transferência de renda para famílias em situação de pobreza e extrema pobreza. Famílias com renda per capita até R$ 218 recebem valor base de R$ 700, mais adicionais por criança e gestante. Famílias com renda entre R$ 218 e R$ 300 recebem R$ 500 mais adicionais."
            }
          },
          {
            "@type": "Question",
            "name": "Quem tem direito ao Bolsa Família 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Têm direito famílias com renda mensal por pessoa de até R$ 218 (extrema pobreza) ou até R$ 300 (pobreza). É necessário estar inscrito no Cadastro Único (CadÚnico) e manter os dados atualizados. Famílias com crianças, adolescentes até 21 anos, gestantes e nutrizes têm prioridade."
            }
          },
          {
            "@type": "Question",
            "name": "Qual o valor do Bolsa Família em 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Em 2026, o valor base previsto é de R$ 700 para extrema pobreza e R$ 500 para pobreza. Há adicionais de R$ 150 por criança de 0 a 6 anos e R$ 150 por gestante. O valor final depende da composição familiar e pode ultrapassar R$ 1.000 em alguns casos."
            }
          },
          {
            "@type": "Question",
            "name": "Como me cadastrar no Bolsa Família 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Primeiro faça o cadastro no CadÚnico em um CRAS ou posto de atendimento do município. Leve RG, CPF, comprovante de residência e certidões de nascimento de todos os membros da família. Após o cadastro, aguarde a análise do MDS que pode levar até 45 dias."
            }
          },
          {
            "@type": "Question",
            "name": "Como consultar se fui aprovado no Bolsa Família 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consulte pelo aplicativo Caixa Tem, site da Caixa Econômica Federal ou pelo telefone 111. Você também pode verificar no CRAS do seu município. É necessário ter o NIS (Número de Identificação Social) em mãos."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Simulador Bolsa Família 2026: Calcule Seu Benefício em Minutos | Auxílios BR</title>
        <meta name="description" content="Simule o Bolsa Família 2026 online e grátis. Calcule quanto você pode receber, veja quem tem direito e consulte o calendário de pagamentos atualizado. Resultados instantâneos." />
        <meta name="keywords" content="simulador bolsa família 2026, calculadora bolsa família 2026, simular valor bolsa família, quanto vou receber bolsa família 2026, calcular benefício bolsa família, bolsa família 2026 valores" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Simulador Bolsa Família 2026: Calcule Seu Benefício | Auxílios BR" />
        <meta property="og:description" content="Simule grátis o valor do Bolsa Família 2026. Descubra se você tem direito e quanto pode receber. Resultados instantâneos baseados nas regras oficiais." />
        <meta property="og:image" content="https://auxiliosbr.com.br/placeholder.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://auxiliosbr.com.br/simulador-bolsa-familia-2026" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Auxílios BR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simulador Bolsa Família 2026: Calcule Seu Benefício" />
        <meta name="twitter:description" content="Simule grátis o valor do Bolsa Família 2026. Descubra se você tem direito e quanto pode receber." />
        <meta name="twitter:image" content="https://auxiliosbr.com.br/placeholder.svg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://auxiliosbr.com.br/simulador-bolsa-familia-2026" />
        
        {/* Schema JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <article itemScope itemType="https://schema.org/SoftwareApplication">
          {/* Hero Section */}
          <header className="bg-gradient-hero py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Atualizado para 2026
              </Badge>
              <h1 itemProp="name" className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Simulador Bolsa Família 2026: Calcule Seu Benefício em Minutos
              </h1>
              <p itemProp="description" className="text-xl text-primary-foreground/90 max-w-3xl">
                Descubra instantaneamente se você tem direito ao Bolsa Família 2026 e qual será o valor do seu benefício. 
                Calculadora grátis, atualizada e baseada nas regras oficiais do Ministério do Desenvolvimento Social (MDS).
              </p>
            </div>
          </header>

          <main className="container mx-auto max-w-6xl py-12 px-4">
            {/* Simulador */}
            <section className="mb-16">
              <Card className="shadow-lg border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    Simule Agora o Bolsa Família 2026
                  </CardTitle>
                  <CardDescription>
                    Preencha os dados da sua família para calcular o valor estimado do benefício
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="renda">Renda total da família (R$) *</Label>
                      <Input
                        id="renda"
                        type="number"
                        placeholder="Ex: 500"
                        value={renda}
                        onChange={(e) => setRenda(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="membros">Número de pessoas na família *</Label>
                      <Input
                        id="membros"
                        type="number"
                        placeholder="Ex: 4"
                        value={membros}
                        onChange={(e) => setMembros(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="criancas">Crianças de 0 a 6 anos</Label>
                      <Input
                        id="criancas"
                        type="number"
                        placeholder="Ex: 2"
                        value={criancas}
                        onChange={(e) => setCriancas(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gestantes">Gestantes na família</Label>
                      <Input
                        id="gestantes"
                        type="number"
                        placeholder="Ex: 0"
                        value={gestantes}
                        onChange={(e) => setGestantes(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calcularBolsa}
                    className="w-full text-lg py-6"
                    size="lg"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular Valor do Benefício 2026
                  </Button>

                  {resultado && (
                    <div className={`p-6 rounded-lg border-2 ${resultado.elegivel ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                      <div className="flex items-start gap-3">
                        {resultado.elegivel ? (
                          <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                        ) : (
                          <HelpCircle className="h-6 w-6 text-orange-600 mt-1" />
                        )}
                        <div>
                          {resultado.elegivel ? (
                            <>
                              <h3 className="text-xl font-bold text-green-800 mb-2">
                                Parabéns! Você tem direito ao Bolsa Família 2026
                              </h3>
                              <p className="text-3xl font-bold text-green-700 mb-2">
                                R$ {resultado.valor.toFixed(2)}/mês
                              </p>
                              <p className="text-sm text-green-700">{resultado.detalhes}</p>
                              <div className="mt-4 space-y-2">
                                <Button asChild variant="default" className="w-full">
                                  <Link to="/blog">
                                    Ver Guia Completo de Cadastro
                                  </Link>
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <h3 className="text-xl font-bold text-orange-800 mb-2">
                                Resultado da Simulação
                              </h3>
                              <p className="text-sm text-orange-700">{resultado.detalhes}</p>
                              <p className="text-sm text-orange-600 mt-2">
                                Confira outros benefícios sociais disponíveis na <Link to="/" className="underline font-semibold">página inicial</Link>.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Como funciona */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Como Funciona o Bolsa Família 2026</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O Bolsa Família 2026 continua sendo o principal programa de transferência de renda do Brasil, 
                  beneficiando milhões de famílias em situação de vulnerabilidade social. O programa foi reformulado 
                  em 2023 e mantém suas diretrizes para 2026 com valores atualizados.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  O valor do benefício é calculado com base na renda per capita familiar (renda total dividida pelo 
                  número de pessoas) e na composição do grupo familiar. Famílias com crianças pequenas e gestantes 
                  recebem valores adicionais significativos.
                </p>
              </div>
            </section>

            {/* Quem tem direito */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Quem Tem Direito ao Bolsa Família 2026</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Extrema Pobreza</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Renda per capita até <strong>R$ 218,00</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Valor base: <strong>R$ 700,00</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>+ R$ 150 por criança de 0 a 6 anos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>+ R$ 150 por gestante</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Pobreza</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Renda per capita entre <strong>R$ 218,01 e R$ 300,00</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Valor base: <strong>R$ 500,00</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>+ R$ 150 por criança de 0 a 6 anos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>+ R$ 150 por gestante</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Documentos necessários */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Documentos Necessários para Cadastro</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="grid md:grid-cols-2 gap-4">
                    <li className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>CPF ou Título de Eleitor do responsável familiar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Certidão de Nascimento de todos os membros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Comprovante de residência atualizado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>CPF de todos os membros acima de 16 anos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Carteira de Trabalho (se houver)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Comprovante de matrícula escolar das crianças</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Como se cadastrar */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Como Se Cadastrar no Bolsa Família 2026</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Procure o CRAS mais próximo</h3>
                        <p className="text-muted-foreground">
                          Dirija-se ao Centro de Referência de Assistência Social (CRAS) do seu município ou posto de atendimento do CadÚnico.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Leve os documentos</h3>
                        <p className="text-muted-foreground">
                          Apresente CPF, RG, comprovante de residência e certidões de nascimento de todos os membros da família.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Faça a entrevista</h3>
                        <p className="text-muted-foreground">
                          Responda às perguntas do entrevistador sobre composição familiar, renda, despesas e condições de moradia.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Aguarde a análise</h3>
                        <p className="text-muted-foreground">
                          O Ministério do Desenvolvimento Social analisa o cadastro em até 45 dias. Consulte o resultado pelo app Caixa Tem ou telefone 111.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Tabela de valores */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Tabela de Valores Bolsa Família 2026</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Composição Familiar</th>
                      <th className="border border-border p-3 text-left">Renda Per Capita</th>
                      <th className="border border-border p-3 text-right">Valor Base</th>
                      <th className="border border-border p-3 text-right">Adicional Crianças</th>
                      <th className="border border-border p-3 text-right">Total Estimado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3">1 adulto</td>
                      <td className="border border-border p-3">Até R$ 218</td>
                      <td className="border border-border p-3 text-right font-semibold">R$ 700</td>
                      <td className="border border-border p-3 text-right">-</td>
                      <td className="border border-border p-3 text-right font-bold">R$ 700</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border p-3">1 adulto + 1 criança</td>
                      <td className="border border-border p-3">Até R$ 218</td>
                      <td className="border border-border p-3 text-right font-semibold">R$ 700</td>
                      <td className="border border-border p-3 text-right">R$ 150</td>
                      <td className="border border-border p-3 text-right font-bold">R$ 850</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">2 adultos + 2 crianças</td>
                      <td className="border border-border p-3">Até R$ 218</td>
                      <td className="border border-border p-3 text-right font-semibold">R$ 700</td>
                      <td className="border border-border p-3 text-right">R$ 300</td>
                      <td className="border border-border p-3 text-right font-bold">R$ 1.000</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border p-3">2 adultos + 3 crianças</td>
                      <td className="border border-border p-3">Até R$ 218</td>
                      <td className="border border-border p-3 text-right font-semibold">R$ 700</td>
                      <td className="border border-border p-3 text-right">R$ 450</td>
                      <td className="border border-border p-3 text-right font-bold">R$ 1.150</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">1 adulto</td>
                      <td className="border border-border p-3">R$ 218-300</td>
                      <td className="border border-border p-3 text-right font-semibold">R$ 500</td>
                      <td className="border border-border p-3 text-right">-</td>
                      <td className="border border-border p-3 text-right font-bold">R$ 500</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border p-3">2 adultos + 2 crianças</td>
                      <td className="border border-border p-3">R$ 218-300</td>
                      <td className="border border-border p-3 text-right font-semibold">R$ 500</td>
                      <td className="border border-border p-3 text-right">R$ 300</td>
                      <td className="border border-border p-3 text-right font-bold">R$ 800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * Valores estimados para 2026 baseados nas regras atuais. Valores oficiais serão confirmados pelo MDS.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Perguntas Frequentes sobre Bolsa Família 2026</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">Como funciona o Bolsa Família 2026?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    O Bolsa Família 2026 é um programa de transferência de renda para famílias em situação de pobreza e extrema pobreza. 
                    Famílias com renda per capita até R$ 218 recebem valor base de R$ 700, mais adicionais por criança e gestante. 
                    Famílias com renda entre R$ 218 e R$ 300 recebem R$ 500 mais adicionais. O pagamento é mensal via Caixa Econômica Federal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">Quem tem direito ao Bolsa Família 2026?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Têm direito famílias com renda mensal por pessoa de até R$ 218 (extrema pobreza) ou até R$ 300 (pobreza). 
                    É necessário estar inscrito no Cadastro Único (CadÚnico) e manter os dados atualizados a cada 2 anos. 
                    Famílias com crianças, adolescentes até 21 anos, gestantes e nutrizes têm prioridade no programa.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">Qual o valor do Bolsa Família em 2026?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Em 2026, o valor base previsto é de R$ 700 para extrema pobreza e R$ 500 para pobreza. 
                    Há adicionais de R$ 150 por criança de 0 a 6 anos e R$ 150 por gestante ou nutriz. 
                    O valor final depende da composição familiar e pode ultrapassar R$ 1.000 em famílias numerosas com crianças pequenas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">Como me cadastrar no Bolsa Família 2026?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Primeiro faça o cadastro no CadÚnico em um CRAS ou posto de atendimento do município. 
                    Leve RG, CPF, comprovante de residência e certidões de nascimento de todos os membros da família. 
                    Após o cadastro, aguarde a análise do MDS que pode levar até 45 dias. Não há taxa para se cadastrar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">Como consultar se fui aprovado no Bolsa Família 2026?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Consulte pelo aplicativo Caixa Tem (disponível para Android e iOS), site da Caixa Econômica Federal 
                    ou pelo telefone 111 (atendimento 24h). Você também pode verificar no CRAS do seu município. 
                    É necessário ter o NIS (Número de Identificação Social) em mãos para consulta.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Links úteis */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Links Úteis - Fontes Oficiais</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li>
                      <a 
                        href="https://www.gov.br/mds" 
                        target="_blank" 
                        rel="nofollow noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        Ministério do Desenvolvimento Social (MDS)
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://cadunico.dataprev.gov.br" 
                        target="_blank" 
                        rel="nofollow noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        Cadastro Único (CadÚnico)
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.caixa.gov.br/programas-sociais/bolsa-familia/" 
                        target="_blank" 
                        rel="nofollow noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        Caixa Econômica Federal - Bolsa Família
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://www.gov.br/pt-br/servicos/consultar-bolsa-familia" 
                        target="_blank" 
                        rel="nofollow noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        Gov.br - Consultar Bolsa Família
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* CTA final */}
            <section className="bg-muted rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Mais Guias sobre Benefícios Sociais
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Explore nossos outros simuladores e guias completos sobre INSS, BPC LOAS e demais benefícios sociais disponíveis em 2026.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link to="/calculadoras">
                    Ver Todas as Calculadoras
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/blog">
                    Ler Guias Completos
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/sobre">
                    Sobre Nossa Equipe
                  </Link>
                </Button>
              </div>
            </section>
          </main>

          {/* Footer disclaimer */}
          <footer className="bg-muted py-8 px-4 mt-12">
            <div className="container mx-auto max-w-6xl">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Aviso Importante:</strong> Este é um site independente e não possui vínculo oficial com o Governo Federal, 
                Ministério do Desenvolvimento Social (MDS) ou Caixa Econômica Federal. Os valores apresentados são estimativas baseadas 
                nas regras atuais do programa e podem variar conforme atualizações oficiais. Para informações oficiais, 
                consulte sempre os canais do MDS em <a href="https://www.gov.br/mds" target="_blank" rel="nofollow noopener noreferrer" className="underline">gov.br/mds</a>. 
                As regras do Bolsa Família 2026 estão sujeitas a alterações conforme legislação e orçamento federal aprovados.
              </p>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export default SimuladorBolsaFamilia2026;
