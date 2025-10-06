import type React from "react"
import { ArrowUpRight, Building2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FinancialDashboard() {
  return (
    <aside className="w-[420px] border-l bg-muted/30 p-6 overflow-auto">
      <Card className="mb-6 p-6">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold">$1,234</span>
            <span className="text-2xl text-muted-foreground">.50</span>
          </div>
        </div>

        <div className="mb-6 flex gap-4 text-sm">
          <Button variant="link" className="h-auto p-0 text-[#0070F3]">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Add Money
          </Button>
          <Button variant="link" className="h-auto p-0 text-[#0070F3]">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Transfer Out
          </Button>
        </div>

        <div className="relative h-48 rounded-lg bg-gradient-to-br from-[#0A1628] to-[#1a2942] p-6 text-white">
          <div className="mb-8 text-2xl font-bold">WIX</div>
          <div className="absolute bottom-6 left-6">
            <div className="h-8 w-12 rounded bg-white/20" />
          </div>
          <div className="absolute bottom-6 right-6 text-xl font-bold">VISA</div>
        </div>
      </Card>

      <div className="space-y-3">
        <TransactionItem
          title="Arrival at Hometown Bank"
          subtitle="ATM"
          amount="-$300.00"
          icon={<Building2 className="h-5 w-5" />}
        />

        <TransactionItem
          title="Order #00123"
          subtitle="Dec 14 · Deposit"
          amount="$248.50"
          icon={<div className="text-xs font-bold">WIX</div>}
        />

        <TransactionItem
          title="Lemon Tax Software"
          subtitle="Dec 14 · Debit Card"
          amount="-$163.75"
          icon={<div className="rounded bg-[#0070F3] p-2">🍋</div>}
          iconBg="bg-[#0070F3]"
        />

        <TransactionItem
          title="10 MINT Contractors"
          subtitle="Dec 12 · Bank transfer"
          amount="-$450.00"
          icon={<Building2 className="h-5 w-5 text-green-600" />}
          iconBg="bg-green-50"
        />
      </div>

      <div className="mt-6 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-black text-white hover:bg-black/90 hover:text-white">
          Bank account
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          Debit card
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          Instant deposits
        </Button>
      </div>
    </aside>
  )
}

function TransactionItem({
  title,
  subtitle,
  amount,
  icon,
  iconBg = "bg-muted",
}: {
  title: string
  subtitle: string
  amount: string
  icon: React.ReactNode
  iconBg?: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-card p-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded ${iconBg}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="font-semibold text-sm">{amount}</div>
    </div>
  )
}
