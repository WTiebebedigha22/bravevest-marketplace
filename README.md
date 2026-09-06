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

## License

Proprietary