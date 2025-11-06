import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import PostsManager from "@/components/admin/PostsManager";
import AdsManager from "@/components/admin/AdsManager";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }
      
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
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
