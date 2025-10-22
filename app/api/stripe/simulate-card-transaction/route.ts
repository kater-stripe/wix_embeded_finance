import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

/**
 * Required Environment Variables:
 * - STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY: Your Stripe secret key
 * - STRIPE_FINANCIAL_CONNECTED_ACCOUNT_ID: Connected account ID (e.g., acct_1LQdW0RCN32EcHAW)
 * - STRIPE_ISSUING_CARD_ID: Issuing card ID (e.g., ic_1SKyNARCN32EcHAWSuD99GWR)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount } = body

    console.log('Received card simulation request:', { amount })

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
    const cardId = process.env.STRIPE_ISSUING_CARD_ID

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe secret key not configured' },
        { status: 500 }
      )
    }

    if (!connectedAccountId) {
      return NextResponse.json(
        { error: 'Connected account ID not configured' },
        { status: 500 }
      )
    }

    if (!cardId) {
      return NextResponse.json(
        { error: 'Issuing card ID not configured' },
        { status: 500 }
      )
    }

    // Initialize Stripe with the connected account
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-12-18.acacia',
      stripeAccount: connectedAccountId,
    })

    console.log('Creating authorization for card:', cardId, 'amount:', amount)

    // Step 1: Create authorization
    const authorization = await stripe.testHelpers.issuing.authorizations.create({
      card: cardId,
      amount: amount,
      currency: 'usd',
    })

    console.log('Authorization created:', authorization.id)

    // Step 2: Capture the authorization
    const capturedAuth = await stripe.testHelpers.issuing.authorizations.capture(
      authorization.id
    )

    console.log('Authorization captured:', capturedAuth.id)

    return NextResponse.json({
      success: true,
      authorization: capturedAuth,
      message: `Successfully simulated card transaction for $${(amount / 100).toFixed(2)}`
    })

  } catch (error) {
    console.error('Error simulating card transaction:', error)
    
    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { 
          error: 'Stripe error', 
          details: error.message,
          type: error.type 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
