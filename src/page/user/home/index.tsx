import { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaWheelchair, FaSignLanguage, FaUniversalAccess } from 'react-icons/fa'
import MainLayout from '@/components/layouts/MainLayout'
import { useVideos } from '@/hooks/useVideos'
import { getYoutubeVideoId } from '@/hooks/useVideos'
import { useSuccessStories } from '@/hooks/useSuccessStories'
import { motion } from 'framer-motion';
import AOS from 'aos';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoScrollRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  const { videos, loading } = useVideos()
  const { stories, loading: storiesLoading } = useSuccessStories()

  // Effect untuk mengecek parameter code
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    if (code) {
      // Redirect ke halaman login
      navigate('/login', { 
        state: { 
          message: 'Akun berhasil diaktivasi! Silakan login untuk melanjutkan.' 
        }
      });
    }
  }, [location, navigate]);

  // Effect untuk AOS tetap sama
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      delay: 100,
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (searchTerm) searchParams.append('search', searchTerm);
    if (locationTerm) searchParams.append('location', locationTerm);
    
    navigate({
      pathname: '/jobs',
      search: searchParams.toString()
    });
  };

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
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-3xl font-bold mb-3 dark:text-white">Temukan Pekerjaan Inklusif</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Platform khusus yang menghubungkan talenta disabilitas dengan perusahaan inklusif
          </p>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Keahlian atau Posisi"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              placeholder="Lokasi"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:text-white"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Cari Pekerjaan
            </button>
          </form>

          {/* Feature Cards */}
          <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-aos="zoom-in"
          >
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#22243b] hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <div className="mb-4">
                <FaWheelchair className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">Pekerjaan Ramah Disabilitas</h3>
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
        </motion.div>

        {/* Featured Jobs */}
        <section 
          data-aos="fade-up">
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
        <section
        data-aos="fade-left">
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
            {loading ? (
              <div className="flex-none w-[300px] aspect-video bg-gray-100 dark:bg-[#22243b] rounded-lg animate-pulse" />
            ) : (
              videos.map((video) => (
                <div key={video.id} className="flex-none w-[300px]">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.video_url)}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="font-semibold mb-1 dark:text-white">{video.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{video.category}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Success Stories */}
        <section 
        className="mb-8"
        data-aos="fade-up"
        >
          <h2 className="text-xl font-bold mb-4 dark:text-white">Kisah Sukses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storiesLoading ? (
              <>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-[#22243b] animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-[#22243b] animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </>
            ) : (
              stories.slice(0, 2).map((story) => (
                <div key={story.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-[#22243b]">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={story.avatar_url} 
                      alt={story.full_name} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold dark:text-white">{story.full_name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {story.role} • {story.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{story.story}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm rounded-full">
                      {story.disability_type}
                    </span>
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm rounded-full">
                      {story.years_of_experience}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
