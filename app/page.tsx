'use client'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { FinancialDashboard } from "@/components/financial-dashboard"
import { CapitalContent } from "@/components/capital-content"
import { FinancialAccountContent } from "@/components/financial-account-content"
import { CardsContent } from "@/components/cards-content"
import { WixCapitalLanding } from "@/components/wix-capital-landing"

export default function WixDashboard() {
  // Initialize state based on URL path
  const getInitialView = (): 'landing' | 'checking' | 'capital' | 'financial-account' | 'cards' => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path === '/financial-account') return 'financial-account'
      if (path === '/cards') return 'cards'
      if (path === '/capital') return 'capital'
      if (path === '/landing') return 'landing'
    }
    return 'checking'
  }

  const [currentView, setCurrentView] = useState<'landing' | 'checking' | 'capital' | 'financial-account' | 'cards'>(getInitialView)

  const handleGetStarted = () => {
    setCurrentView('checking')
  }

  const handleNavigateToCapital = () => {
    setCurrentView('capital')
  }

  const handleNavigateToChecking = () => {
    setCurrentView('checking')
  }

  const handleBackToChecking = () => {
    setCurrentView('checking')
  }

  const handleNavigateToFinancialAccount = () => {
    setCurrentView('financial-account')
  }

  const handleNavigateToCards = () => {
    setCurrentView('cards')
  }

  // Update URL based on current view
  useEffect(() => {
    let path = ''
    if (currentView === 'financial-account') path = '/financial-account'
    else if (currentView === 'cards') path = '/cards'
    else if (currentView === 'capital') path = '/capital'

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path || '/')
    }
  }, [currentView])

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
          <Sidebar
            onNavigateToCapital={handleNavigateToCapital}
            onNavigateToChecking={handleNavigateToChecking}
            onNavigateToFinancialAccount={handleNavigateToFinancialAccount}
            onNavigateToCards={handleNavigateToCards}
            currentView={currentView}
          />
          <CapitalContent onBack={handleBackToChecking} />
        </div>
      </div>
    )
  }

  // Show financial account page
  if (currentView === 'financial-account') {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            onNavigateToCapital={handleNavigateToCapital}
            onNavigateToChecking={handleNavigateToChecking}
            onNavigateToFinancialAccount={handleNavigateToFinancialAccount}
            onNavigateToCards={handleNavigateToCards}
            currentView={currentView}
          />
          <FinancialAccountContent onBack={handleBackToChecking} />
        </div>
      </div>
    )
  }

  // Show cards page
  if (currentView === 'cards') {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            onNavigateToCapital={handleNavigateToCapital}
            onNavigateToChecking={handleNavigateToChecking}
            onNavigateToFinancialAccount={handleNavigateToFinancialAccount}
            onNavigateToCards={handleNavigateToCards}
            currentView={currentView}
          />
          <CardsContent onBack={handleBackToChecking} />
        </div>
      </div>
    )
  }

  // Show checking account UI (default)
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onNavigateToCapital={handleNavigateToCapital}
          onNavigateToChecking={handleNavigateToChecking}
          onNavigateToFinancialAccount={handleNavigateToFinancialAccount}
          onNavigateToCards={handleNavigateToCards}
          currentView={currentView}
        />
        <MainContent />
        <FinancialDashboard />
      </div>
    </div>
  )
}
