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
      <div className="space-y-12">
        {/* Hero Section */}
        <section>
          <h1 className="text-3xl font-bold mb-3">Temukan Pekerjaan Inklusif</h1>
          <p className="text-gray-600 mb-6">Platform khusus yang menghubungkan talenta difabel dengan perusahaan inklusif</p>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Keahlian atau Posisi"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Lokasi"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Cari Pekerjaan
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <FaWheelchair className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Pekerjaan Ramah Difabel</h3>
              <p className="text-sm text-gray-600">Temukan perusahaan dengan fasilitas dan lingkungan kerja yang aksesibel</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <FaSignLanguage className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Dukungan Komunikasi</h3>
              <p className="text-sm text-gray-600">Tersedia interpreter bahasa isyarat untuk proses rekrutmen</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="mb-4">
                <FaUniversalAccess className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Pelatihan Keterampilan</h3>
              <p className="text-sm text-gray-600">Akses ke program pengembangan skill dan sertifikasi</p>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section>
          <h2 className="text-xl font-bold mb-4">Lowongan Terbaru</h2>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="mb-3">
              <h3 className="font-semibold text-lg">Customer Service Representative</h3>
              <p className="text-gray-600 text-sm">InclusiveCorp Indonesia</p>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">Work From Home</span>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">Full-time</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full">Ramah Tuna Rungu</span>
            </div>
            <button className="w-full py-2 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Selengkapnya
            </button>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Video Panduan Karir</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
              >
                <BsChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
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
                <div className="aspect-video bg-gray-100 rounded-lg mb-3"></div>
                <h3 className="font-semibold mb-1">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Kisah Sukses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm mb-4">"JobLinks membantu saya menemukan perusahaan yang benar-benar menghargai kemampuan saya, bukan keterbatasan saya."</p>
              <div>
                <p className="font-semibold">Ahmad R.</p>
                <p className="text-gray-600 text-sm">UI/UX Designer</p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm mb-4">"Platform ini memberikan kesempatan yang sama bagi semua orang. Saya merasa dihargai dan didukung dalam karir saya."</p>
              <div>
                <p className="font-semibold">Siti M.</p>
                <p className="text-gray-600 text-sm">Data Analyst</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
