# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Aksara Jawa — Belajar dari Nol (`artifacts/aksara-jawa`)

A React + Vite app for learning Javanese script (Aksara Jawa / Hanacaraka). 

**Features:**
- Animated preloader: cycles through aksara characters with opacity/scale transitions + loading bar
- 8 pages: Home, Materi, Flashcard, Game, Kuis, Tulis Nama, Tentang, Credit
- No routing — all pages mounted in divs, hidden with `display: none`
- Navbar: auto-hides on scroll down, auto-shows on scroll up and page change
- Materi: 7 tabs (Nglegena/Pasangan/Sandhangan/Murda/Swara/Rekan/Wilangan), responsive sandhangan (accordion on mobile, table on desktop)
- Flashcard: 3D CSS flip animation, 7 categories, shuffle, progress bar
- Game: 3 modes (Tebak Aksara, Tebak dari Latin, Memory Match)
- Kuis: 6 categories with timer per question
- Tulis Nama: converts Indonesian name to Javanese aksara, copy/download/share
- Credit: Muhammad David Aryanto — SMA student / web developer

**Fonts:** Noto Sans Javanese, Cinzel Decorative, Lora, DM Sans (all from Google Fonts CDN)
**Icons:** Font Awesome 6.5.1 (CDN)
**Design tokens:** soga `#5C2008`, gold `#C8921E`, cream `#FBF4E3`, card `#FFFCF2`
**Toast:** DOM-based via `#aj-toast` div with `.show` class

**Key files:**
- `src/App.tsx` — page switcher, toast div
- `src/index.css` — global reset + toast + scrollbar styles
- `src/data/aksara.ts` — all aksara data, helpers (toJw, shuf, msgs)
- `src/components/Preloader.tsx` — animated preloader
- `src/components/Navbar.tsx` — responsive nav with auto-hide
- `src/pages/` — 8 page components
