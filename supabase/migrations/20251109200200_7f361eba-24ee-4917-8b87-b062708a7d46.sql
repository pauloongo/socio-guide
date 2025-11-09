-- Adiciona novos campos na tabela posts para SEO e categorização
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS excerpt TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'outros',
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Adiciona comentários para documentação
COMMENT ON COLUMN posts.excerpt IS 'Resumo curto do post (até 160 caracteres) para SEO';
COMMENT ON COLUMN posts.keywords IS 'Palavras-chave separadas por vírgula para SEO';
COMMENT ON COLUMN posts.category IS 'Categoria do post: bolsa-familia, inss, bpc, outros';
COMMENT ON COLUMN posts.image_url IS 'URL da imagem de capa do post';

-- Atualiza posts existentes com dados padrão
UPDATE posts 
SET 
  excerpt = SUBSTRING(REGEXP_REPLACE(content, '<[^>]*>', '', 'g'), 1, 160) || '...',
  keywords = CASE 
    WHEN title ILIKE '%bolsa%família%' THEN 'bolsa família 2025, calendário pagamento, benefício social'
    WHEN title ILIKE '%inss%' OR title ILIKE '%aposentadoria%' THEN 'inss 2025, aposentadoria, simulador previdência'
    WHEN title ILIKE '%bpc%' OR title ILIKE '%loas%' THEN 'bpc loas 2025, benefício assistencial, idoso deficiente'
    ELSE 'benefícios sociais 2025, governo federal'
  END,
  category = CASE 
    WHEN title ILIKE '%bolsa%família%' THEN 'bolsa-familia'
    WHEN title ILIKE '%inss%' OR title ILIKE '%aposentadoria%' THEN 'inss'
    WHEN title ILIKE '%bpc%' OR title ILIKE '%loas%' THEN 'bpc'
    ELSE 'outros'
  END
WHERE excerpt IS NULL;