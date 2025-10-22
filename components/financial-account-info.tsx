'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmbeddedFinancialAccount } from "@/components/embedded-financial-account"
import { AddMoneyPanel } from "@/components/add-money-panel"

interface FinancialAccountInfoProps {
  accountHolderName?: string
  bankName?: string
  routingNumber?: string
  accountNumber?: string
  connectedAccountId?: string
  financialAccountId?: string
  onMoneyAdded?: () => void
}

export function FinancialAccountInfo({
  accountHolderName = "Demo Innovative Inc.",
  bankName = "Stripe Test Bank",
  routingNumber = "000000001",
  accountNumber = "12100947047078259",
  connectedAccountId,
  financialAccountId,
  onMoneyAdded
}: FinancialAccountInfoProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="mb-2">
        <div className="text-sm text-gray-600">
          Wix Finances <span className="mx-1">›</span> Financial Account
        </div>
      </div>

      {/* Header with Add Money button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Account information</h1>
        {financialAccountId && (
          <AddMoneyPanel onSuccess={onMoneyAdded} />
        )}
      </div>
      
      {/* Account Information Card */}
      <Card>
        <CardContent className="px-6 py-4">
          {/* Embedded Financial Account Component */}
          {connectedAccountId && financialAccountId && (
            <EmbeddedFinancialAccount
              connectedAccountId={connectedAccountId}
              financialAccountId={financialAccountId}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
