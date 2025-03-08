import { useEffect } from 'react';
import {Bookmark, Share2, MapPin, Calendar, Clock, CreditCard, Building, CheckCircle, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MainLayout from '@/components/layouts/MainLayout';
import { useJobDetail } from '@/hooks/useJobDetail';
import { useJobs } from '@/hooks/useJobs';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { job, loading, error } = useJobDetail(id || '');
  const { jobs } = useJobs();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Tambahkan skeleton loading di sini */}
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !job) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            {error || 'Pekerjaan tidak ditemukan'}
          </div>
        </div>
      </MainLayout>
    );
  }

  // Destructure job data with default values
  const {
    title = '',
    company = '',
    location = '',
    type = '',
    description = '',
    disability_support = [],
    requirements = null,
    responsibilities = null,
    benefits = null,
    company_description = '',
  } = job || {};

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
        <span className="text-blue-600 font-medium">{title}</span>
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
                <img src="https://images.unsplash.com/photo-1595798896730-9fdf2e709649?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={company} className="w-14 h-14 object-contain" />
              </div>
              <div>
                <h1 className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-center text-xs mb-6">{title}</h1>
                <p className="text-blue-600 flex items-center">
                  <Building size={16} className="mr-4" />
                  {company}
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
              <span className='px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full'>{location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-400 mr-2" size={18} />
              <span className='px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full'>{type}</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-gray-400 mr-2" size={18} />
              <span className='px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full'>8 Hours</span>
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
              {description}
            </p>
            
            {/* Render Responsibilities section only if data exists */}
            {responsibilities && responsibilities.length > 0 && (
              <>
                <h3 className="font-semibold text-black dark:text-white mt-6 mb-3">Tanggung Jawab:</h3>
                <ul className="list-disc list-inside text-dark dark:text-white space-y-2">
                  {responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </>
            )}
            
            {/* Render Requirements section only if data exists */}
            {requirements && requirements.length > 0 && (
              <>
                <h3 className="font-semibold text-dark dark:text-white mt-6 mb-3">Kualifikasi:</h3>
                <ul className="list-disc list-inside text-black dark:text-white space-y-2">
                  {requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </>
            )}
            
            {/* Render Benefits section only if data exists */}
            {benefits && benefits.length > 0 && (
              <>
                <h3 className="font-semibold text-dark dark:text-white mt-6 mb-3">Fasilitas:</h3>
                <ul className="list-disc list-inside text-black dark:text-white space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Add Disability Support section */}
            {disability_support && disability_support.length > 0 && (
              <>
                <h3 className="font-semibold text-dark dark:text-white mt-6 mb-3">Dukungan Disabilitas:</h3>
                <ul className="list-disc list-inside text-black dark:text-white space-y-2">
                  {disability_support.map((support, index) => (
                    <li key={index}>{support}</li>
                  ))}
                </ul>
              </>
            )}
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
                <img src="https://images.unsplash.com/photo-1595798896730-9fdf2e709649?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={company} className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-semibold">{company}</h3>
                <p className="text-sm text-gray-500">Teknologi Informasi</p>
              </div>
            </div>
            <p className="text-black dark:text-white text-sm">
            {company_description}
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
              {jobs
                .filter(relatedJob => relatedJob.id !== id)
                .slice(0, 2)
                .map((relatedJob) => (
                  <Link 
                    to={`/detail/${relatedJob.id}`} 
                    key={relatedJob.id}
                    className="block border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold">{relatedJob.title}</h3>
                    <p className="text-sm text-gray-500">{relatedJob.company}</p>
                    <div className="flex items-center mt-2 text-sm">
                      <MapPin className="text-gray-400 mr-1" size={14} />
                      <span className="text-gray-500 mr-3">{relatedJob.location}</span>
                      <CreditCard className="text-gray-400 mr-1" size={14} />
                      <span className="text-gray-500">Rp 4-6 juta</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default JobDetail;