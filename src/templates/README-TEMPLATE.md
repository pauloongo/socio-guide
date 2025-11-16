# Template de Post para Blog - Benefícios Sociais

Este template HTML foi criado para posts sobre benefícios sociais, otimizado para SEO e E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

## Como Usar

1. **Acesse o Admin**: Vá para `/admin` no seu site
2. **Crie um Novo Post**: Clique em "Novo Post"
3. **Copie o Template**: Abra o arquivo `blog-post-template.html`
4. **Personalize**: Edite o conteúdo conforme o benefício que deseja abordar
5. **Configure os Metadados**:
   - **Título**: Use long-tail keywords (ex: "Tarifa Social de Água 2025: Como Solicitar")
   - **Slug**: versão-simplificada-do-titulo
   - **Excerpt**: Resumo com 150-160 caracteres
   - **Keywords**: Liste palavras-chave separadas por vírgula
   - **Categoria**: Escolha a categoria apropriada
   - **Autor**: Selecione o autor especialista

## Estrutura do Template

### 1. Header (`<article>` com Schema.org)
- Tag `<h1>` principal com `itemprop="headline"`
- Imagem ilustrativa com lazy loading
- Descrição/excerpt com `itemprop="description"`

### 2. Seções Principais
- **Quem tem direito**: Lista (`<ul>`) com critérios de elegibilidade
- **Documentos necessários**: Tabela HTML organizada
- **Como solicitar**: Lista ordenada (`<ol>`) com passo a passo
- **Como ver o desconto**: Explicação prática com tabelas
- **FAQ**: Usando `<details>` e `<summary>` para perguntas/respostas
- **Links úteis**: Links externos com `rel="nofollow noopener"`

### 3. Footer
- Nota sobre variações regionais e disclaimer

### 4. Schema JSON-LD
- Estrutura completa de Article schema
- Autor especialista definido
- Publisher com logo

## Tags HTML Permitidas (Sanitizadas)

O BlogPost usa DOMPurify e permite apenas estas tags seguras:

✅ Permitidas:
- `h1, h2, h3, h4, h5, h6`
- `p, ul, ol, li`
- `strong, em, small`
- `a` (com href seguro)
- `table, thead, tbody, tr, th, td`
- `details, summary`
- `img` (com src seguro)
- `section, article, header, footer`
- `script type="application/ld+json"` (apenas JSON-LD)

❌ Proibidas (serão removidas):
- `script` (exceto JSON-LD)
- `iframe`
- `embed, object`
- `form, input`
- Eventos inline (`onclick`, etc)

## Otimização SEO

### Keywords Long-Tail
Use keywords específicas como:
- "tarifa social de água 2025 como solicitar"
- "quem tem direito tarifa social água"
- "documentos necessários desconto conta água"

### Meta Tags (configurar no Admin)
- **Title**: 50-60 caracteres
- **Description**: 150-160 caracteres
- **Keywords**: 5-10 palavras-chave relevantes

### E-E-A-T (Expertise, Experience, Authoritativeness, Trust)
- Autor identificado como especialista
- Links para fontes oficiais (gov.br)
- Informações detalhadas e práticas
- Disclaimer sobre variações regionais
- Data de publicação e atualização

## Exemplo de Metadados no Admin

```
Título: Tarifa Social de Água e Esgoto 2025: Como Solicitar o Desconto na Conta

Slug: tarifa-social-agua-esgoto-2025-como-solicitar

Excerpt: Descubra como solicitar a Tarifa Social de Água e Esgoto 2025 e economize até 50% na sua conta. Veja quem tem direito, documentos necessários e o passo a passo completo.

Keywords: tarifa social água 2025, desconto conta água, como solicitar tarifa social, cadastro único água, benefício baixa renda água

Categoria: Benefícios Sociais

Autor: João Silva - Especialista INSS

Imagem: [Upload imagem relacionada ou use placeholder]

Published: ✅ Sim
```

## Personalização por Benefício

Este template pode ser adaptado para outros benefícios:
- **Tarifa Social de Energia**
- **Auxílio Gás**
- **BPC/LOAS**
- **Bolsa Família**
- **Benefício INSS**

Basta ajustar:
1. Título e descrições
2. Critérios de elegibilidade
3. Documentos necessários
4. Processo de solicitação
5. Links úteis
6. FAQ específico

## Checklist antes de Publicar

- [ ] Título otimizado com keyword principal
- [ ] Excerpt com 150-160 caracteres
- [ ] Keywords long-tail definidas
- [ ] Autor especialista selecionado
- [ ] Imagem com alt text descritivo
- [ ] Todos os links externos com rel="nofollow noopener"
- [ ] Tabelas com dados atualizados
- [ ] FAQ com pelo menos 4 perguntas
- [ ] Disclaimer no footer
- [ ] Schema JSON-LD configurado
- [ ] Conteúdo com 1500+ palavras
- [ ] Revisão de português

## Manutenção

- Revise e atualize o conteúdo a cada 6 meses
- Verifique se os links externos ainda estão funcionando
- Atualize datas e valores conforme mudanças na legislação
- Monitore comentários e dúvidas dos leitores para melhorar o FAQ
