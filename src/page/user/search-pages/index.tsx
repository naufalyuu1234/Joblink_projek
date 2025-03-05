import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaWheelchair, FaSignLanguage, FaUniversalAccess } from 'react-icons/fa';
import MainLayout from '@/components/layouts/MainLayout';
import { useJobs } from '@/hooks/useJobs';
import { Link } from "react-router-dom";

// Definisikan interface untuk Job
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  disability_support: string[];
  created_at: string;
}

export default function SearchPages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs, loading, fetchJobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');

  // Function untuk mendapatkan icon berdasarkan disability support
  const getJobIcon = (support: string[]) => {
    if (support.includes('Wheelchair Accessible')) {
      return <FaWheelchair className="text-blue-600 text-2xl" />;
    } else if (support.includes('Sign Language Support')) {
      return <FaSignLanguage className="text-green-600 text-2xl" />;
    }
    return <FaUniversalAccess className="text-purple-600 text-2xl" />;
  };

  const handleSearch = () => {
    // Update URL params
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (locationFilter) params.append('location', locationFilter);
    setSearchParams(params);

    // Fetch jobs
    fetchJobs({
      title: searchTerm,
      location: locationFilter
    });
  };

  // const resetFilters = () => {
  //   setSearchTerm('');
  //   setLocationFilter('');
  //   setSearchParams({});
  //   fetchJobs();
  // };

  // Initial fetch jobs dan search berdasarkan URL params
  useEffect(() => {
    if (searchParams.get('search') || searchParams.get('location')) {
      // Jika ada parameter search, gunakan itu
      fetchJobs({
        title: searchParams.get('search') || undefined,
        location: searchParams.get('location') || undefined
      });
    } else {
      // Jika tidak ada parameter search, fetch semua jobs
      fetchJobs();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Jalankan sekali saat mount

   
  // function navLinkClass(): string | undefined {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
            {searchTerm || locationFilter ? 'Hasil Pencarian' : 'Semua Lowongan'}
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Keahlian atau Posisi"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Lokasi"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:text-white"
              />
              <button 
                onClick={handleSearch}
                className="px-6 py-3 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                Cari Pekerjaan
              </button>
            </div>
            {/* <div className="flex justify-end">
              <button 
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:text-white"
              >
                🛠 Reset Filter
              </button>
            </div> */}
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-600 dark:text-gray-300">Tidak ada pekerjaan yang sesuai dengan kriteria pencarian.</p>
              </div>
            ) : (
              jobs.map((job: Job) => (
                <div key={job.id} className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    {getJobIcon(job.disability_support)}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{job.title}</h2>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">{job.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{job.location} • {job.type}</p>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">{job.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.disability_support.map((support, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
                          >
                            {support}
                          </span>
                        ))}
                      </div>
                      <button className="mt-3 px-4 py-2 border rounded-md w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-black dark:text-white font-bold dark:border-gray-600">
                      <Link to={`/detail/penjahit`}>
                          <button>
                            lihat detail
                          </button>
                      </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
