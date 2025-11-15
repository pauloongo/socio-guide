import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ShieldAlert } from "lucide-react";
import PostsManager from "@/components/admin/PostsManager";
import AdsManager from "@/components/admin/AdsManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !roles) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        checkAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Logout realizado!");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  // Show access denied if user is not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="h-6 w-6" />
              <CardTitle>Acesso Negado</CardTitle>
            </div>
            <CardDescription>
              Você não tem permissão para acessar o painel administrativo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Apenas usuários com função de administrador podem acessar esta área.
              Se você acredita que deveria ter acesso, entre em contato com o administrador do sistema.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                Voltar ao Início
              </Button>
              <Button onClick={handleSignOut} variant="default" className="flex-1">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero py-6 px-4">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Painel Admin
          </h1>
          <Button variant="outline" onClick={handleSignOut} className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl py-8 px-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="ads">Anúncios</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <PostsManager />
          </TabsContent>

          <TabsContent value="ads" className="mt-6">
            <AdsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
