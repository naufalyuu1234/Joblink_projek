import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FaSun, FaMoon } from 'react-icons/fa'
import { FiX as FiLogOut, FiUser } from 'react-icons/fi'
import { useTheme } from '@/context/useTheme'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

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

  const handleLogout = async () => {
    try {
      await signOut()
      setShowDropdown(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <nav className="bg-[#22243b] border-b border-gray-700">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/src/assets/6.png"
                alt="JobLink"
                className="w-60 h-60 py-12"
                />
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
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata?.full_name || user.email}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <FiUser className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <span>{user.user_metadata?.full_name || user.email}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      Profil Saya
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <FiLogOut className="w-4 h-4" />
                        <span>Keluar</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
                {user ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          {user.user_metadata?.avatar_url ? (
                            <img
                              src={user.user_metadata.avatar_url}
                              alt={user.user_metadata?.full_name || user.email}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <FiUser className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                        <span>{user.user_metadata?.full_name || user.email}</span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block text-gray-300 hover:text-white px-3 py-2"
                    >
                      Profil Saya
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-gray-300 hover:text-white px-3 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <FiLogOut className="w-4 h-4" />
                        <span>Keluar</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}