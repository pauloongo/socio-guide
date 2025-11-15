import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

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
      {ads.map((ad) => {
        // Sanitize ad code to prevent XSS attacks
        const sanitizedCode = DOMPurify.sanitize(ad.ad_code, {
          ALLOWED_TAGS: ['div', 'span', 'img', 'a', 'iframe', 'script'],
          ALLOWED_ATTR: ['src', 'href', 'alt', 'class', 'id', 'style', 'width', 'height', 'frameborder', 'async'],
          ALLOW_DATA_ATTR: true
        });
        
        return (
          <div 
            key={ad.id} 
            dangerouslySetInnerHTML={{ __html: sanitizedCode }}
          />
        );
      })}
    </div>
  );
};

export default AdSlot;
