-- Create authors table first
CREATE TABLE IF NOT EXISTS public.authors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  bio text NOT NULL,
  photo_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view authors" ON public.authors;
DROP POLICY IF EXISTS "Authenticated users can manage authors" ON public.authors;

-- Create policies
CREATE POLICY "Anyone can view authors"
ON public.authors
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage authors"
ON public.authors
FOR ALL
USING (auth.role() = 'authenticated');

-- Seed initial authors (only if table is empty)
INSERT INTO public.authors (name, bio, photo_url)
SELECT 'João Silva', 'Especialista INSS Certificado com 10 anos de experiência em previdência social', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
WHERE NOT EXISTS (SELECT 1 FROM public.authors WHERE name = 'João Silva')
UNION ALL
SELECT 'Maria Oliveira', 'Advogada Previdenciária especializada em benefícios sociais e direitos trabalhistas', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
WHERE NOT EXISTS (SELECT 1 FROM public.authors WHERE name = 'Maria Oliveira')
UNION ALL
SELECT 'Pedro Santos', 'Consultor de Benefícios Sociais com certificação em políticas públicas', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
WHERE NOT EXISTS (SELECT 1 FROM public.authors WHERE name = 'Pedro Santos');