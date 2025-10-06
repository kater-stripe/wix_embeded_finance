'use client'

import { StripeCapitalPromotion } from "@/components/stripe-capital-promotion"

interface CapitalContentProps {
  onBack?: () => void
}

export function CapitalContent({ onBack }: CapitalContentProps) {
  return (
    <div className="flex-1 overflow-auto bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <StripeCapitalPromotion
          onClose={onBack || (() => {})}
          stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          connectedAccountId={process.env.NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID}
          capitalAccountId={process.env.NEXT_PUBLIC_STRIPE_CAPITAL_ACCOUNT_ID}
        />
      </div>
    </div>
  )
}
