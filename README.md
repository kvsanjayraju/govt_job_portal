# CareerNebula Platform

## Project Overview
CareerNebula is a modern, enterprise-grade government job platform designed to provide clarity and tracking for aspirants. It uses a monorepo structure with a Next.js frontend and Node.js/Express backend.

## Tech Stack
- **Frontend:** Next.js (App Router), TailwindCSS, Framer Motion.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM.
- **Database:** PostgreSQL (Production), SQLite (Local Dev).
- **Infra:** Docker, GitHub Actions.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (optional, for full stack run)

### Running Locally (with Docker)
1. Ensure Docker is running.
2. Run `docker-compose up --build`.
3. Access Frontend at `http://localhost:3000`.
4. Access Backend at `http://localhost:3001`.

### Running Locally (Manual)

**Backend:**
1. `cd backend`
2. `npm install`
3. `cp .env.example .env` (ensure `DATABASE_URL` is set, e.g., `file:./dev.db`)
4. `npx prisma migrate dev`
5. `npm run dev`

**Frontend:**
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Extension Guide
- **Adding new Job fields:** Update `backend/prisma/schema.prisma`, run migration, update `backend/src/modules/jobs`, and update Frontend types.
- **Auth:** Currently, a basic password check is implemented in `AdminPage`. Integrate Auth0 or NextAuth for robust authentication.
- **Database:** Switch provider in `schema.prisma` to `postgresql` for production.

## License
MIT
