# API Restaurante

## Bancos de Dados
- Desenvolvimento: MySQL
- Produção: PostgreSQL

## Deploy na Vercel

1. Crie uma conta na Vercel
2. Crie um banco PostgreSQL na Vercel
   - Dashboard > Storage > Create Database
   - Selecione PostgreSQL
   - Copie a URL de conexão
3. Instale a CLI da Vercel: `npm i -g vercel`
4. Faça login: `vercel login`
5. Configure as variáveis de ambiente na Vercel:
   - DATABASE_URL (URL do PostgreSQL)
6. Deploy: `vercel`

Para produção: `vercel --prod`

Veja mais detalhes em [docs/database.md](docs/database.md)
