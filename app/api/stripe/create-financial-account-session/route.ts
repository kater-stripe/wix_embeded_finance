import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { account } = body

    console.log('Received financial account session request:', { account })

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
    console.log('Creating financial account session for account:', account)

    // Create account session with Stripe for financial account component
    const accountSessionResponse = await fetch('https://api.stripe.com/v1/account_sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        account: account,
        'components[financial_account][enabled]': 'true',
        'components[financial_account][features][send_money]': 'true',
        'components[financial_account][features][transfer_balance]': 'true',
        'components[financial_account][features][external_account_collection]': 'true',
        'components[financial_account][features][disable_stripe_user_authentication]': 'true',
        'components[financial_account_transactions][enabled]': 'true',
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
          error: 'Failed to create financial account session with Stripe',
          details: errorText,
          status: accountSessionResponse.status
        },
        { status: accountSessionResponse.status }
      )
    }

    const accountSession = await accountSessionResponse.json()
    console.log('Successfully created financial account session')

    return NextResponse.json({
      client_secret: accountSession.client_secret,
    })
  } catch (error) {
    console.error('Error creating financial account session:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
