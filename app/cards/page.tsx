'use client'

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CardsContent } from "@/components/cards-content"
import { useRouter } from "next/navigation"

export default function CardsPage() {
  const router = useRouter()

  const handleNavigateToCapital = () => {
    router.push('/capital')
  }

  const handleNavigateToChecking = () => {
    router.push('/')
  }

  const handleNavigateToFinancialAccount = () => {
    router.push('/financial-account')
  }

  const handleNavigateToCards = () => {
    router.push('/cards')
  }

  const handleBackToChecking = () => {
    router.push('/')
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onNavigateToCapital={handleNavigateToCapital}
          onNavigateToChecking={handleNavigateToChecking}
          onNavigateToFinancialAccount={handleNavigateToFinancialAccount}
          onNavigateToCards={handleNavigateToCards}
          currentView="cards"
        />
        <CardsContent onBack={handleBackToChecking} />
      </div>
    </div>
  )
}
