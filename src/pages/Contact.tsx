import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - futura integração com edge function ou serviço de email
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contato | Socio-Guide - Tire suas Dúvidas</title>
        <meta name="description" content="Entre em contato com nossa equipe de especialistas em benefícios sociais. Tire suas dúvidas sobre Bolsa Família, INSS e BPC LOAS." />
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
              Entre em Contato
            </h1>
            <p className="text-primary-foreground/80 mt-2">
              Tire suas dúvidas ou envie sugestões para nossa equipe
            </p>
          </div>
        </header>

        <main className="container mx-auto max-w-2xl py-12 px-4">
          <Card>
            <CardHeader>
              <CardTitle>Envie sua Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e responderemos o mais breve possível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem, dúvida ou sugestão..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Informações Importantes</h2>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Não somos um órgão governamental oficial</li>
              <li>• Para solicitar benefícios, acesse os canais oficiais: gov.br ou INSS</li>
              <li>• Respondemos dúvidas sobre informações publicadas no site</li>
              <li>• Tempo de resposta: até 48 horas úteis</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;
