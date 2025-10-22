'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddMoneyPanelProps {
  onSuccess?: () => void
}

export function AddMoneyPanel({ onSuccess }: AddMoneyPanelProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

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

      const response = await fetch('/api/stripe/inbound-transfer', {
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
        throw new Error(result.error || 'Failed to add money')
      }

      toast({
        title: "Money added successfully!",
        description: result.message,
      })

      setAmount("")
      setIsOpen(false) // Close the panel
      onSuccess?.()

    } catch (error) {
      console.error('Error adding money:', error)
      toast({
        title: "Failed to add money",
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
          <Plus className="h-4 w-4" />
          Add Money
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] border-l-2 border-border shadow-xl p-6">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Money
          </SheetTitle>
          <SheetDescription>
            Add funds to your financial account using an inbound transfer. The money will be available instantly for spending and transfers.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="add-money-amount" className="text-sm font-medium">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <Input
                  id="add-money-amount"
                  type="text"
                  placeholder="100.00"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pl-8 text-lg h-12"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the amount you want to add to your account
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">What happens when you add money:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Creates an inbound transfer to your financial account</li>
                <li>• Funds are available instantly</li>
                <li>• Shows up in your transaction history</li>
                <li>• Uses test payment methods (no real money)</li>
                <li>• Updates your account balance immediately</li>
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
                    Adding Money...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Money
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
