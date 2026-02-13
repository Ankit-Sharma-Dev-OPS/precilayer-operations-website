# PRECILAYER - Master Production & Quality Flow

## Overview

This is an interactive infographic and training module application for PRECILAYER's master production and quality control flow. It visualizes an 11-phase production workflow for high-mix rapid prototyping and production, covering everything from order release through delivery. The application presents this complex manufacturing process as an interactive, expandable infographic with animations and detailed step-by-step breakdowns.

The app is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data storage. Currently, the application is primarily frontend-focused — the main content is rendered client-side as a rich interactive infographic page. The backend has minimal routes and uses in-memory storage by default, with database schema and Drizzle ORM configured for future expansion.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management / Data Fetching**: TanStack React Query
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives, styled with Tailwind CSS
- **Animations**: Framer Motion for interactive transitions in the infographic
- **CSS**: Tailwind CSS with CSS custom properties for theming (light/dark mode support)
- **File Uploads**: Uppy with AWS S3 presigned URL flow (via Replit Object Storage integration)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express.js running on Node.js with TypeScript (via tsx)
- **HTTP Server**: Node's built-in `http.createServer` wrapping Express
- **Database**: PostgreSQL via `pg` (node-postgres) Pool, with Drizzle ORM for schema and queries
- **Schema**: Defined in `shared/schema.ts` using Drizzle's `pgTable`, shared between client and server
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Storage Layer**: Abstracted behind an `IStorage` interface in `server/storage.ts`. Currently uses `MemStorage` (in-memory Map), but designed to be swapped for a database-backed implementation
- **Object Storage**: Replit Object Storage integration via Google Cloud Storage client, with presigned URL upload flow

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production Build**: Vite builds the client to `dist/public/`, esbuild bundles the server to `dist/index.cjs`
- **Database Migrations**: Drizzle Kit with `db:push` command for schema synchronization

### Project Structure
```
client/           → React frontend
  src/
    components/   → UI components (shadcn/ui in components/ui/)
    hooks/        → Custom React hooks
    lib/          → Utilities (queryClient, cn helper)
    pages/        → Route pages (infographic.tsx is the main page)
server/           → Express backend
  replit_integrations/  → Replit platform integrations (object storage)
shared/           → Shared code between client and server (schema.ts)
migrations/       → Drizzle database migrations output
attached_assets/  → Reference documents (production flow spec)
```

### Key Design Decisions

1. **Shared Schema**: Database schema lives in `shared/schema.ts` so both frontend and backend can use the same types. Zod validation schemas are derived from Drizzle table definitions.

2. **Storage Interface Pattern**: The `IStorage` interface decouples business logic from data persistence. The current `MemStorage` implementation should be replaced with a `DatabaseStorage` class that uses the Drizzle `db` instance when database features are needed.

3. **API Convention**: All API routes should be prefixed with `/api`. The frontend uses `apiRequest()` helper for mutations and React Query's `getQueryFn` for data fetching, both with `credentials: "include"`.

4. **Static Content Focus**: The main page (`infographic.tsx`) is a self-contained interactive visualization. Production flow data is hardcoded in the component as a `phases` array rather than fetched from the database.

## External Dependencies

- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable. Used with Drizzle ORM (`drizzle-orm/node-postgres`) and managed with Drizzle Kit for schema pushes.
- **Replit Object Storage**: File storage via Google Cloud Storage client library (`@google-cloud/storage`), authenticating through Replit's sidecar service at `http://127.0.0.1:1106`. Provides presigned URL upload flow for client-side direct uploads.
- **Replit Vite Plugins**: Development-only plugins for error overlay (`@replit/vite-plugin-runtime-error-modal`), cartographer, and dev banner.