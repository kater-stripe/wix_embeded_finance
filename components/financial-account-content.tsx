'use client'

import { useEffect, useState } from "react"
import { FinancialAccountInfo } from "@/components/financial-account-info"
import { FinancialAccountTransactions } from "@/components/financial-account-transactions"

interface FinancialAccountContentProps {
  onBack?: () => void
}

interface FinancialAccountData {
  id: string
  balance: {
    cash: { [key: string]: number }
  }
  financial_addresses?: Array<{
    type: string
    aba?: {
      account_number?: string
      routing_number?: string
      bank_name?: string
      account_holder_name?: string
    }
  }>
}

interface Transaction {
  id: string
  amount: number
  created: number
  description: string
  status: string
  status_transitions: {
    posted_at?: number
  }
  flow_type?: string
}

export function FinancialAccountContent({ onBack }: FinancialAccountContentProps) {
  const [financialAccount, setFinancialAccount] = useState<FinancialAccountData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch financial account
      const accountResponse = await fetch('/api/stripe/financial-account')
      if (!accountResponse.ok) {
        throw new Error('Failed to fetch financial account')
      }
      const accountData = await accountResponse.json()
      setFinancialAccount(accountData)

      // Fetch transactions if we have a financial account
      if (accountData.id) {
        const transactionsResponse = await fetch(
          `/api/stripe/financial-account-transactions?financial_account=${accountData.id}`
        )
        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json()
          setTransactions(transactionsData.data || [])
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 overflow-auto bg-background p-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-muted-foreground">Loading financial account...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto bg-background p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  // Extract financial address data
  const financialAddress = financialAccount?.financial_addresses?.[0]?.aba
  const balance = financialAccount?.balance?.cash?.usd || 0

  // Format transactions for display
  const formattedTransactions = transactions.map(tx => ({
    id: tx.id,
    date: new Date(tx.created * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }),
    amount: tx.amount,
    type: tx.flow_type?.toUpperCase().replace('_', ' ') || 'TRANSACTION',
    status: tx.status.toUpperCase(),
    description: tx.description || 'No description',
    flow_type: tx.flow_type
  }))

  const connectedAccountId = process.env.NEXT_PUBLIC_STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID || 'acct_1LQdW0RCN32EcHAW'

  return (
    <div className="flex-1 overflow-auto bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Account Information */}
        <FinancialAccountInfo
          accountHolderName={financialAddress?.account_holder_name || "Demo Innovative Inc."}
          bankName={financialAddress?.bank_name || "Stripe Test Bank"}
          routingNumber={financialAddress?.routing_number || "000000001"}
          accountNumber={financialAddress?.account_number || "Not available"}
          connectedAccountId={connectedAccountId}
          financialAccountId={financialAccount?.id}
          onMoneyAdded={() => {
            // Refresh the data when money is added
            fetchData()
          }}
        />

        {/* Latest Transactions */}
        <FinancialAccountTransactions
          connectedAccountId={connectedAccountId}
          financialAccountId={financialAccount?.id}
        />
      </div>
    </div>
  )
}
