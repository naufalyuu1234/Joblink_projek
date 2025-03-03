import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#22243b] border-t border-gray-700">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">JobLink</h3>
            <p className="text-gray-300">
              Platform yang menghubungkan talenta difabel dengan perusahaan inklusif
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white">
                  Karir
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white">
                  Cari Pekerjaan
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white">
                  Perusahaan
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-gray-300 hover:text-white">
                  Pelatihan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  Privasi
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 JobLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 