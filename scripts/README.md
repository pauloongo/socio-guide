# Gerador de Sitemap

Este script gera o arquivo `sitemap.xml` estático para o site.

## Como usar

### Localmente

1. Instale as dependências:
   ```bash
   cd scripts
   npm install
   ```

2. Certifique-se de que as variáveis de ambiente estão configuradas:
   ```bash
   export VITE_SUPABASE_URL="sua_url"
   export VITE_SUPABASE_PUBLISHABLE_KEY="sua_chave"
   ```

3. Execute o script:
   ```bash
   npm run generate
   ```

4. O sitemap será gerado em `public/sitemap.xml`

### Com Cron Job

Para executar automaticamente todos os dias às 3h da manhã:

```bash
# Edite o crontab
crontab -e

# Adicione esta linha
0 3 * * * cd /caminho/para/projeto/scripts && npm run generate
```

### Com GitHub Actions (Recomendado)

Crie `.github/workflows/generate-sitemap.yml`:

```yaml
name: Generate Sitemap

on:
  schedule:
    - cron: '0 3 * * *'  # Todos os dias às 3h
  workflow_dispatch:  # Permite execução manual

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd scripts
          npm install
      
      - name: Generate sitemap
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        run: |
          cd scripts
          npm run generate
      
      - name: Commit and push if changed
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add public/sitemap.xml
          git diff --quiet && git diff --staged --quiet || (git commit -m "Update sitemap.xml" && git push)
```

## Como funciona

O script:
1. Conecta ao banco de dados via Supabase
2. Busca todos os posts publicados
3. Gera XML com rotas estáticas + posts dinâmicos
4. Salva em `public/sitemap.xml`

## Rotas incluídas

- Homepage (/)
- Blog (/blog)
- Calculadoras (/calculadoras)
- Sobre (/sobre)
- Contato (/contato)
- Posts dinâmicos (/blog/:slug)
