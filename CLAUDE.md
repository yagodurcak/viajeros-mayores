# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Viajeros Mayores** is a Next.js travel companion app for older adults (60+), featuring AI-powered destination search, blog/news with community features, Google Maps integration, and a Supabase backend.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier format all files
npm run type-check   # TypeScript validation (tsc --noEmit)
```

Git hooks (Husky) run lint-staged on pre-commit and full type-check + lint on pre-push.

## Architecture

**Framework**: Next.js 16 App Router with React 18, TypeScript (strict), Tailwind CSS.

**Backend**: Supabase (PostgreSQL + Auth). Two clients:
- Server components: `createServerClient()` from `lib/supabase/server.ts`
- Client components: `createBrowserClient()` from `lib/supabase/client.ts`

**Route Groups**:
- `app/(autentication)/` — login, signup, forgot/reset password
- `app/(home)/` — home page
- `app/blog/`, `app/news/` — content sections with `[slug]` dynamic routes and `/create` pages
- `app/api/` — API routes: `auth/callback`, `search` (AI), `events`, `lead-subscribe`, `guide-download`, `get-elevation`

**Key Libraries**:
- Vercel AI SDK (`@ai-sdk/openai`, `ai`) — `/api/search` uses OpenAI GPT-4o-mini for accessibility-focused destination search
- `@react-google-maps/api` — maps page
- `resend` — email for lead capture
- `zod` — runtime validation

**Path Aliases** (tsconfig): `@/*` maps to repo root, so `@/lib/`, `@/components/`, `@/types/`, `@/app/` all resolve from root.

## Key Files

| File | Purpose |
|------|---------|
| `lib/server-data.ts` | All Supabase data fetching (posts, news, profiles) |
| `lib/seo-config.ts` | `generateSEOMetadata()` helper used by every page |
| `lib/utils.ts` | Shared utilities: date formatting, text truncation, Cloudinary image optimization |
| `lib/booking-api.ts` | Booking.com (RapidAPI) integration |
| `types/database.ts` | Supabase table types: `posts`, `post_comments`, `news_articles`, `news_articles_comments`, `profiles` |

## Data Fetching Pattern

Pages use server-side data fetching via `lib/server-data.ts`. Page components are async Server Components; interactive parts use `"use client"` with separate Client Component files (e.g., `HomeClient.tsx` alongside `page.tsx`).

## SEO Pattern

Every page exports metadata using `generateSEOMetadata()` from `lib/seo-config.ts`. The root layout includes JSON-LD structured data. `app/sitemap.ts` and `app/robots.ts` generate dynamic SEO files.

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
OPENAI_API_KEY
RESEND_API_KEY
RESEND_WEBHOOK_SECRET
EMAIL_FROM
```

Optional: `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `NEXT_PUBLIC_RAPIDAPI_KEY`.

## ESLint Rules to Note

- `console.log` is disallowed; use `console.warn` or `console.error`
- `var` is disallowed; use `const`/`let`
- Unused variables with `_` prefix are allowed
