import { Search, MessageSquare, Bell, Megaphone, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>WIX</span>
        </div>

        <Button variant="ghost" className="gap-1 text-sm">
          Supreme Inc.
          <ChevronDown className="h-4 w-4" />
        </Button>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" className="gap-1 text-sm">
            Explore
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="gap-1 text-sm">
            Help
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-sm">
            Hire a Professional
          </Button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-muted/50" />
        </div>

        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Megaphone className="h-5 w-5" />
        </Button>

        <Button variant="ghost" className="gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JJ</AvatarFallback>
          </Avatar>
          <span className="text-sm">James Jebbia</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
