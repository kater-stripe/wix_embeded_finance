import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY
    const connectedAccountId = process.env.STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID

    if (!stripeSecretKey || !connectedAccountId) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 500 }
      )
    }

    // Fetch account details
    const response = await fetch(
      `https://api.stripe.com/v1/accounts/${connectedAccountId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to fetch account:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch account details' },
        { status: response.status }
      )
    }

    const account = await response.json()

    return NextResponse.json({
      account_type: account.type,
      capabilities: account.capabilities,
      controller: account.controller,
      requirements: account.requirements,
      details_submitted: account.details_submitted,
    })
  } catch (error) {
    console.error('Error verifying account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
