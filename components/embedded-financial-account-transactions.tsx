'use client'

import { useEffect, useState } from 'react'
import {
  ConnectFinancialAccountTransactions,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js'
import { loadConnectAndInitialize } from '@stripe/connect-js'

interface EmbeddedFinancialAccountTransactionsProps {
  connectedAccountId: string
  financialAccountId: string
}

export function EmbeddedFinancialAccountTransactions({
  connectedAccountId,
  financialAccountId,
}: EmbeddedFinancialAccountTransactionsProps) {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeConnect = async () => {
      try {
        // Initialize Stripe Connect with fetchClientSecret function
        const instance = await loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_FINANCIAL_PUBLISHABLE_KEY || '',
          fetchClientSecret: async () => {
            const response = await fetch('/api/stripe/create-financial-account-session', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                account: connectedAccountId,
              }),
            })

            if (!response.ok) {
              const error = await response.json()
              console.error('Failed to create account session:', error)
              throw new Error(error.error || 'Failed to create account session')
            }

            const { client_secret: clientSecret } = await response.json()
            return clientSecret
          },
          appearance: {
            overlays: 'dialog',
            variables: {
              colorPrimary: '#2563eb',
              colorBackground: '#ffffff',
              colorText: '#1a1a1a',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSizeBase: '16px',
              spacingUnit: '8px',
              borderRadius: '8px',
              fontWeightNormal: '400',
              fontWeightMedium: '500',
              fontWeightBold: '600',
            },
            rules: {
              '.Container': {
                padding: '0',
                boxShadow: 'none',
              },
              '.Block': {
                padding: '0',
                marginBottom: '12px',
              },
              '.Label': {
                fontWeight: '500',
                marginBottom: '6px',
                fontSize: '14px',
              },
              '.Tab': {
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              },
              '.Tab:hover': {
                backgroundColor: '#f9fafb',
              },
              '.Tab--selected': {
                borderColor: '#2563eb',
                backgroundColor: '#dbeafe',
              },
              '.Input': {
                padding: '10px',
                borderRadius: '6px',
                fontSize: '14px',
              },
              '.Button': {
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '500',
                fontSize: '14px',
              },
            },
          },
        })

        setStripeConnectInstance(instance)
      } catch (error) {
        console.error('Error initializing Stripe Connect:', error)
        setError(error instanceof Error ? error.message : 'Failed to initialize')
      }
    }

    initializeConnect()
  }, [connectedAccountId])

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">Error loading transactions: {error}</p>
        </div>
      </div>
    )
  }

  if (!stripeConnectInstance) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectFinancialAccountTransactions financialAccount={financialAccountId} />
    </ConnectComponentsProvider>
  )
}
