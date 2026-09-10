# BraveVest Marketplace

A multi-opportunity investment marketplace connecting investors, borrowers/project sponsors, and an internal admin/investment committee.

## Tech Stack

- **Frontend**: React 18 + Vite + JavaScript
- **Backend**: Node.js + NestJS
- **Database**: PostgreSQL + Prisma
- **Cache**: Redis
- **Queue**: BullMQ
- **Monorepo**: Turborepo

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8.15+
- Docker (for local database)

### Installation

```bash
# Install dependencies
pnpm install

# Start database and redis
docker-compose up -d

# Generate Prisma client
pnpm run db:generate

# Push schema to database
pnpm run db:push

# Start development servers
pnpm run dev
```

### Project Structure

```
bravevest/
├── apps/
│   ├── web/          # React + Vite SPA
│   └── api/          # NestJS API
├── packages/
│   ├── ui/           # Shared components
│   ├── db/           # Prisma schema + client
│   └── validation/   # Zod schemas
└── ...
```

## Features

- Multi-role authentication (Investor, Borrower, Admin)
- KYC/AML verification
- Opportunity marketplace with multiple product types
- Wallet funding and withdrawals
- Investment subscriptions
- Automated payouts
- Investment committee review workflow
- Credit assessment and loan management
- Audit logging
- Real-time notifications

## Environment Variables

See `.env.example` for required environment variables.

### Firebase Admin

Firebase Authentication is the shared identity provider for the web app and API. The web app uses Firebase Email/Password authentication, then synchronizes the profile through `POST /auth/firebase/sync`. Protected API routes verify the Firebase ID token and use the synchronized Prisma user.

Copy `apps/api/.env.example` to `apps/api/.env` and provide either the three Firebase service-account values (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`) or `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service-account JSON file. After adding `firebaseUid` to the database, run `pnpm run db:push`. Send Firebase client tokens as `Authorization: Bearer <id-token>` when calling the API directly.

### Vercel API deployment

The Vercel deployment includes `api/index.ts`, which adapts NestJS to Vercel's serverless request/response runtime. Configure these Vercel environment variables before deploying:

- `DATABASE_URL`: a reachable hosted PostgreSQL connection string; do not use `localhost`.
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`: Firebase Admin credentials.
- `FRONTEND_URL`: the deployed web URL.
- `JWT_SECRET` and `JWT_REFRESH_SECRET`: production secrets.

Run `pnpm run db:push` against the hosted database before the first request. A `FUNCTION_INVOCATION_FAILED` response usually means the function crashed during initialization, commonly because `DATABASE_URL` is unreachable or a required environment variable is missing.

## License

Proprietary