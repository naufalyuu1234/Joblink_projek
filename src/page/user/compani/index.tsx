import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { MapPin, Users, Building, Star, Briefcase } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useJobs } from '@/hooks/useJobs';
import { Link } from 'react-router-dom';

interface CompanyInfo {
  name: string;
  jobCount: number;
  disabilitySupport: string[];
  location: string;
  latestJobs: {
    id: string;
    title: string;
    type: string;
  }[];
}

export default function Company() {
  const { jobs, loading } = useJobs();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Mengorganisir data jobs berdasarkan perusahaan
  const companyData = jobs.reduce<Record<string, CompanyInfo>>((acc, job) => {
    if (!acc[job.company]) {
      acc[job.company] = {
        name: job.company,
        jobCount: 0,
        disabilitySupport: [],
        location: job.location,
        latestJobs: []
      };
    }

    acc[job.company].jobCount += 1;
    acc[job.company].disabilitySupport = [
      ...new Set([...acc[job.company].disabilitySupport, ...job.disability_support])
    ];
    acc[job.company].latestJobs.push({
      id: job.id,
      title: job.title,
      type: job.type
    });

    return acc;
  }, {});

  // Data tambahan untuk setiap perusahaan (dummy data)
  const companyExtraInfo = {
    'Mantap Mart': {
      logo: 'https://placehold.co/200x200?text=MM',
      rating: 4.2,
      employeeCount: '500+ Disabilitas',
      industry: 'Retail'
    },
    'Hotel Harmoni': {
      logo: 'https://placehold.co/200x200?text=HH',
      rating: 4.5,
      employeeCount: '300+ Disabilitas',
      industry: 'Perhotelan'
    },
    'CustomerCare Indonesia': {
      logo: 'https://placehold.co/200x200?text=CCI',
      rating: 4.3,
      employeeCount: '1000+ Disabilitas',
      industry: 'Customer Service'
    },
    'SugarTaylor': {
      logo: 'https://placehold.co/200x200?text=ST',
      rating: 4.4,
      employeeCount: '100+ Disabilitas',
      industry: 'Fashion'
    },
    'SafeGuard Security': {
      logo: 'https://placehold.co/200x200?text=SGS',
      rating: 4.1,
      employeeCount: '750+ Disabilitas',
      industry: 'Keamanan'
    },
    'GreenClean Facility Services': {
      logo: 'https://placehold.co/200x200?text=GC',
      rating: 4.0,
      employeeCount: '200+ Disabilitas',
      industry: 'Facility Management'
    },
    'Inclusive Support Center': {
      logo: 'https://placehold.co/200x200?text=ISC',
      rating: 4.6,
      employeeCount: '400+ Disabilitas',
      industry: 'Customer Service'
    },
    'Resto Aksesibel': {
      logo: 'https://placehold.co/200x200?text=RA',
      rating: 4.3,
      employeeCount: '150+ Disabilitas',
      industry: 'Food & Beverage'
    },
    'Kopi Inklusif': {
      logo: 'https://placehold.co/200x200?text=KI',
      rating: 4.4,
      employeeCount: '80+ Disabilitas',
      industry: 'Food & Beverage'
    }
  } as const;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Perusahaan Ramah Disabilitas Terbaik
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan perusahaan-perusahaan terkemuka yang menyediakan lingkungan kerja inklusif, fasilitas yang mendukung, dan kesempatan berkarir yang setara bagi penyandang disabilitas
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-[#22243b] rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
            {Object.entries(companyData).map(([companyName, data]) => (
              <div 
                key={companyName}
                className="bg-white dark:bg-[#22243b] rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.logo} 
                      alt={companyName}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {companyName}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <Building size={16} />
                          {companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.industry}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.rating}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <MapPin size={16} />
                        {data.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Users size={16} />
                        {companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.employeeCount} Karyawan
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Briefcase size={16} />
                        {data.jobCount} Lowongan Terbuka
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lowongan Terbaru:</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.latestJobs.map(job => (
                          <Link 
                            key={job.id}
                            to={`/detail/${job.id}`}
                            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {job.title}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {data.disabilitySupport.slice(0, 3).map((support, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                          {support}
                        </span>
                      ))}
                      {data.disabilitySupport.length > 3 && (
                        <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          +{data.disabilitySupport.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}