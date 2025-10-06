import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId } = body
    
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const connectedAccountId = accountId || process.env.NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID

    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Stripe configuration not found. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      )
    }

    if (!connectedAccountId) {
      console.error('NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID environment variable not set')
      return NextResponse.json(
        { error: 'Connected account ID not found. Please set NEXT_PUBLIC_STRIPE_CONNECTED_ACCOUNT_ID environment variable.' },
        { status: 500 }
      )
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    // Create account link with Stripe for capital reporting
    const accountLinkResponse = await fetch('https://api.stripe.com/v1/account_links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2025-04-30.basil; embedded_connect_beta=v2;',
      },
      body: new URLSearchParams({
        account: connectedAccountId,
        refresh_url: `${origin}/refresh`,
        return_url: `${origin}/`,
        type: 'capital_financing_reporting',
      }),
    })

    console.log('Stripe account link response status:', accountLinkResponse.status)

    if (!accountLinkResponse.ok) {
      const errorText = await accountLinkResponse.text()
      console.error('Stripe API error response:', errorText)
      
      return NextResponse.json(
        { 
          error: 'Failed to create account link with Stripe',
          details: errorText,
          status: accountLinkResponse.status
        },
        { status: accountLinkResponse.status }
      )
    }

    const accountLink = await accountLinkResponse.json()
    console.log('Successfully created account link for capital reporting')

    return NextResponse.json({
      url: accountLink.url,
    })
  } catch (error) {
    console.error('Error creating account link:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}