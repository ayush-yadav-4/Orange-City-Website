# Orange-City-Website

Orange City Batteries — Nagpur marketplace for car, bike, inverter & lithium batteries.

## Stack

- Next.js 14 (App Router)
- TypeScript, Tailwind CSS v4
- Prisma + PostgreSQL (Supabase)
- Zustand

## Setup

```bash
npm install
cp .env.example .env
# Add DATABASE_URL, DIRECT_URL, and other env vars
npm run db:setup
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:setup` | Generate Prisma client, push schema, seed |

## Admin

- URL: `/admin-panel/owner`
- Set `ADMIN_PASSWORD` in `.env`
