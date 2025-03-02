import React from 'react'
import Navbar from './Navbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}