import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY
    const connectedAccountId = process.env.STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID

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

    // Fetch financial accounts for the connected account
    const response = await fetch('https://api.stripe.com/v1/treasury/financial_accounts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Stripe-Account': connectedAccountId,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Stripe API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch financial account', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return the first financial account if available
    if (data.data && data.data.length > 0) {
      return NextResponse.json(data.data[0])
    }

    return NextResponse.json(
      { error: 'No financial account found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching financial account:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
