import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/src/assets/7.png" alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-lg font-bold text-gray-800">JobLink</span>
            </Link>
          </div>

          {/* Menu Tengah */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-600 hover:text-gray-900">
                Jobs
              </Link>
              <Link to="/companies" className="text-gray-600 hover:text-gray-900">
                Companies
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Home
              </Link>
              <Link 
                to="/jobs"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Jobs
              </Link>
              <Link 
                to="/companies"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Companies
              </Link>
              <Link 
                to="/profile"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Profile
              </Link>
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 text-center bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}