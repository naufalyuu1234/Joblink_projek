import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '@/context/useTheme'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  const navLinkClass = (path: string) => {
    return `transition duration-300 ${
      isActivePath(path)
        ? 'text-white font-medium'
        : 'text-gray-300 hover:text-white'
    }`
  }

  return (
    <nav className="bg-[#22243b] border-b border-gray-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-lg font-bold text-white">JobLink</span>
            </Link>
          </div>

          {/* Menu Tengah */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link to="/" className={navLinkClass('/')}>
                Home
              </Link>
              <Link to="/jobs" className={navLinkClass('/jobs')}>
                Jobs
              </Link>
              <Link to="/companies" className={navLinkClass('/companies')}>
                Companies
              </Link>
              <Link to="/profile" className={navLinkClass('/profile')}>
                Profile
              </Link>
            </div>
          </div>

          {/* Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            <Link 
              to="/login"
              className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100"
            >
              Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
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
                className={`block px-3 py-2 rounded-md ${navLinkClass('/')}`}
              >
                Home
              </Link>
              <Link 
                to="/jobs"
                className={`block px-3 py-2 rounded-md ${navLinkClass('/jobs')}`}
              >
                Jobs
              </Link>
              <Link 
                to="/companies"
                className={`block px-3 py-2 rounded-md ${navLinkClass('/companies')}`}
              >
                Companies
              </Link>
              <Link 
                to="/profile"
                className={`block px-3 py-2 rounded-md ${navLinkClass('/profile')}`}
              >
                Profile
              </Link>
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center bg-white text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}