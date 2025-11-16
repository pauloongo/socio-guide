import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserCheck, AlertCircle, CheckCircle2 } from "lucide-react";

const SimuladorBPC = () => {
  const [rendaFamiliar, setRendaFamiliar] = useState("");
  const [numeroMembros, setNumeroMembros] = useState("");
  const [possuiDeficiencia, setPossuiDeficiencia] = useState(false);
  const [resultado, setResultado] = useState<{ elegivel: boolean; motivo: string } | null>(null);

  const simularElegibilidade = () => {
    const rendaNum = parseFloat(rendaFamiliar);
    const membrosNum = parseInt(numeroMembros);

    if (!rendaNum || !membrosNum) return;

    const rendaPerCapita = rendaNum / membrosNum;
    const limiteRenda = 353; // 1/4 do salário mínimo 2025 (1412/4)

    const elegivel = rendaPerCapita <= limiteRenda && possuiDeficiencia;
    
    let motivo = "";
    if (elegivel) {
      motivo = `Você é elegível ao BPC LOAS! Renda per capita de R$ ${rendaPerCapita.toFixed(2)} está dentro do limite de R$ 353,00.`;
    } else if (!possuiDeficiencia) {
      motivo = "É necessário comprovar deficiência ou ter 65+ anos para o BPC LOAS.";
    } else {
      motivo = `Renda per capita de R$ ${rendaPerCapita.toFixed(2)} excede o limite de R$ 353,00 (1/4 do salário mínimo).`;
    }

    setResultado({ elegivel, motivo });
  };

  return (
    <Card id="bpc" className="shadow-card">
      <CardHeader className="bg-secondary/10">
        <CardTitle className="flex items-center gap-2 text-secondary">
          <UserCheck className="w-6 h-6" />
          Simulador BPC LOAS
        </CardTitle>
        <CardDescription>
          Verifique se você tem direito ao Benefício de Prestação Continuada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="renda">Renda Familiar Total (R$)</Label>
            <Input
              id="renda"
              type="number"
              placeholder="Ex: 1200"
              value={rendaFamiliar}
              onChange={(e) => setRendaFamiliar(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="membros">Número de Membros na Família</Label>
            <Input
              id="membros"
              type="number"
              placeholder="Ex: 4"
              value={numeroMembros}
              onChange={(e) => setNumeroMembros(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="deficiencia"
            checked={possuiDeficiencia}
            onCheckedChange={(checked) => setPossuiDeficiencia(checked as boolean)}
          />
          <Label htmlFor="deficiencia" className="cursor-pointer">
            Possuo deficiência ou tenho 65 anos ou mais
          </Label>
        </div>

        <Button 
          onClick={simularElegibilidade}
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
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {resultado.elegivel ? "Elegível!" : "Não Elegível"}
                </h3>
                <p className="text-sm">{resultado.motivo}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
          <h4 className="font-semibold">Perguntas Frequentes:</h4>
          <details className="cursor-pointer">
            <summary className="font-medium">Quem tem direito ao BPC LOAS?</summary>
            <p className="mt-2 text-muted-foreground">
              Pessoas com deficiência ou idosos acima de 65 anos com renda familiar per capita inferior a 1/4 do salário mínimo (R$ 353,00 em 2025).
            </p>
          </details>
          <details className="cursor-pointer">
            <summary className="font-medium">Qual o valor do benefício?</summary>
            <p className="mt-2 text-muted-foreground">
              O valor é de 1 salário mínimo (R$ 1.412,00 em 2025), pago mensalmente.
            </p>
          </details>
          <details className="cursor-pointer">
            <summary className="font-medium">Como comprovar a deficiência?</summary>
            <p className="mt-2 text-muted-foreground">
              É necessária avaliação médica e social realizada pelo INSS para comprovar impedimento de longo prazo (mínimo 2 anos).
            </p>
          </details>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimuladorBPC;
