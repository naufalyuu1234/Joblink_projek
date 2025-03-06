import { useEffect } from 'react';
import {Bookmark, Share2, MapPin, Calendar, Clock, CreditCard, Building, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MainLayout from '@/components/layouts/MainLayout';

const JobDetail = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <MainLayout>
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div 
        className="flex items-center text-sm mb-6" 
        data-aos="fade-right"
      >
        <Link to="/" className="text-gray-500 hover:text-blue-600">Beranda</Link>
        <span className="mx-2">/</span>
        <Link to="/jobs" className="text-gray-500 hover:text-blue-600">Lowongan</Link>
        <span className="mx-2">/</span>
        <span className="text-blue-600 font-medium">Admin Kantor</span>
      </div>

      {/* Job Header */}
      <div 
        className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b]" 
        data-aos="fade-up"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gray-100 rounded-lg p-3 mr-4">
                <img src="/company.png" alt="PT. Bridgestone" className="w-14 h-14 object-contain" />
              </div>
              <div>
                <h1 className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-center text-xs mb-6">Admin Kantor</h1>
                <p className="text-blue-600 flex items-center">
                  <Building size={16} className="mr-4" />
                  PT. Bridgestone indonesia
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center">
                <Bookmark size={18} className="mr-2" />
                Simpan
              </button>
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center">
                <Share2 size={18} className="mr-2" />
                Bagikan
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MapPin className="text-gray-400 mr-2" size={18} />
              <span className='px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full'>Jakarta Selatan</span>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-400 mr-2" size={18} />
              <span className='px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full'>Full Time</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-gray-400 mr-2" size={18} />
              <span className='px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full'>Min 8-5 (Senin-Jumat)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Job Description */}
        <div className="lg:col-span-2">
          <div 
            className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b]" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            <h2 className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-center text-xs mb-6">Deskripsi Pekerjaan</h2>
            <p className="text-black dark:text-white mb-4">
              Mengelola administrasi umum perusahaan (absensi, surat-surat, dan perpajakan), komunikasi fasilitasi untuk kebutuhan internal maupun fasilitas lainnya.
            </p>
            
            <h3 className="font-semibold text-black dark:text-white mt-6 mb-3">Tanggung Jawab:</h3>
            <ul className="list-disc list-inside text-dark dark:text-white space-y-2">
              <li>Mengontrol dokumen dan arsip perusahaan</li>
              <li>Input data ke sistem</li>
              <li>Mengelola dan menjadwalkan rapat harian</li>
              <li>Berkoordinasi dengan bagian administrasi</li>
            </ul>
            
            <h3 className="font-semibold text-dark dark:text-white mt-6 mb-3">Kualifikasi:</h3>
            <ul className="list-disc list-inside text-black dark:text-white space-y-2">
              <li>Pendidikan min. D3/S1</li>
              <li>Pengalaman min. 1 tahun</li>
              <li>Mahir MS Office</li>
              <li>Kemampuan komunikasi baik</li>
            </ul>
            
            <h3 className="font-semibold text-dark dark:text-white mt-6 mb-3">Fasilitas:</h3>
            <ul className="list-disc list-inside text-black dark:text-white space-y-2">
              <li>Gaji kompetitif (UMR+benefit) disesuaikan</li>
              <li>Asuransi kesehatan</li>
              <li>Tunjangan kehadiran dan berbagai insentif</li>
              <li>BPJS Kesehatan & Ketenagakerjaan</li>
            </ul>
          </div>
          
          <div 
            className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] mt-6" 
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            <h2 className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-dark dark:text-white rounded-full text-center text-xs mb-6">Persyaratan Dokumen</h2>
            <div className="space-y-3">
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className='text-ms font-semibold text-blue-600 dark:text-blue-400'>CV Terbaru</span>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className='text-ms font-semibold text-blue-600 dark:text-blue-400'>Surat Lamaran</span>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className='text-ms font-semibold text-blue-600 dark:text-blue-400'>Ijazah dan Transkrip Nilai</span>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className='text-ms font-semibold text-blue-600 dark:text-blue-400'>Sertifikat Pendukung (jika ada)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Profile & Apply */}
        <div className="lg:col-span-1 ">
          <div 
            className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] " 
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            <h2 className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-dark dark:text-white rounded-full text-center text-xs mb-6">Tentang Perusahaan</h2>
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 rounded-lg p-3 mr-3">
                <img src="/company.png" alt="PT. Maju Bersama" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-semibold">PT. Bridgestone Indonesia</h3>
                <p className="text-sm text-gray-500">Teknologi Informasi</p>
              </div>
            </div>
            <p className="text-black dark:text-white text-sm">
            PT. Bridgestone adalah perusahaan global yang bergerak di bidang manufaktur ban dan produk karet lainnya. Kami berkomitmen untuk menyediakan solusi transportasi yang aman dan berkelanjutan melalui inovasi teknologi dan kualitas produk unggulan. Sebagai perusahaan yang berorientasi pada keberlanjutan, PT. Bridgestone menciptakan lingkungan kerja yang mendukung pengembangan keterampilan, keberagaman, dan tanggung jawab sosial.
            </p>
          </div>
          
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-md p-6 text-white mt-6" 
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            <h2 className="text-xl font-bold mb-2">Tertarik Bergabung?</h2>
            <p className="mb-6 opacity-90">Kirim lamaran Anda sekarang dan mulai perjalanan karir Anda bersama kami.</p>
            
            <button className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors mb-3 flex items-center justify-center">
              <FileText size={18} className="mr-2" />
              Lihat Profil Perusahaan
            </button>
            
            <button className="w-full bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center">
              Lamar Sekarang
            </button>
          </div>
          
          <div 
            className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] mt-9" 
            data-aos="fade-up" 
            data-aos-delay="500"
          >
            <h2 className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-dark dark:text-white rounded-full text-center text-xs mb-6">Lowongan Terkait</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-semibold">Marketing Executive</h3>
                <p className="text-sm text-gray-500">PT. Bridgestone Indonesia</p>
                <div className="flex items-center mt-2 text-sm">
                  <MapPin className="text-gray-400 mr-1" size={14} />
                  <span className="text-gray-500 mr-3">Jakarta</span>
                  <CreditCard className="text-gray-400 mr-1" size={14} />
                  <span className="text-gray-500">Rp 5-7 juta</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer">
                <h3 className="font-semibold">Customer Service</h3>
                <p className="text-sm text-gray-500">PT. Bridgestone Indonesia</p>
                <div className="flex items-center mt-2 text-sm">
                  <MapPin className="text-gray-400 mr-1" size={14} />
                  <span className="text-gray-500 mr-3">Jakarta</span>
                  <CreditCard className="text-gray-400 mr-1" size={14} />
                  <span className="text-gray-500">Rp 4-6 juta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default JobDetail;