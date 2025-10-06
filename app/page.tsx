'use client'

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { FinancialDashboard } from "@/components/financial-dashboard"
import { CapitalContent } from "@/components/capital-content"
import { WixCapitalLanding } from "@/components/wix-capital-landing"

export default function WixDashboard() {
  const [currentView, setCurrentView] = useState<'landing' | 'checking' | 'capital'>('checking')

  const handleGetStarted = () => {
    setCurrentView('checking')
  }

  const handleNavigateToCapital = () => {
    setCurrentView('capital')
  }

  const handleBackToChecking = () => {
    setCurrentView('checking')
  }

  // Show landing page
  if (currentView === 'landing') {
    return <WixCapitalLanding onGetStarted={handleGetStarted} />
  }

  // Show capital page
  if (currentView === 'capital') {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onNavigateToCapital={handleNavigateToCapital} currentView={currentView} />
          <CapitalContent onBack={handleBackToChecking} />
        </div>
      </div>
    )
  }

  // Show checking account UI (default)
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onNavigateToCapital={handleNavigateToCapital} currentView={currentView} />
        <MainContent />
        <FinancialDashboard />
      </div>
    </div>
  )
}
