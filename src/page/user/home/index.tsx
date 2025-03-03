import React, { useRef } from 'react'
import { BsBriefcase, BsBuilding, BsBook, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaWheelchair, FaSignLanguage, FaUniversalAccess } from 'react-icons/fa'
import MainLayout from '@/components/layouts/MainLayout'

export default function HomePage() {
  const videoScrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const scrollAmount = 300
      videoScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <MainLayout>
      <div className="space-y-12 dark:bg-[#1a1b2e]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-3xl font-bold mb-3 dark:text-white">Temukan Pekerjaan Inklusif</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Platform khusus yang menghubungkan talenta difabel dengan perusahaan inklusif
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Keahlian atau Posisi"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              placeholder="Lokasi"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:text-white"
            />
            <button className="px-6 py-3 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
              Cari Pekerjaan
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#22243b] hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <div className="mb-4">
                <FaWheelchair className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Pekerjaan Ramah Difabel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Temukan perusahaan dengan fasilitas dan lingkungan kerja yang aksesibel
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#22243b] hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <div className="mb-4">
                <FaSignLanguage className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Dukungan Komunikasi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tersedia interpreter bahasa isyarat untuk proses rekrutmen
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#22243b] hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <div className="mb-4">
                <FaUniversalAccess className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Pelatihan Keterampilan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Akses ke program pengembangan skill dan sertifikasi
              </p>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section>
          <h2 className="text-xl font-bold mb-4 dark:text-white">Lowongan Terbaru</h2>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-[#22243b]">
            <div className="mb-3">
              <h3 className="font-semibold text-lg dark:text-white">Customer Service Representative</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">InclusiveCorp Indonesia</p>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm rounded-full">
                Work From Home
              </span>
              <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm rounded-full">
                Full-time
              </span>
              <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm rounded-full">
                Ramah Tuna Rungu
              </span>
            </div>
            <button className="w-full py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white">
              Selengkapnya
            </button>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold dark:text-white">Video Panduan Karir</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white"
              >
                <BsChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white"
              >
                <BsChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div 
            ref={videoScrollRef}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
          >
            {[
              { title: "Tips Wawancara Kerja", category: "Panduan Karir" },
              { title: "Menulis CV yang Menarik", category: "Tutorial" },
              { title: "Hak-Hak Pekerja Difabel", category: "Informasi" },
              { title: "Adaptasi di Tempat Kerja", category: "Pengalaman" },
              { title: "Pengembangan Soft Skills", category: "Tutorial" }
            ].map((video, index) => (
              <div key={index} className="flex-none w-[300px]">
                <div className="aspect-video bg-gray-100 dark:bg-[#22243b] rounded-lg mb-3"></div>
                <h3 className="font-semibold mb-1 dark:text-white">{video.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{video.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Kisah Sukses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-[#22243b]">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                "JobLinks membantu saya menemukan perusahaan yang benar-benar menghargai kemampuan saya, bukan keterbatasan saya."
              </p>
              <div>
                <p className="font-semibold dark:text-white">Ahmad R.</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">UI/UX Designer</p>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-[#22243b]">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                "Platform ini memberikan kesempatan yang sama bagi semua orang. Saya merasa dihargai dan didukung dalam karir saya."
              </p>
              <div>
                <p className="font-semibold dark:text-white">Siti M.</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Data Analyst</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
