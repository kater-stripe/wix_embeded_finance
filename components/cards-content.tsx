'use client'

import { EmbeddedIssuingCardsList } from "@/components/embedded-issuing-cards-list"
import { SimulateCardTransactionPanel } from "@/components/simulate-card-transaction-panel"

interface CardsContentProps {
  onBack?: () => void
}

export function CardsContent({ onBack }: CardsContentProps) {
  const connectedAccountId = process.env.NEXT_PUBLIC_STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID || ''

  return (
    <div className="flex-1 overflow-auto bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb */}
        <div className="mb-2">
          <div className="text-sm text-gray-600">
            Wix Finances <span className="mx-1">›</span> Cards
          </div>
        </div>

        {/* Header with actions */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Cards</h1>
            <p className="text-muted-foreground">
              Manage your issuing cards, cardholders, and spend controls
            </p>
          </div>
          
          {/* Action buttons in top-right */}
          <div className="flex items-center gap-3">
            <SimulateCardTransactionPanel 
              onSuccess={() => {
                // Optionally refresh card data or show additional feedback
                console.log('Card transaction simulated successfully')
              }}
            />
          </div>
        </div>

        {/* Cards Management */}
        <div className="rounded-lg border bg-card p-6">
          <EmbeddedIssuingCardsList connectedAccountId={connectedAccountId} />
        </div>
      </div>
    </div>
  )
}
