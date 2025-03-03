import { FaWheelchair, FaSignLanguage, FaUniversalAccess } from 'react-icons/fa';
import MainLayout from '@/components/layouts/MainLayout';

export default function SearchPages() {
  const jobList = [
    {
      id: 1,
      title: 'Admin Kantor',
      company: 'PT Maju Bersama',
      location: 'Jakarta Selatan',
      type: 'Full-time',
      salary: 'Rp 4-5 Jt',
      description:
        'Dibutuhkan admin untuk mengelola dokumen, input data, dan menerima telepon. Lingkungan kerja ramah disabilitas dengan fasilitas lengkap.',
      icon: <FaWheelchair className="text-blue-600 text-2xl" />,
    },
    {
      id: 2,
      title: 'Kasir Mini Market',
      company: 'Minimart Sejahtera',
      location: 'Jakarta Timur',
      type: 'Part-time',
      salary: 'Rp 2-3 Jt',
      description:
        'Lowongan untuk posisi kasir. Tersedia kursi khusus dan meja kasir yang disesuaikan. Pelatihan diberikan. fasilitas lengkap dan nyaman.',
      icon: <FaSignLanguage className="text-green-600 text-2xl" />,
    },
    {
      id: 3,
      title: 'Customer Service',
      company: 'Sinar Nasional Indonesia',
      location: 'Jakarta Pusat',
      type: 'Full-time',
      salary: 'Rp 3-4 Jt',
      description:
        'Melayani pelanggan via telepon dan email. Tersedia pelatihan khusus serta teknologi yang dapat disesuaikan, Tersedia mesh dan makan siang.',
      icon: <FaUniversalAccess className="text-purple-600 text-2xl" />,
    },
    {
      id: 4,
      title: 'Petugas Kebersihan',
      company: 'Mall Central Jakarta',
      location: 'Jakarta Pusat',
      type: 'Full-time',
      salary: 'Rp 2,5-3,5 Jt',
      description:
        'Membersihkan area mall dan fasilitas umum. Peralatan modern dan ringan, ideal untuk disabilitas, kami memfasilitasi kursi roda untuk pengelaman kerja yang lebih baik lagi.',
      icon: <FaWheelchair className="text-red-600 text-2xl" />,
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Hasil Pencarian</h1>
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
        <div className="flex justify-end mb-4">
          <button className="border px-4 py-2 rounded-md hover:bg-gray-100 transition-all">🛠 Reset Filter</button>
        </div>
        {/* Daftar Pekerjaan */}
        <div className="space-y-4">
          {jobList.map((job) => (
            <div key={job.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#22243b] hover:border-gray-300 dark:hover:border-gray-600 transition-colors   ">
              {job.icon}
              <div>
                <h2 className="text-xl font-semibold text-blue-500">{job.title}</h2>
                <p className="text-white font-medium">{job.company}</p>
                <p className="text-sm text-white">{job.location} • {job.type} • {job.salary}</p>
                <p className="mt-2 text-white">{job.description}</p>
                <button className="mt-3 px-4 py-2 border rounded-md w-full hover:bg-gray-500 transition-all text-white font-bold">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
