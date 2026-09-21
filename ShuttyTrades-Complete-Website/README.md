# ShuttyTrades Complete Website — Demo v2.0

A polished Next.js website + demo trading interface for the ShuttyTrades project.

## Included
- Marketing/landing website
- Branding and responsive mobile layout
- Demo registration/login flow
- Demo dashboard
- Markets page
- Demo BUY/SELL workflow
- Portfolio and trade history
- KYC/profile demo flow
- Wallet page with funding disabled
- Admin console
- Support + FAQ + learning centre
- Terms, Privacy and Risk Disclosure pages
- Browser-local demo data
- No payment gateway
- No M-Pesa/bank/card connection
- No live broker or liquidity connection
- No live forex execution
- Real-money trading intentionally inactive

## Requirements
- Node.js 18.18+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Production build
```bash
npm run build
npm start
```

## Deploy to Vercel
1. Create a GitHub repository.
2. Upload this project.
3. Import the repository into Vercel.
4. Vercel detects Next.js automatically.
5. Deploy.

This version intentionally does not require PostgreSQL to run the demo. Demo account/trade data is stored in the browser's localStorage.

## Demo notes
The login/register screens are intentionally simple demo authentication. They are NOT production authentication and must not be used to protect real money.

Before any real-money capability is considered, the project needs a production authentication system, database, KYC/AML program, secure client-money/payment architecture, broker/liquidity integration, security testing, audit controls, operational procedures, legal review and all required regulatory approvals.

For Kenya, CMA states that carrying on business as a dealing or non-dealing online foreign exchange broker requires the relevant licence. Check current CMA requirements before enabling any live service.

## Important
REAL MONEY IS OFF. Do not connect payments, client funds or live trading to this demo package.
