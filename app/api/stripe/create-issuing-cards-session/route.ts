import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { account } = body

    console.log('Received issuing cards session request:', { account })

    if (!account) {
      console.error('Missing account parameter')
      return NextResponse.json(
        { error: 'Missing required parameter: account' },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY
    if (!stripeSecretKey) {
      console.error('STRIPE_FINANCIAL_ACCOUNT_SECRET_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Financial account Stripe configuration not found' },
        { status: 500 }
      )
    }

    console.log('Using Stripe secret key:', stripeSecretKey.substring(0, 12) + '...')
    console.log('Creating issuing cards session for account:', account)

    // Create account session with Stripe for issuing cards list component
    const accountSessionResponse = await fetch('https://api.stripe.com/v1/account_sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        account: account,
        'components[issuing_cards_list][enabled]': 'true',
        'components[issuing_cards_list][features][card_management]': 'true',
        'components[issuing_cards_list][features][cardholder_management]': 'true',
        'components[issuing_cards_list][features][card_spend_dispute_management]': 'true',
        'components[issuing_cards_list][features][spend_control_management]': 'true',
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
          error: 'Failed to create issuing cards session with Stripe',
          details: errorText,
          status: accountSessionResponse.status
        },
        { status: accountSessionResponse.status }
      )
    }

    const accountSession = await accountSessionResponse.json()
    console.log('Successfully created issuing cards session')

    return NextResponse.json({
      client_secret: accountSession.client_secret,
    })
  } catch (error) {
    console.error('Error creating issuing cards session:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
