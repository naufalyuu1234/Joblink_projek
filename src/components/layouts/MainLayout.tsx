import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 lg:px-6 py-5">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}