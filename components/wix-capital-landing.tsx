'use client'

import { Check, CreditCard, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WixCapitalLandingProps {
  onGetStarted: () => void
}

export function WixCapitalLanding({ onGetStarted }: WixCapitalLandingProps) {
  return (
    <div className="flex-1 overflow-auto bg-[#f9f9fb]">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between max-w-[1000px] mx-auto">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#116DFF"/>
              <path d="M7 8L12 16L17 8H7Z" fill="white"/>
            </svg>
            <span className="text-lg font-semibold text-gray-900">Wix</span>
          </div>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto py-12 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="text-sm text-gray-600 mb-3">Wix Cashflow</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                A bank account built into your business
              </h1>
              <p className="text-base text-gray-600">
                Manage your money, get paid faster and make smart financial decisions - all in one place
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Get an account with the Wix Checking Account</span> (checking account and routing number) that directly integrates with your business
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Earn 2.6% APY</span> with our interest-earning balance on your funds up to $2 million
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Get paid fast</span> with instant payouts for online payments
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Discover smart ways to grow your business</span> using Wix data including suggested spend and ways to boost your cash flow
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Build your credit</span> and grow your buying power with the Wix Business Mastercard
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Use your physical and virtual cards</span> to manage & streamline all your business expenses
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-11 rounded-lg font-medium"
              >
                Get started
              </Button>
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-11 px-6"
              >
                Explore the program
              </Button>
            </div>

            {/* Footer Text */}
            <div className="mt-8 text-xs text-gray-500 leading-relaxed">
              <p className="mb-2">
                Banking services provided by Piermont Bank, Member FDIC. The Wix Visa Business Debit Card is issued by Piermont Bank
                pursuant to a license from Visa U.S.A. Inc. and may be used everywhere Visa debit cards are accepted.
              </p>
              <p>
                Wix Capital is not a bank. Funding is subject to additional approval criteria. See Wix Capital Terms & Conditions
                for full product details.
              </p>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] p-6 text-white border-0 rounded-xl shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Balance</div>
                  <div className="text-3xl font-bold">$3,234.20</div>
                </div>
              </div>

              {/* Card Design */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 bg-white rounded" />
                  <span className="text-xs font-medium">Business Account</span>
                </div>
                <div className="text-sm tracking-wider">•••• •••• •••• 4829</div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-white text-gray-900 hover:bg-gray-100 flex-1 h-9 rounded-lg font-medium"
                >
                  View balance
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 h-9 rounded-lg"
                >
                  Options
                </Button>
              </div>
            </Card>

            {/* Instant Tax Software Card */}
            <Card className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    Instant Tax Software
                  </div>
                  <div className="text-xs text-gray-600 mb-3">
                    Automatically categorize expenses and track deductions
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-gray-300 hover:bg-gray-50 rounded-md"
                  >
                    Learn more
                  </Button>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">$84.00</div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
              </div>
            </Card>

            {/* Wix Capital Offer Card */}
            <Card className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    Wix Capital Offer
                  </div>
                  <div className="text-xs text-gray-600 mb-3">
                    Get funding to grow your business with flexible terms
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-gray-300 hover:bg-gray-50 rounded-md"
                  >
                    View offer
                  </Button>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">Up to</div>
                  <div className="text-lg font-bold text-green-600">$25K</div>
                </div>
              </div>
            </Card>

            {/* Payment Terminal Card */}
            <Card className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-4 bg-gray-300 rounded" />
                  </div>
                  <div className="text-sm text-gray-900">Payment Terminal</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-gray-300 hover:bg-gray-50 rounded-md px-3"
                  >
                    Order hardware
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
