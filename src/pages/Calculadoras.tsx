import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import CalculadoraINSS from "@/components/calculadoras/CalculadoraINSS";
import SimuladorBPC from "@/components/calculadoras/SimuladorBPC";
import CalculadoraAuxilioGas from "@/components/calculadoras/CalculadoraAuxilioGas";

const Calculadoras = () => {
  return (
    <>
      <Helmet>
        <title>Simuladores Gratuitos Benefícios 2025 | Socio-Guide</title>
        <meta name="description" content="Calcule seu benefício INSS, simule elegibilidade BPC LOAS e Auxílio Gás. Simuladores gratuitos atualizados com regras 2025." />
        <meta name="keywords" content="calculadora INSS, simulador BPC LOAS, auxílio gás, benefícios sociais 2025" />
        <link rel="canonical" href="https://auxiliosbr.com.br/calculadoras" />
        <meta property="og:title" content="Simuladores Gratuitos Benefícios 2025 | Socio-Guide" />
        <meta property="og:description" content="Calcule seu benefício INSS, simule elegibilidade BPC LOAS e Auxílio Gás. Simuladores gratuitos atualizados com regras 2025." />
        <meta property="og:url" content="https://auxiliosbr.com.br/calculadoras" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simuladores Gratuitos Benefícios 2025 | Socio-Guide" />
        <meta name="twitter:description" content="Calcule seu benefício INSS, simule elegibilidade BPC LOAS e Auxílio Gás. Simuladores gratuitos atualizados com regras 2025." />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary via-secondary/90 to-primary py-16 px-4">
          <div className="container mx-auto max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simuladores Gratuitos Benefícios 2025
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Calcule seus benefícios sociais de forma rápida e gratuita com nossas ferramentas atualizadas
            </p>
          </div>
        </section>

        {/* Calculators Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl space-y-12">
            <CalculadoraINSS />
            <SimuladorBPC />
            <CalculadoraAuxilioGas />
          </div>
        </section>
      </main>
    </>
  );
};

export default Calculadoras;
