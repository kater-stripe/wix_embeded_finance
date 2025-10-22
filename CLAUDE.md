# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Wix Embedded Finance Dashboard demo built with Next.js 15, showcasing integration with Stripe's Embedded Components for Capital, Treasury (Financial Accounts), and Issuing (Cards). The application demonstrates a complete Banking-as-a-Service (BaaS) platform with multiple financial product offerings.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
next build

# Start production server
npm run start

# Run linter
npm run lint
```

Development server runs on `http://localhost:3000`

## Environment Configuration

This project requires **two separate Stripe accounts** with different configurations:

1. **Capital Account** - For Capital financing features
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Main publishable key
   - `STRIPE_SECRET_KEY` - Main secret key
   - `NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID` - Account for capital financing/reporting
   - `NEXT_PUBLIC_STRIPE_CAPITAL_ACCOUNT_ID` - Account for capital promotion/application

2. **Financial Account** - For Treasury and Issuing features
   - `NEXT_PUBLIC_STRIPE_FINANCIAL_PUBLISHABLE_KEY` - Financial account publishable key
   - `STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY` - Financial account secret key
   - `STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID` - Server-side financial account ID
   - `NEXT_PUBLIC_STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID` - Client-side financial account ID
   - `STRIPE_TREASURY_FINANCIAL_ACCOUNT_ID` - Specific Treasury financial account ID
   - `STRIPE_TREASURY_ORIGIN_PAYMENT_METHOD_ID` - Payment method for transfers
   - `STRIPE_ISSUING_CARD_ID` - Card ID for issuing operations

Copy `.env.example` to `.env` and fill in actual values before development.

## Architecture

### Multi-View Application Structure

The app uses client-side routing with 5 main views managed by state in `app/page.tsx`:

1. **Landing** (`/landing`) - Marketing page with "Get Started" CTA
2. **Checking** (`/`) - Main dashboard showing account overview and transactions
3. **Capital** (`/capital`) - Capital financing flow (promotion → application → financing)
4. **Financial Account** (`/financial-account`) - Treasury operations and account management
5. **Cards** (`/cards`) - Issuing card management and transactions

### Dual Stripe Account Architecture

**Critical distinction**: The app initializes **two separate Stripe Connect instances** because Capital and Financial products require different account configurations:

- **Main Account** (Capital): Uses `STRIPE_SECRET_KEY` for capital operations
- **Financial Account** (Treasury/Issuing): Uses `STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY` for banking operations

This is NOT just a development convenience - it reflects the actual Stripe product architecture where Capital and Treasury/Issuing may be on separate connected accounts.

### API Routes Pattern

All Stripe API routes follow this pattern in `/app/api/stripe/[endpoint]/route.ts`:

- **Session creation routes**: Generate Stripe Account Sessions with specific component configurations
  - `create-account-session` - Capital financing/reporting components
  - `create-capital-account-session` - Capital promotion/application components
  - `create-financial-account-session` - Treasury financial account components
  - `create-issuing-cards-session` - Issuing card components

- **Operation routes**: Execute specific Stripe operations
  - `financial-account` - Fetch financial account details
  - `inbound-transfer` - Create inbound transfers to financial account
  - `simulate-card-transaction` - Test card transactions in test mode
  - `verify-account` - Verify connected account status

### Stripe API Version

This project uses Stripe API version `2025-04-30.basil; embedded_connect_beta=v2;` for Capital features. The Financial Account features use the standard API version without version specification in the headers.

### Component Organization

Key component patterns:

- **Embedded components** (`embedded-*.tsx`): Wrap Stripe's `@stripe/react-connect-js` components with session management
  - Initialize `loadConnectAndInitialize` with proper publishable key
  - Fetch client secret from corresponding API route
  - Configure appearance theming
  - Wrap Stripe component in `ConnectComponentsProvider`

- **Content components** (`*-content.tsx`): Page-level layouts that orchestrate embedded components
  - Example: `financial-account-content.tsx` combines account info with embedded financial account component

- **UI components** (`components/ui/`): Radix UI + Tailwind components following shadcn/ui patterns

### State Management

No external state management library. State is managed via:
- React `useState` for local component state
- Props drilling for cross-component communication
- URL synchronization via `window.history.pushState()` for navigation state
- Stripe embedded components manage their own internal state

### Capital Flow Architecture

The Capital feature has a 3-step flow managed by `stripe-capital-promotion.tsx`:

1. **Promotion** - Display capital offers using `ConnectCapitalFinancingPromotion`
2. **Application** - Apply for capital using `ConnectCapitalFinancingApplication`
3. **Financing** - View financing details using `ConnectCapitalFinancing`

Note: Steps use DIFFERENT Connect instances:
- Promotion & Application use `capitalConnectInstance` (capital account)
- Financing uses `stripeConnectInstance` (main connected account)

The component also handles the "financing in progress" state which blocks new applications.

### Financial Account & Cards Architecture

These features demonstrate Stripe Treasury and Issuing integration:

- **Financial Account**: Shows account balance, allows money transfers, displays transaction history
- **Cards**: Lists issued cards, allows card creation, simulates test transactions
- Both use the SAME financial account credentials but different embedded component configurations

## Key Technical Details

### Path Aliasing
Uses `@/` alias for imports, defined in `tsconfig.json`:
```typescript
"paths": { "@/*": ["./*"] }
```

### Styling
- Tailwind CSS v4 with custom configuration
- Color scheme inspired by Wix branding (blues and clean design)
- Custom UI components from shadcn/ui in `components/ui/`

### Type Safety
- TypeScript strict mode enabled
- No explicit prop types for many components (relies on inference)
- Stripe types from `@stripe/stripe-js` and `@stripe/connect-js`

### Client-Side Rendering
All main pages and Stripe components use `'use client'` directive - this is a fully client-rendered application with API routes for backend operations.

## Common Development Patterns

### Adding a New Stripe Embedded Component

1. Create API route in `/app/api/stripe/[new-endpoint]/route.ts`
2. Use appropriate Stripe secret key (main or financial)
3. Configure account session with required components
4. Create wrapper component in `/components/embedded-[component-name].tsx`
5. Initialize Connect with `loadConnectAndInitialize`
6. Fetch client secret from your API route
7. Wrap Stripe component in `ConnectComponentsProvider`

### Adding a New View

1. Add view type to union in `app/page.tsx` (line 15)
2. Add URL path mapping in `getInitialView()` (lines 16-24)
3. Add URL update in `useEffect` (lines 53-62)
4. Create content component in `/components/[view-name]-content.tsx`
5. Add navigation handler function (line 28 pattern)
6. Add sidebar navigation item in `components/sidebar.tsx`
7. Add conditional render in main return (line 70 pattern)

### Testing Stripe Components in Test Mode

- Use test mode API keys (pk_test_* and sk_test_*)
- Simulate card transactions via the `simulate-card-transaction` API endpoint
- Capital financing will show test offers in test mode
- Treasury transfers can be simulated with test bank accounts

## Important Notes

- Never commit `.env` file with real credentials
- The app expects specific Stripe account configurations with Capital/Treasury/Issuing enabled
- All currency amounts are in cents (Stripe convention)
- Error handling is basic - production apps should add proper error boundaries and user feedback
- No authentication/authorization - this is a demo/prototype
- Session management is handled entirely by Stripe's embedded components
- The README mentions "Booking.com" styling but the current implementation is Wix-branded
