import MainLayout from '@/components/layouts/MainLayout'
import { BsMic } from 'react-icons/bs'
import { FaRobot, FaUser } from 'react-icons/fa'

export default function AssistantPage() {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Chat Section */}
        <div className="flex-1">
          <div className="bg-white dark:bg-[#22243b] rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2c47] rounded-full flex-shrink-0 flex items-center justify-center">
                  <FaRobot className="w-4 h-4 text-gray-600 dark:text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Asisten Karir Inklusif</h1>
              </div>
            </div>

            {/* Chat Container */}
            <div className="p-4 h-[600px] flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* AI Message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2c47] rounded-full flex-shrink-0 flex items-center justify-center">
                    <FaRobot className="w-4 h-4 text-gray-600 dark:text-white" />
                  </div>
                  <div className="flex-1 max-w-[80%]">
                    <div className="bg-gray-100 dark:bg-[#2a2c47] rounded-2xl p-4">
                      <p className="text-gray-800 dark:text-gray-200">
                        Halo! Saya asisten karir inklusif yang siap membantu Anda menemukan pekerjaan yang sesuai. Apa yang bisa saya bantu?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex-1 max-w-[80%]">
                    <div className="bg-blue-50 dark:bg-blue-600/20 rounded-2xl p-4 ml-auto">
                      <p className="text-gray-800 dark:text-gray-200">
                        Saya ingin mencari pekerjaan yang ramah disabilitas
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2c47] rounded-full flex-shrink-0 flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2c47] rounded-full flex-shrink-0 flex items-center justify-center">
                    <FaRobot className="w-4 h-4 text-gray-600 dark:text-white" />
                  </div>
                  <div className="flex-1 max-w-[80%]">
                    <div className="bg-gray-100 dark:bg-[#2a2c47] rounded-2xl p-4">
                      <p className="text-gray-800 dark:text-gray-200 mb-3">
                        Saya akan membantu Anda menemukan pekerjaan yang inklusif. Mohon berikan:
                      </p>
                      <ol className="list-decimal ml-4 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Jenis pekerjaan yang diminati</li>
                        <li>Lokasi pekerjaan yang diinginkan</li>
                        <li>Akomodasi khusus yang diperlukan</li>
                        <li>Pengalaman/keterampilan yang dimiliki</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ketik pesan Anda..."
                    className="w-full px-4 py-3 pr-12 bg-white dark:bg-[#2a2c47] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="Voice input"
                  >
                    <BsMic className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Job Recommendations */}
          <div className="bg-white dark:bg-[#22243b] rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">Rekomendasi Pekerjaan Inklusif</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white">Customer Service (Work From Home)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">TechCorp & Support Division</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white">Admin Data Entry</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Remote & Hybrid Allowed</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white">Content Creator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Bekerja Secara Remote</p>
              </div>
            </div>
          </div>

          {/* Training Programs */}
          <div className="bg-white dark:bg-[#22243b] rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">Program Pelatihan</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white">Digital Marketing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Online Course</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white">Administrative Skills</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Dengan Pendampingan</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white">Customer Service Excellence</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Kelas Fleksibel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
