import React from 'react'
import { Link } from 'react-router-dom'
import { BsChatDotsFill } from 'react-icons/bs'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#1a1b2e]">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-6 py-5">
          {children}
        </div>
      </main>
      <Footer />

      {/* Fixed Chat Button */}
      <Link 
        to="/assistant"
        className="fixed bottom-6 right-6 p-4 bg-[#22243b] hover:bg-[#2a2c47] text-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22243b] z-50"
        aria-label="Chat dengan AI Assistant"
      >
        <BsChatDotsFill className="w-6 h-6" />
      </Link>
    </div>
  )
}