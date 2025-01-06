# Configuração do Banco de Dados

## Desenvolvimento (MySQL)
1. Configure a variável DATABASE_URL no .env para MySQL
2. Execute: `bun run migrate:dev`

## Produção (PostgreSQL)
1. Crie um banco PostgreSQL (recomendado: Vercel Postgres)
2. Configure a variável DATABASE_URL na Vercel
3. O deploy executará as migrações automaticamente

### Comandos Úteis
- Criar nova migração: `bun run migrate:dev`
- Aplicar migrações: `bun run migrate:prod`
- Sincronizar schema: `bun run db:push` 