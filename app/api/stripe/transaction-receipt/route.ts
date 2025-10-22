import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY
    const connectedAccountId = process.env.STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID
    const transactionId = request.nextUrl.searchParams.get('transaction_id')

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

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID required' },
        { status: 400 }
      )
    }

    // Fetch the transaction details to get the receipt URL
    const response = await fetch(
      `https://api.stripe.com/v1/treasury/transactions/${transactionId}`,
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
        { error: 'Failed to fetch transaction', details: errorText },
        { status: response.status }
      )
    }

    const transaction = await response.json()

    // Generate the hosted receipt URL
    // For Treasury transactions, we need to get the associated ReceivedCredit object
    if (transaction.flow_details?.type === 'received_credit') {
      const receivedCreditId = transaction.flow_details.received_credit

      // Fetch the ReceivedCredit to get the hosted receipt URL
      const receivedCreditResponse = await fetch(
        `https://api.stripe.com/v1/treasury/received_credits/${receivedCreditId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Stripe-Account': connectedAccountId,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (receivedCreditResponse.ok) {
        const receivedCredit = await receivedCreditResponse.json()
        if (receivedCredit.hosted_regulatory_receipt_url) {
          return NextResponse.json({
            receipt_url: receivedCredit.hosted_regulatory_receipt_url
          })
        }
      }
    }

    return NextResponse.json(
      { error: 'Receipt not available for this transaction' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching transaction receipt:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
