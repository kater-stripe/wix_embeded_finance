'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmbeddedFinancialAccount } from "@/components/embedded-financial-account"
import { AddMoney } from "@/components/add-money"

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
    <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Account information</CardTitle>
          </CardHeader>
          <CardContent>
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
      
      {/* Add Money Component */}
      {financialAccountId && (
        <div className="lg:w-80 flex flex-col">
          <AddMoney
            onSuccess={onMoneyAdded}
          />
        </div>
      )}
    </div>
  )
}
