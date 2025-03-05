import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">JobLink</h3>
            <p className="text-gray-600">Platform pencarian kerja terpercaya untuk menemukan pekerjaan impian Anda.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">Tentang Kami</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Kontak</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Karir</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Sumber Daya</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-600 hover:text-gray-900">Panduan</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Kebijakan Privasi</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© 2024 JobLink. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
} 