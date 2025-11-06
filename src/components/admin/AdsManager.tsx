import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Ad {
  id: string;
  page_slug: string;
  position: "topo" | "meio" | "rodape";
  ad_code: string;
  active: boolean;
}

const AdsManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [formData, setFormData] = useState({
    page_slug: "",
    position: "topo" as "topo" | "meio" | "rodape",
    ad_code: "",
    active: true,
  });

  const queryClient = useQueryClient();

  const { data: ads, isLoading } = useQuery({
    queryKey: ["admin-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Ad[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newAd: typeof formData) => {
      const { error } = await supabase.from("ads").insert(newAd);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      toast.success("Anúncio criado!");
      resetForm();
    },
    onError: () => toast.error("Erro ao criar anúncio"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Ad>) => {
      const { error } = await supabase
        .from("ads")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      toast.success("Anúncio atualizado!");
      resetForm();
    },
    onError: () => toast.error("Erro ao atualizar anúncio"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      toast.success("Anúncio excluído!");
    },
    onError: () => toast.error("Erro ao excluir anúncio"),
  });

  const resetForm = () => {
    setFormData({ page_slug: "", position: "topo", ad_code: "", active: true });
    setEditingAd(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setFormData({
      page_slug: ad.page_slug,
      position: ad.position,
      ad_code: ad.ad_code,
      active: ad.active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAd) {
      updateMutation.mutate({ id: editingAd.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Anúncios</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Anúncio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAd ? "Editar Anúncio" : "Novo Anúncio"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page_slug">Página (slug)</Label>
                <Input
                  id="page_slug"
                  value={formData.page_slug}
                  onChange={(e) => setFormData({ ...formData, page_slug: e.target.value })}
                  placeholder="/blog/bolsa-familia-2025"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use o caminho completo da página, ex: /blog/bolsa-familia-2025
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Posição</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value: "topo" | "meio" | "rodape") => 
                    setFormData({ ...formData, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="topo">Topo</SelectItem>
                    <SelectItem value="meio">Meio</SelectItem>
                    <SelectItem value="rodape">Rodapé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ad_code">Código do Anúncio (HTML/JS)</Label>
                <Textarea
                  id="ad_code"
                  value={formData.ad_code}
                  onChange={(e) => setFormData({ ...formData, ad_code: e.target.value })}
                  rows={10}
                  className="font-mono text-sm"
                  placeholder="<script>...</script> ou <div>...</div>"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="active">Ativo</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingAd ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : (
        <div className="grid gap-4">
          {ads?.map((ad) => (
            <Card key={ad.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {ad.page_slug} - {ad.position}
                    {ad.active ? (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Ativo
                      </span>
                    ) : (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Inativo
                      </span>
                    )}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(ad)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm("Tem certeza que deseja excluir este anúncio?")) {
                        deleteMutation.mutate(ad.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                  {ad.ad_code.substring(0, 200)}...
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsManager;
