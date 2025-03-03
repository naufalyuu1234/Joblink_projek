import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
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
                Kami percaya bahwa setiap individu memiliki potensi unik. JobLink hadir untuk menghubungkan talenta difabel dengan perusahaan-perusahaan inklusif yang menghargai keberagaman dan memberikan kesempatan yang setara.
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
                Selamat Datang Kembali
              </h2>
              <p className="mt-3 text-gray-500">
                Masuk untuk mengakses peluang karir yang sesuai dengan potensi Anda
              </p>
            </div>

            <div className="mt-8">
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-gray-600">Masuk dengan Google</span>
              </button>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">atau</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="nama@email.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Masukkan password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800">
                    Masuk
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-500">
                Belum memiliki akun?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium hover:underline"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
