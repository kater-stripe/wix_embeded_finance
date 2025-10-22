'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { CreditCard, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SimulateCardTransactionPanelProps {
  onSuccess?: () => void
}

export function SimulateCardTransactionPanel({ onSuccess }: SimulateCardTransactionPanelProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than $0",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Convert dollars to cents for Stripe API
      const amountInCents = Math.round(parseFloat(amount) * 100)

      const response = await fetch('/api/stripe/simulate-card-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInCents,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to simulate transaction')
      }

      toast({
        title: "Transaction simulated successfully!",
        description: result.message,
      })

      setAmount("")
      setIsOpen(false) // Close the panel
      onSuccess?.()
      
      // Redirect to financial account page after successful simulation
      setTimeout(() => {
        router.push('/financial-account')
      }, 500) // Small delay to allow toast to show and panel to close

    } catch (error) {
      console.error('Error simulating transaction:', error)
      toast({
        title: "Failed to simulate transaction",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow positive numbers with up to 2 decimal places
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="gap-2 bg-[#0070F3] hover:bg-[#0070F3]/90 text-white"
          onClick={() => setIsOpen(true)}
        >
          <CreditCard className="h-4 w-4" />
          Simulate Transaction
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] border-l-2 border-border shadow-xl p-6">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Simulate Card Transaction
          </SheetTitle>
          <SheetDescription>
            Test your card by simulating a transaction. This will create an authorization, capture it, and then redirect you to the financial account page to view the results.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="transaction-amount" className="text-sm font-medium">
                Transaction Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <Input
                  id="transaction-amount"
                  type="text"
                  placeholder="10.99"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pl-8 text-lg h-12"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the amount you want to simulate charging to the card
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">What happens when you simulate:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Creates an authorization for the specified amount</li>
                <li>• Immediately captures the authorization</li>
                <li>• Shows up in your transaction history</li>
                <li>• Uses test payment methods (no real money)</li>
                <li>• Redirects to financial account page to view results</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                className="flex-1 bg-[#0070F3] hover:bg-[#0070F3]/90 h-11"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Simulate Transaction
                  </>
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="px-4 h-11">
                  Cancel
                </Button>
              </SheetClose>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
