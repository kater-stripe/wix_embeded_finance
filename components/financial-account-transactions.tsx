'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmbeddedFinancialAccountTransactions } from "@/components/embedded-financial-account-transactions"

interface FinancialAccountTransactionsProps {
  connectedAccountId?: string
  financialAccountId?: string
}

export function FinancialAccountTransactions({
  connectedAccountId,
  financialAccountId
}: FinancialAccountTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Latest transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {connectedAccountId && financialAccountId ? (
          <EmbeddedFinancialAccountTransactions
            connectedAccountId={connectedAccountId}
            financialAccountId={financialAccountId}
          />
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Loading transactions...
          </p>
        )}
      </CardContent>
    </Card>
  )
}
