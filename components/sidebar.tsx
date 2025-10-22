import { ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  onNavigateToCapital?: () => void
  onNavigateToChecking?: () => void
  onNavigateToFinancialAccount?: () => void
  onNavigateToCards?: () => void
  currentView?: string
}

export function Sidebar({ onNavigateToCapital, onNavigateToChecking, onNavigateToFinancialAccount, onNavigateToCards, currentView }: SidebarProps) {
  return (
    <aside className="w-[260px] border-r bg-[#1F2937] text-white">
      <nav className="flex h-full flex-col p-4">
        <div className="flex-1 space-y-1">
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Booking Services
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Booking Calendar
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Inbox
            <Badge className="ml-auto bg-white/20 text-white">1</Badge>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Contacts
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Marketing & SEO
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Analytics & Reports
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>

          <div className="space-y-1 pt-1">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              Finances
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>

            <div className="ml-4 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Overview
              </Button>
              <Button
                variant="ghost"
                onClick={onNavigateToChecking}
                className={`w-full justify-start text-sm ${
                  currentView === 'checking'
                    ? 'bg-white/10 text-white hover:bg-white/15'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                Business Checking
                <Badge className="ml-auto bg-[#FFA500] text-white text-xs px-2">NEW</Badge>
              </Button>
              <Button
                variant="ghost"
                onClick={onNavigateToCapital}
                className={`w-full justify-start text-sm ${
                  currentView === 'capital'
                    ? 'bg-white/10 text-white hover:bg-white/15'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                Capital
              </Button>
              <Button
                variant="ghost"
                onClick={onNavigateToFinancialAccount}
                className={`w-full justify-start text-sm ${
                  currentView === 'financial-account'
                    ? 'bg-white/10 text-white hover:bg-white/15'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                Financial Account
              </Button>
              <Button
                variant="ghost"
                onClick={onNavigateToCards}
                className={`w-full justify-start text-sm ${
                  currentView === 'cards'
                    ? 'bg-white/10 text-white hover:bg-white/15'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                Cards
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Payments
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Price Quotes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Invoices
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Recurring Invoices
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Financial Integrations
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Payouts History
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-white/85 hover:bg-white/10 hover:text-white"
              >
                Documents & Reports
              </Button>
            </div>
          </div>

          <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
            Settings
          </Button>
        </div>

        <Button variant="ghost" className="w-full justify-start text-white/85 hover:bg-white/10 hover:text-white">
          <Zap className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
      </nav>
    </aside>
  )
}
