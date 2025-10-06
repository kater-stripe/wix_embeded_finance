# Stripe Capital Booking.com Demo

A complete integration demo showing Stripe Capital embedded components within a Booking.com partner dashboard interface.

## Features

### 🏨 Complete Capital Flow
- **Capital Promotion**: Targeted offers with business metrics
- **Capital Application**: Streamlined application with pre-filled property data  
- **Financing Offers**: Personalized terms and transparent pricing
- **Capital Reporting**: Transaction tracking and detailed report access

### 🎨 Authentic Booking.com Design
- Native header and navigation preservation
- Consistent color scheme (`#003580` to `#0071c2`)
- Booking.com typography and UI patterns
- Seamless integration that feels completely native

### 📊 Smart State Management
- Financing in progress detection
- Progressive step navigation with completion indicators
- Contextual messaging for different user states

### 🔗 Complete API Integration
- Account session creation for all capital components
- Account link generation for capital reporting
- Error handling and loading states

## Getting Started

### Prerequisites
- Node.js 18+
- Stripe test account with Capital enabled
- Environment variables configured

### Environment Setup

Copy `.env.example` to `.env` and fill in your Stripe credentials:

```bash
cp .env.example .env
```

Update the `.env` file with your actual Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key
STRIPE_SECRET_KEY=sk_test_your_actual_key
NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID=acct_your_main_account
NEXT_PUBLIC_STRIPE_CAPITAL_ACCOUNT_ID=acct_your_capital_account
```

### Installation

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` and click the "Finance" tab to explore the capital flow.

## Demo Flow

1. **Navigate to Finance** - Click the Finance tab in the navigation
2. **Explore Capital Steps**:
   - 💰 **Capital Promotion** - See targeted offers with metrics
   - 📋 **Application** - Experience streamlined application process  
   - 💼 **Financing** - Review personalized financing offers
   - 📊 **Reporting** - Access capital transaction reports

## Architecture

### Core Components
- `StripeCapitalPromotion`: Main component managing the 4-step flow
- Account session API route: Creates Stripe sessions for embedded components
- Account link API route: Generates secure links for capital reporting

### Stripe Integration
- Uses `@stripe/react-connect-js` for embedded components
- API version: `2025-04-30.basil; embedded_connect_beta=v2`
- Components enabled: `capital_financing`, `capital_financing_promotion`, `capital_financing_application`

### State Management
- Progressive step navigation
- Financing in progress detection
- Loading and error states

## Key Files

- `/components/stripe-capital-promotion.tsx` - Main capital component
- `/app/api/stripe/create-account-session/route.ts` - Account session creation
- `/app/api/stripe/create-account-link/route.ts` - Reporting link generation
- `/app/page.tsx` - Main dashboard with navigation

## Customization

### Financing in Progress
To test the financing in progress state, uncomment line 87 in `stripe-capital-promotion.tsx`:

```typescript
setHasFinancingInProgress(true)
```

### Styling
All colors and styling use Booking.com's design system. Key colors:
- Primary: `#003580`
- Secondary: `#0071c2`
- Background: `bg-gray-50`

## Built With

- **Next.js 15** - React framework
- **Stripe Connect** - Embedded capital components
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Geist Font** - Typography

---

🤖 Generated with [Claude Code](https://claude.ai/code)