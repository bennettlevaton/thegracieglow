# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # eslint
```

No test suite is configured.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **Tailwind CSS v4** (configured via `@tailwindcss/postcss` — no `tailwind.config.js`, uses CSS-based config in `globals.css`)
- **TypeScript**

## Architecture

This is a single-page VSL (Video Sales Letter) landing page. All routes live under `src/app/` using the Next.js App Router file convention:

- `layout.tsx` — root layout (fonts, metadata, global styles)
- `page.tsx` — home page / main landing content
- `globals.css` — global styles and Tailwind base imports

Path alias `@/*` maps to `src/*`.
