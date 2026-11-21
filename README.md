# Portal Notícias

Projeto acadêmico de portal de notícias feito com HTML, CSS, JavaScript e Supabase.

## Arquivos
- `index.html`: página inicial
- `style.css`: estilo e responsividade
- `app.js`: pesquisa, categorias e exibição de notícias
- `cadastro.html` e `auth.js`: cadastro
- `login.html` e `auth.js`: autenticação
- `admin.html` e `admin.js`: gerenciamento CRUD
- `database.sql`: tabela e políticas do banco
- `config.js`: configuração pública do Supabase

## Configuração do Supabase
1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute o conteúdo de `database.sql`.
3. Em Project Settings / API, copie Project URL e chave anon/public.
4. Coloque os valores em `config.js`. Nunca use chave service_role.
5. Nas configurações de Auth, configure Site URL e Redirect URLs para a URL do GitHub Pages.
6. Para facilitar o teste, no Supabase Authentication settings você pode desativar confirmação de e-mail; em produção é preferível mantê-la.
7. Faça cadastro no site, login e publique notícias. Cada usuário pode editar e excluir apenas as notícias próprias pelas políticas do banco.

## Teste local
Abra `index.html` pelo Live Server. Sem configuração do Supabase, a página inicial exibe notícias demonstrativas; cadastro e painel exigem configuração.

## GitHub Pages
1. Crie um repositório no GitHub e envie os arquivos.
2. No repositório: Settings > Pages.
3. Em Build and deployment, selecione Deploy from a branch.
4. Selecione `main` e `/ (root)`, salve.
5. Aguarde a publicação e use o endereço fornecido pelo GitHub Pages.

Este projeto é um exercício acadêmico. A chave anon/public é própria para uso no frontend; segurança dos dados é controlada por políticas RLS no Supabase. Nunca coloque credenciais secretas no código.
