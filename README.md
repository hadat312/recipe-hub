# Recipe Hub — Frontend

Recipe Hub is a website for viewing, saving, and sharing Vietnamese recipes, sorted into 4 skill levels (beginner → professional). This is the **frontend** repo, built from a design prototype made in Claude Design (`Recipe Hub Prototype.dc.html`).

The backend (NestJS + PostgreSQL + Prisma) lives in a separate repo.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- React Context for client-side state (theme, demo login, favorites, toast)
- `next/font/google` for Inter + Lora (self-hosted, supports Vietnamese)

## Run locally

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo account: `an@bepnha.vn` / `1234`.

## Structure

```
src/
  app/            # Routes (App Router) — each folder is one URL
  components/     # Shared UI (Header, RecipeCard, ...)
  data/           # Sample recipe data (mock, not connected to an API yet)
  state/          # AppStateProvider — app-wide state (React Context)
  hooks/          # Custom hooks (useViewportWidth)
  utils/          # Formatting helpers (time, servings, ...)
```

## Scripts

- `yarn dev` — dev server
- `yarn build` — production build
- `yarn lint` — ESLint

## Note

Recipe data is currently static mock data in `src/data/recipes.ts`. Once the backend is ready, pages will be connected to call the API instead of reading this file directly.
