import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY
    const connectedAccountId = process.env.STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID
    const financialAccountId = request.nextUrl.searchParams.get('financial_account')

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Financial account Stripe configuration not found' },
        { status: 500 }
      )
    }

    if (!connectedAccountId) {
      return NextResponse.json(
        { error: 'Financial account connected account ID not configured' },
        { status: 500 }
      )
    }

    if (!financialAccountId) {
      return NextResponse.json(
        { error: 'Financial account ID required' },
        { status: 400 }
      )
    }

    // Fetch transactions for the financial account
    const response = await fetch(
      `https://api.stripe.com/v1/treasury/transactions?financial_account=${financialAccountId}&limit=10`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Stripe-Account': connectedAccountId,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Stripe API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch transactions', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
