import { useState, useRef, useEffect } from 'react'
import MainLayout from '@/components/layouts/MainLayout'
import { BsMic } from 'react-icons/bs'
import { FaRobot, FaUser } from 'react-icons/fa'
import { useOpenAI } from '@/hooks/useOpenAI'
import { useJobs } from '@/hooks/useJobs'

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Recommendation {
  id: string;
  title: string;
  company: string;
  type: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya asisten karir inklusif yang siap membantu Anda menemukan pekerjaan yang sesuai. Ceritakan tentang keahlian dan kebutuhan Anda!'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, loading: aiLoading } = useOpenAI();
  const { jobs, loading: jobsLoading } = useJobs();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || aiLoading || jobsLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      console.log('Sending jobs data to AI:', jobs); // Debug log
      const response = await generateResponse(userMessage, jobs);
      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
        setRecommendations(response.recommendations || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.' 
      }]);
    }
  };

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
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2c47] rounded-full flex-shrink-0 flex items-center justify-center">
                        <FaRobot className="w-4 h-4 text-gray-600 dark:text-white" />
                      </div>
                    )}
                    <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'ml-auto' : ''}`}>
                      <div className={`rounded-2xl p-4 ${
                        message.role === 'user' 
                          ? 'bg-blue-50 dark:bg-blue-600/20' 
                          : 'bg-gray-100 dark:bg-[#2a2c47]'
                      }`}>
                        <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-100 dark:bg-[#2a2c47] rounded-full flex-shrink-0 flex items-center justify-center">
                        <FaUser className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={jobsLoading ? "Memuat data pekerjaan..." : "Ketik pesan Anda..."}
                    className="w-full px-4 py-3 pr-12 bg-white dark:bg-[#2a2c47] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={aiLoading || jobsLoading}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="Voice input"
                    disabled={aiLoading || jobsLoading}
                  >
                    <BsMic className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Job Recommendations */}
          <div className="bg-white dark:bg-[#22243b] rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="font-semibold mb-3 text-gray-900 dark:text-white">Rekomendasi Pekerjaan Inklusif</h2>
            <div className="space-y-3">
              {recommendations.map((job) => (
                <div 
                  key={job.id}
                  className="p-3 bg-gray-50 dark:bg-[#2a2c47] rounded-lg hover:bg-gray-100 dark:hover:bg-[#31334d] transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {job.company} • {job.type}
                  </p>
                </div>
              ))}
              {recommendations.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ceritakan kebutuhan Anda untuk mendapatkan rekomendasi pekerjaan yang sesuai.
                </p>
              )}
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
