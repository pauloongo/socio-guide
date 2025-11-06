import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  pageSlug: string;
  position: "topo" | "meio" | "rodape";
  className?: string;
}

const AdSlot = ({ pageSlug, position, className }: AdSlotProps) => {
  const { data: ads } = useQuery({
    queryKey: ["ads", pageSlug, position],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("page_slug", pageSlug)
        .eq("position", position)
        .eq("active", true);
      
      if (error) throw error;
      return data;
    },
  });

  if (!ads || ads.length === 0) return null;

  return (
    <div className={cn("ad-slot", className)}>
      {ads.map((ad) => (
        <div 
          key={ad.id} 
          dangerouslySetInnerHTML={{ __html: ad.ad_code }}
        />
      ))}
    </div>
  );
};

export default AdSlot;
