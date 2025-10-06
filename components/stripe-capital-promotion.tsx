'use client'

import React, { useEffect, useState } from 'react'
import { loadConnectAndInitialize } from '@stripe/connect-js/pure'
import {
  ConnectComponentsProvider,
  ConnectCapitalFinancingPromotion,
  ConnectCapitalFinancingApplication,
  ConnectCapitalFinancing,
} from '@stripe/react-connect-js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, AlertCircle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

interface StripeCapitalPromotionProps {
  onClose: () => void
  stripePublishableKey?: string
  connectedAccountId?: string
  capitalAccountId?: string
}

type CapitalStep = 'promotion' | 'application' | 'financing'


export function StripeCapitalPromotion({ 
  onClose, 
  stripePublishableKey,
  connectedAccountId,
  capitalAccountId 
}: StripeCapitalPromotionProps) {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<any>(null)
  const [capitalConnectInstance, setCapitalConnectInstance] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<CapitalStep>('promotion')
  const [generatingAccountLink, setGeneratingAccountLink] = useState(false)
  const [hasFinancingInProgress, setHasFinancingInProgress] = useState(false)

  useEffect(() => {
    if (!stripePublishableKey || !connectedAccountId || !capitalAccountId) {
      setError('Missing required Stripe configuration. Please provide your Stripe publishable key, connected account ID, and capital account ID.')
      setLoading(false)
      return
    }

    const initializeStripe = async () => {
      try {
        // Create account session for the main connected account (financing & reporting)
        const accountSessionResponse = await fetch('/api/stripe/create-account-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: connectedAccountId,
            components: {
              capital_financing_promotion: {
                enabled: true,
              },
            },
          }),
        })

        if (!accountSessionResponse.ok) {
          throw new Error('Failed to create account session')
        }

        const { client_secret } = await accountSessionResponse.json()

        // Initialize Connect instance for main account
        const connectInstance = loadConnectAndInitialize({
          publishableKey: stripePublishableKey,
          fetchClientSecret: async () => client_secret,
          appearance: {
            theme: 'stripe',
            variables: {
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontSizeBase: '14px',
              fontWeightNormal: '400',
              fontWeightMedium: '500',
              fontWeightBold: '600',
            },
          },
        })

        setStripeConnectInstance(connectInstance)

        // Create account session for the capital account (promotion & application)
        const capitalAccountSessionResponse = await fetch('/api/stripe/create-capital-account-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: capitalAccountId,
            components: {
              capital_financing_promotion: {
                enabled: true,
              },
              capital_financing_application: {
                enabled: true,
              },
            },
          }),
        })

        if (!capitalAccountSessionResponse.ok) {
          throw new Error('Failed to create capital account session')
        }

        const { client_secret: capital_client_secret } = await capitalAccountSessionResponse.json()

        // Initialize Connect instance for capital account
        const capitalConnectInstance = loadConnectAndInitialize({
          publishableKey: stripePublishableKey,
          fetchClientSecret: async () => capital_client_secret,
          appearance: {
            theme: 'stripe',
            variables: {
              fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontSizeBase: '14px',
              fontWeightNormal: '400',
              fontWeightMedium: '500',
              fontWeightBold: '600',
            },
          },
        })

        setCapitalConnectInstance(capitalConnectInstance)
        
        // Check for existing financing (this would normally come from your backend)
        // For demo purposes, you can set this to true to test the UI
        // setHasFinancingInProgress(true)
        
        setLoading(false)
      } catch (err) {
        console.error('Error initializing Stripe:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize Stripe Connect')
        setLoading(false)
      }
    }

    initializeStripe()
  }, [stripePublishableKey, connectedAccountId, capitalAccountId])

  if (!stripePublishableKey || !connectedAccountId || !capitalAccountId) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Stripe Configuration Required
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              To display Stripe Capital financing options, please provide your Stripe configuration:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Stripe publishable key (starts with pk_)</li>
              <li>Connected account ID (starts with acct_)</li>
              <li>Capital account ID (starts with acct_)</li>
            </ul>
            <p className="text-sm text-blue-600">
              Contact your administrator to configure these settings.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stripe Capital</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">Loading Stripe Capital options...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Error Loading Stripe Capital
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-red-600">{error}</p>
            <p className="text-sm text-gray-600">
              Please check your Stripe configuration and try again. You may need to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Verify your Stripe publishable key</li>
              <li>Ensure the connected account ID is valid</li>
              <li>Set up the backend API endpoint for account sessions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  const stepTitles = {
    promotion: 'Capital Offers',
    application: 'Apply for Capital',
    financing: 'Capital Financing'
  }

  const stepDescriptions = {
    promotion: '',
    application: '',
    financing: ''
  }

  const renderPromotion = () => (
    <div className="space-y-6">
      {hasFinancingInProgress ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <div className="text-white text-sm">⏳</div>
            </div>
            <div>
              <h4 className="font-semibold text-amber-900">Financing in Progress</h4>
              <p className="text-amber-800 text-sm mt-1">
                You have an active capital advance. You can apply for a new offer once your current financing has been repaid.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[600px]">
          {capitalConnectInstance && (
            <ConnectComponentsProvider connectInstance={capitalConnectInstance}>
              <ConnectCapitalFinancingPromotion 
                onContinue={() => setCurrentStep('application')}
              />
            </ConnectComponentsProvider>
          )}
        </div>
      )}
    </div>
  )

  const renderApplication = () => (
    <div className="space-y-6">
      {hasFinancingInProgress ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <div className="text-white text-sm">⏳</div>
            </div>
            <div>
              <h4 className="font-semibold text-amber-900">Financing in Progress</h4>
              <p className="text-amber-800 text-sm mt-1">
                You cannot apply for additional capital while you have an active advance.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[600px]">
          {capitalConnectInstance && (
            <ConnectComponentsProvider connectInstance={capitalConnectInstance}>
              <ConnectCapitalFinancingApplication 
                onApplicationComplete={() => setCurrentStep('financing')}
              />
            </ConnectComponentsProvider>
          )}
        </div>
      )}
    </div>
  )

  const renderFinancing = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm min-h-[600px]">
        {stripeConnectInstance && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectCapitalFinancing />
          </ConnectComponentsProvider>
        )}
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'promotion':
        return renderPromotion()
      case 'application':
        return renderApplication()
      case 'financing':
        return renderFinancing()
      default:
        return renderPromotion()
    }
  }

  const stepSubtitles = {
    promotion: 'Capital Promotion',
    application: 'Capital Application',
    financing: 'Capital Financing'
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-2">
        <div className="text-sm text-gray-600">
          Wix Capital <span className="mx-1">›</span> {stepSubtitles[currentStep]}
        </div>
      </div>

      {/* Wix Capital Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Wix Capital</h1>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-gray-700 font-medium">
            {stepDescriptions[currentStep]}
          </p>
        </div>

        {stripeConnectInstance && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            {renderCurrentStep()}
          </ConnectComponentsProvider>
        )}
      </div>

      {/* Step Navigation - Bottom */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const steps: CapitalStep[] = ['promotion', 'application', 'financing']
              const currentIndex = steps.indexOf(currentStep)
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1])
              }
            }}
            disabled={currentStep === 'promotion'}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const steps: CapitalStep[] = ['promotion', 'application', 'financing']
              const currentIndex = steps.indexOf(currentStep)
              if (currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1])
              }
            }}
            disabled={currentStep === 'financing'}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
} 