# Wix Embedded Finance Dashboard

A complete embedded finance platform showcasing Stripe's Banking-as-a-Service capabilities through an integrated business dashboard interface. This demo features Treasury financial accounts, Issuing cards, and Capital financing - all embedded seamlessly into a Wix-style business management platform.

## 🌟 Features

### 💰 Financial Account Management (Treasury)
- **Real-time balance tracking** with embedded financial account component
- **Add Money functionality** via slide-out panel using Stripe inbound transfers
- **Transaction history** with detailed financial account transactions
- **Account information** display with routing and account numbers
- **Instant fund availability** for spending and transfers

### 💳 Card Management (Issuing)
- **Embedded cards list** with full cardholder management
- **Card transaction simulation** via slide-out panel
- **Test card authorizations** and captures using Stripe test helpers
- **Automatic transaction tracking** with redirect to financial account
- **Spend controls** and card lifecycle management

### 📊 Capital Financing
- **Capital promotion** with targeted financing offers
- **Streamlined application** process with pre-filled data
- **Personalized financing** offers with transparent terms
- **Capital reporting** and transaction tracking

### 🎨 Professional UI/UX
- **Consistent breadcrumb navigation** across all pages
- **Slide-out panels** for secondary actions (Add Money, Simulate Transaction)
- **Wix blue color scheme** (`#0070F3`) for primary actions
- **Responsive design** that works on all screen sizes
- **Toast notifications** for user feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Stripe test account with Treasury, Issuing, and Capital enabled
- Environment variables configured

### Environment Setup

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update the `.env` file with your Stripe credentials:

```env
# Main Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Financial Account Stripe Keys
STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_FINANCIAL_PUBLISHABLE_KEY=pk_test_...

# Connected Account IDs
STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID=acct_...
NEXT_PUBLIC_STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID=acct_...
NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID=acct_...

# Capital Account ID
NEXT_PUBLIC_STRIPE_CAPITAL_ACCOUNT_ID=acct_...

# Treasury/Financial Account IDs
STRIPE_TREASURY_FINANCIAL_ACCOUNT_ID=fa_...
STRIPE_TREASURY_ORIGIN_PAYMENT_METHOD_ID=pm_...

# Issuing Card ID
STRIPE_ISSUING_CARD_ID=ic_...
```

### Installation

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` to explore the dashboard.

## 📱 Application Pages

### `/` - Business Checking Dashboard
Main landing page with overview of the business checking account and quick navigation to all financial features.

### `/financial-account` - Treasury Financial Account
- View account information with routing and account numbers
- Check available balance in real-time
- Add money via inbound transfers
- View complete transaction history
- Manage financial addresses

### `/cards` - Issuing Card Management
- Create and manage issuing cards
- View cardholder information
- Simulate card transactions for testing
- Set spending controls
- Track card lifecycle

### `/capital` - Capital Financing
- View personalized financing offers
- Apply for capital with streamlined process
- Review financing terms and repayment options
- Access capital reporting and transaction history

## 🔧 API Routes

### Treasury APIs
- `POST /api/stripe/inbound-transfer` - Create inbound transfers to add money
- `GET /api/stripe/financial-account` - Fetch financial account details
- `GET /api/stripe/financial-account-transactions` - Get transaction history
- `POST /api/stripe/create-financial-account-session` - Create account session for embedded components

### Issuing APIs
- `POST /api/stripe/simulate-card-transaction` - Simulate card authorization and capture
- `POST /api/stripe/create-issuing-cards-session` - Create session for embedded cards list
- `GET /api/stripe/transaction-receipt` - Get transaction receipt details

### Capital APIs
- `POST /api/stripe/create-capital-account-session` - Create session for capital components
- `POST /api/stripe/create-account-session` - Create general account session
- `POST /api/stripe/create-account-link` - Generate capital reporting links

### Utility APIs
- `GET /api/stripe/verify-account` - Verify connected account status

## 🏗️ Architecture

### Core Components

#### Financial Account
- `FinancialAccountContent` - Main page controller with data fetching
- `FinancialAccountInfo` - Account information display with Add Money button
- `FinancialAccountTransactions` - Embedded transaction list
- `AddMoneyPanel` - Slide-out panel for adding funds via inbound transfers
- `EmbeddedFinancialAccount` - Stripe embedded financial account component

#### Cards
- `CardsContent` - Main cards page with header and actions
- `EmbeddedIssuingCardsList` - Stripe embedded cards list component
- `SimulateCardTransactionPanel` - Slide-out panel for testing transactions

#### Capital
- `CapitalContent` - Capital page wrapper
- `StripeCapitalPromotion` - Multi-step capital flow component

### Stripe Integration

**SDK Used:**
- `@stripe/react-connect-js` - Embedded components
- `@stripe/connect-js` - Connect initialization
- `stripe` (Node.js SDK) - Server-side operations

**API Version:** 
- Connect: `2024-12-18.acacia`
- Embedded Components: Latest stable

**Components Enabled:**
- `financial_account` - Treasury account management
- `financial_account_transactions` - Transaction list
- `issuing_card_list` - Card management
- `capital_financing_promotion` - Capital offers
- `capital_financing_application` - Capital application

## 🎯 Key Workflows

### Add Money to Financial Account
1. User clicks "Add Money" button on financial account page
2. Slide-out panel opens with amount input form
3. Amount is validated (must be > $0)
4. Backend creates Stripe inbound transfer via Treasury API
5. Success notification appears
6. Panel closes and financial account refreshes with new balance

### Simulate Card Transaction
1. User clicks "Simulate Transaction" button on cards page
2. Slide-out panel opens with amount input form
3. User enters transaction amount
4. Backend creates authorization using Stripe test helpers
5. Authorization is immediately captured
6. Success notification appears
7. User is redirected to financial account page to view the transaction

## 🎨 Design System

### Colors
- **Primary Blue**: `#0070F3` (Wix brand blue)
- **Text Primary**: `text-gray-900`
- **Text Secondary**: `text-gray-600`
- **Borders**: `border-border`

### Typography
- **Page Titles**: `text-2xl font-bold text-gray-900`
- **Breadcrumbs**: `text-sm text-gray-600`
- **Body Text**: Default system font

### Components
- **Slide-out Panels**: Sheet component from Radix UI
- **Cards**: Custom card component with rounded borders
- **Buttons**: Blue filled for primary actions, link style for secondary
- **Forms**: Large inputs with clear labels and validation

## 📂 Project Structure

```
wix_c4p/
├── app/
│   ├── api/stripe/          # All Stripe API routes
│   │   ├── inbound-transfer/
│   │   ├── simulate-card-transaction/
│   │   ├── financial-account/
│   │   └── ...
│   ├── capital/             # Capital financing page
│   ├── cards/               # Card management page
│   ├── financial-account/   # Financial account page
│   └── page.tsx            # Main dashboard
├── components/
│   ├── add-money-panel.tsx
│   ├── simulate-card-transaction-panel.tsx
│   ├── financial-account-content.tsx
│   ├── cards-content.tsx
│   ├── capital-content.tsx
│   └── ui/                 # Reusable UI components
└── ...
```

## 🧪 Testing

### Test Card Transactions
Use the "Simulate Transaction" button on the cards page to create test authorizations. The simulation:
- Creates an authorization for the specified amount
- Immediately captures the authorization
- Records the transaction in your financial account
- Uses Stripe test helpers (no real money involved)

### Test Inbound Transfers
Use the "Add Money" button on the financial account page to add funds:
- Creates an inbound transfer to your financial account
- Funds are available instantly
- Transaction appears in your history
- Uses test payment methods configured in your environment

## 🔐 Security Notes

- All Stripe secret keys are server-side only
- Never expose `STRIPE_SECRET_KEY` or `STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY` to the client
- Public keys (`NEXT_PUBLIC_*`) are safe for client-side use
- Connected account IDs can be public when used with embedded components

## 🌐 Deployment

### Deploy to Vercel

```bash
vercel --prod
```

### Environment Variables
Make sure to add all environment variables from `.env.example` to your Vercel project settings:
https://vercel.com/[your-project]/settings/environment-variables

### Production Checklist
- ✅ All environment variables configured in Vercel
- ✅ Stripe webhooks configured (if needed)
- ✅ Connected accounts verified
- ✅ Treasury and Issuing features enabled on your account
- ✅ Capital access granted (if using Capital features)

## 📚 Resources

- [Stripe Treasury Documentation](https://stripe.com/docs/treasury)
- [Stripe Issuing Documentation](https://stripe.com/docs/issuing)
- [Stripe Capital Documentation](https://stripe.com/docs/capital)
- [Stripe Connect Embedded Components](https://stripe.com/docs/connect/embedded-components)
- [Next.js Documentation](https://nextjs.org/docs)

## 🛠 Built With

- **Next.js 15** - React framework with App Router
- **Stripe Connect** - Embedded financial components
- **Stripe Node.js SDK** - Server-side Stripe operations
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety
- **Radix UI** - Accessible component primitives
- **Geist Font** - Modern typography

## 📄 License

This is a demo application for educational and demonstration purposes.

---

🤖 Built with Stripe's Banking-as-a-Service APIs
