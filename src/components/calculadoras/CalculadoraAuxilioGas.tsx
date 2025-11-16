import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Flame, CheckCircle2, XCircle } from "lucide-react";

const CalculadoraAuxilioGas = () => {
  const [rendaFamiliar, setRendaFamiliar] = useState("");
  const [nis, setNis] = useState("");
  const [resultado, setResultado] = useState<{ elegivel: boolean; valor: number; motivo: string } | null>(null);

  const calcularElegibilidade = () => {
    const rendaNum = parseFloat(rendaFamiliar);
    const nisValido = nis.length === 11; // NIS tem 11 dígitos

    if (!rendaNum || !nisValido) {
      setResultado({
        elegivel: false,
        valor: 0,
        motivo: "Por favor, preencha todos os campos corretamente. O NIS deve ter 11 dígitos."
      });
      return;
    }

    // Critério: família inscrita no Bolsa Família com renda per capita ≤ meio salário mínimo
    const limiteRenda = 706; // Meio salário mínimo 2025
    const elegivel = rendaNum <= limiteRenda;
    const valor = elegivel ? 102 : 0; // Valor do Auxílio Gás 2025

    const motivo = elegivel
      ? `Você é elegível! Receberá R$ 102,00 a cada 2 meses. Renda familiar (R$ ${rendaNum.toFixed(2)}) está dentro do limite.`
      : `Renda familiar (R$ ${rendaNum.toFixed(2)}) excede o limite de R$ 706,00 (meio salário mínimo).`;

    setResultado({ elegivel, valor, motivo });
  };

  return (
    <Card id="auxilio-gas" className="shadow-card">
      <CardHeader className="bg-secondary/10">
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Flame className="w-6 h-6" />
          Calculadora Auxílio Gás
        </CardTitle>
        <CardDescription>
          Descubra se você tem direito ao Vale Gás 2025
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="renda-gas">Renda Familiar Per Capita (R$)</Label>
            <Input
              id="renda-gas"
              type="number"
              placeholder="Ex: 500"
              value={rendaFamiliar}
              onChange={(e) => setRendaFamiliar(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Renda total dividida pelo número de pessoas
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nis">Número do NIS</Label>
            <Input
              id="nis"
              type="text"
              placeholder="Ex: 12345678901"
              maxLength={11}
              value={nis}
              onChange={(e) => setNis(e.target.value.replace(/\D/g, ''))}
            />
            <p className="text-xs text-muted-foreground">
              11 dígitos do Cadastro Único
            </p>
          </div>
        </div>

        <Button 
          onClick={calcularElegibilidade}
          className="w-full md:w-auto"
          variant="secondary"
        >
          Simular Agora
        </Button>

        {resultado && (
          <div className={`border rounded-lg p-6 mt-4 ${
            resultado.elegivel 
              ? 'bg-primary/10 border-primary/20' 
              : 'bg-destructive/10 border-destructive/20'
          }`}>
            <div className="flex items-start gap-3">
              {resultado.elegivel ? (
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {resultado.elegivel ? `Valor: R$ ${resultado.valor.toFixed(2)}` : "Não Elegível"}
                </h3>
                <p className="text-sm">{resultado.motivo}</p>
                {resultado.elegivel && (
                  <p className="text-xs text-muted-foreground mt-2">
                    *Pagamento bimestral automático para beneficiários do Bolsa Família
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
          <h4 className="font-semibold">Requisitos:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Família inscrita no Cadastro Único (CadÚnico)</li>
            <li>Beneficiária do Programa Bolsa Família</li>
            <li>Renda per capita ≤ meio salário mínimo (R$ 706,00)</li>
            <li>Pagamento a cada 2 meses</li>
            <li>Valor: R$ 102,00 por pagamento (2025)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculadoraAuxilioGas;
