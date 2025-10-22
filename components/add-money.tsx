'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddMoneyProps {
  onSuccess?: () => void
}

export function AddMoney({ onSuccess }: AddMoneyProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Plus className="h-5 w-5" />
          Add Money
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                className="pl-8"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex-1"></div>
          <Button 
            type="submit" 
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className="w-full bg-[#0070F3] hover:bg-[#0070F3]/90"
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
        </form>
      </CardContent>
    </Card>
  )
}
