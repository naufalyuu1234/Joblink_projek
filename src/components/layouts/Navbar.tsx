import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="text-lg font-bold text-gray-800">
            Logo
          </a>
          <button
            className="md:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Beranda
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Tentang
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Kontak
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}