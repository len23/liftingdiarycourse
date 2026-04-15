# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured yet.

## Stack

- **Next.js 16.2.3** (App Router) — this is a newer version with potential breaking changes; always read `node_modules/next/dist/docs/` before writing code
- **React 19** with Server Components by default
- **Tailwind CSS v4** — config-less, uses `@tailwindcss/postcss` plugin
- **Clerk v7** (`@clerk/nextjs`) for authentication
- **TypeScript**

## Architecture

- `app/` — App Router: `layout.tsx` is the root layout, `page.tsx` is the home route
- `middleware.ts` — Clerk's `clerkMiddleware()` runs on all routes except static assets
- Authentication state is available server-side via Clerk; `ClerkProvider` wraps the app in `layout.tsx`
- `<Show when="signed-in">` / `<Show when="signed-out">` are Clerk v7 components for conditional rendering based on auth state

## Key conventions

- All layouts/pages are Server Components by default; add `"use client"` only when you need interactivity, browser APIs, or React hooks
- Route params in Next.js 16 are `Promise<{ ... }>` — must be `await`ed: `const { id } = await params`
- Dynamic segments use folder names like `[id]` inside `app/`
