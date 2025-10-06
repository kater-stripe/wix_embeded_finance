import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { account, components } = body

    console.log('Received capital account session request:', { account, components })

    // Validate required parameters
    if (!account) {
      console.error('Missing account parameter')
      return NextResponse.json(
        { error: 'Missing required parameter: account' },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Stripe configuration not found. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      )
    }

    console.log('Using Stripe secret key:', stripeSecretKey.substring(0, 12) + '...')
    console.log('Creating capital account session for account:', account)

    // Create account session with Stripe for capital account
    const accountSessionResponse = await fetch('https://api.stripe.com/v1/account_sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2025-04-30.basil; embedded_connect_beta=v2;',
      },
      body: new URLSearchParams({
        account: account,
        'components[capital_financing][enabled]': 'true',
        'components[capital_financing_promotion][enabled]': 'true',
        'components[capital_financing_application][enabled]': 'true',
      }),
    })

    console.log('Stripe API response status:', accountSessionResponse.status)

    if (!accountSessionResponse.ok) {
      const errorText = await accountSessionResponse.text()
      console.error('Stripe API error response:', errorText)
      console.error('Stripe API error status:', accountSessionResponse.status)
      
      try {
        const errorJson = JSON.parse(errorText)
        console.error('Parsed Stripe error:', errorJson)
      } catch (e) {
        console.error('Could not parse Stripe error as JSON')
      }

      return NextResponse.json(
        { 
          error: 'Failed to create capital account session with Stripe',
          details: errorText,
          status: accountSessionResponse.status
        },
        { status: accountSessionResponse.status }
      )
    }

    const accountSession = await accountSessionResponse.json()
    console.log('Successfully created capital account session')

    return NextResponse.json({
      client_secret: accountSession.client_secret,
    })
  } catch (error) {
    console.error('Error creating capital account session:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}