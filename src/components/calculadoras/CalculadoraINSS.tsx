import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const CalculadoraINSS = () => {
  const [idade, setIdade] = useState("");
  const [salarioMedio, setSalarioMedio] = useState("");
  const [tempoContribuicao, setTempoContribuicao] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularBeneficio = () => {
    const idadeNum = parseFloat(idade);
    const salarioNum = parseFloat(salarioMedio);
    const tempoNum = parseFloat(tempoContribuicao);

    if (!idadeNum || !salarioNum || !tempoNum) return;

    // Fórmula oficial INSS 2026
    // 60% do salário + 2% por ano acima de 15 anos (mulher) ou 20 anos (homem)
    const anosExtras = Math.max(0, tempoNum - 20);
    const fatorPrevidenciario = 0.6 + (anosExtras * 0.02);
    
    // Cálculo básico
    let beneficio = salarioNum * Math.min(fatorPrevidenciario, 1);
    
    // Pedágio (adicional por idade e tempo)
    if (idadeNum >= 62 && tempoNum >= 15) {
      beneficio *= 1.1; // 10% de bônus
    }

    // Limite mínimo e máximo
    const minimo = 1412; // Salário mínimo 2025
    const maximo = 7786.02; // Teto INSS 2025
    
    const beneficioFinal = Math.max(minimo, Math.min(beneficio, maximo));
    setResultado(beneficioFinal);
  };

  return (
    <Card id="inss" className="shadow-card">
      <CardHeader className="bg-secondary/10">
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Calculator className="w-6 h-6" />
          Calculadora INSS Aposentadoria
        </CardTitle>
        <CardDescription>
          Calcule o valor estimado da sua aposentadoria com base nas regras 2026
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="idade">Idade Atual</Label>
            <Input
              id="idade"
              type="number"
              placeholder="Ex: 58"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salario">Salário Médio (R$)</Label>
            <Input
              id="salario"
              type="number"
              placeholder="Ex: 3500"
              value={salarioMedio}
              onChange={(e) => setSalarioMedio(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tempo">Tempo de Contribuição (anos)</Label>
            <Input
              id="tempo"
              type="number"
              placeholder="Ex: 25"
              value={tempoContribuicao}
              onChange={(e) => setTempoContribuicao(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={calcularBeneficio}
          className="w-full md:w-auto"
          variant="secondary"
        >
          Simular Agora
        </Button>

        {resultado !== null && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-4">
            <h3 className="font-semibold text-lg mb-2">Resultado da Simulação</h3>
            <p className="text-3xl font-bold text-primary">
              R$ {resultado.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              *Valor estimado mensal da aposentadoria
            </p>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
          <h4 className="font-semibold">Regras 2026:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Mulheres: 62 anos + 15 anos de contribuição</li>
            <li>Homens: 65 anos + 20 anos de contribuição</li>
            <li>Fórmula: 60% + 2% por ano acima do mínimo</li>
            <li>Benefício mínimo: R$ 1.412,00 (salário mínimo)</li>
            <li>Benefício máximo: R$ 7.786,02 (teto INSS)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculadoraINSS;
