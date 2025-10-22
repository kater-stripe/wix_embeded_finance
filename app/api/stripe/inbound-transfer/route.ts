import { NextRequest, NextResponse } from 'next/server'

/**
 * Required Environment Variables:
 * - STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY: Your Stripe secret key
 * - STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID: Connected account ID (e.g., acct_1LQdW0RCN32EcHAW)
 * - STRIPE_TREASURY_FINANCIAL_ACCOUNT_ID: Treasury financial account ID (e.g., fa_1LQdojRCN32EcHAWKm4i0zZv)
 * - STRIPE_TREASURY_ORIGIN_PAYMENT_METHOD_ID: Origin payment method ID (e.g., pm_1LQdzpRCN32EcHAWvNWBUoSB)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount } = body

    console.log('Received inbound transfer request:', { amount })

    if (!amount) {
      return NextResponse.json(
        { error: 'Missing required parameter: amount' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY
    const connectedAccountId = process.env.STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID
    const financialAccountId = process.env.STRIPE_TREASURY_FINANCIAL_ACCOUNT_ID
    const originPaymentMethodId = process.env.STRIPE_TREASURY_ORIGIN_PAYMENT_METHOD_ID

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
        { error: 'Treasury financial account ID not configured' },
        { status: 500 }
      )
    }

    if (!originPaymentMethodId) {
      return NextResponse.json(
        { error: 'Treasury origin payment method ID not configured' },
        { status: 500 }
      )
    }

    // Create inbound transfer using Stripe Treasury API
    const inboundTransferResponse = await fetch('https://api.stripe.com/v1/treasury/inbound_transfers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Stripe-Account': connectedAccountId,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: amount.toString(),
        currency: 'usd',
        financial_account: financialAccountId,
        origin_payment_method: originPaymentMethodId,
        description: 'Funds for treasury financial account',
        statement_descriptor: 'funding',
      }),
    })

    console.log('Stripe inbound transfer response status:', inboundTransferResponse.status)

    if (!inboundTransferResponse.ok) {
      const errorText = await inboundTransferResponse.text()
      console.error('Stripe API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to create inbound transfer', details: errorText },
        { status: inboundTransferResponse.status }
      )
    }

    const inboundTransfer = await inboundTransferResponse.json()
    console.log('Successfully created inbound transfer:', inboundTransfer.id)

    return NextResponse.json({
      success: true,
      inbound_transfer: inboundTransfer,
      message: `Successfully added $${(amount / 100).toFixed(2)} to account`
    })

  } catch (error) {
    console.error('Error creating inbound transfer:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
