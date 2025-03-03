import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      navigate('/login', { 
        state: { 
          message: 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.' 
        }
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1569937728357-4971c45997c0?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">JobLink</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Bergabunglah dengan komunitas JobLink dan temukan peluang karir yang sesuai dengan potensi Anda. Kami menghubungkan talenta difabel dengan perusahaan-perusahaan yang menghargai keberagaman.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  JobLink
                </Link>
              </div>
              <h2 className="text-3xl font-bold text-gray-700">
                Buat Akun Baru
              </h2>
              <p className="mt-3 text-gray-500">
                Mulai perjalanan karir Anda bersama JobLink
              </p>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-8">
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-gray-600">Daftar dengan Google</span>
              </button>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">atau</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Masukkan email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Masukkan password"
                  />
                </div>

                <div className="mt-6">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Mendaftar...' : 'Daftar'}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-500">
                Sudah memiliki akun?{" "}
                <Link
                  to="/login"
                  className="text-black font-medium hover:underline"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
