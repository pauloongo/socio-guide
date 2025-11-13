-- Remover a foreign key incorreta que aponta para profiles
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

-- Atualizar posts com author_id NULL ou inválido para usar um autor padrão
UPDATE posts 
SET author_id = '7a0428a8-930b-4a5a-9c1c-36ae417bad6f'
WHERE author_id IS NULL 
   OR author_id NOT IN (SELECT id FROM authors);

-- Adicionar a foreign key correta apontando para authors
ALTER TABLE posts 
ADD CONSTRAINT posts_author_id_fkey 
FOREIGN KEY (author_id) 
REFERENCES authors(id) 
ON DELETE SET NULL;