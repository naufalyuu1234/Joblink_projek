import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Settings, LogOut, FileText, Briefcase, User } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

export default function Profile() {
    const [activeSection, setActiveSection] = useState('profile');

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-8"
                >
                    {/* Sidebar Profile */}
                    <aside className="w-full md:w-1/4 bg-white dark:bg-[#2c3049] rounded-2xl shadow-lg p-6 h-fit">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <img 
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" 
                                    alt="Profile"
                                    className='w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-lg'
                                />
                                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                                    <Edit2 size={16} />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-blue-900 dark:text-white">John Doe</h2>
                            <p className="text-gray-500 dark:text-gray-300">UI/UX Designer</p>
                        </div>
                        
                        {/* Sidebar Buttons */}
                        <div className="mt-8 space-y-4">
                            {[
                                { icon: User, label: 'Edit Profil', key: 'profile' },
                                { icon: Settings, label: 'Pengaturan', key: 'settings' },
                                { icon: LogOut, label: 'Keluar', key: 'logout', className: 'text-red-500' }
                            ].map((item) => (
                                <motion.button 
                                    key={item.key}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveSection(item.key)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                                        transition-all duration-300 
                                        ${activeSection === item.key 
                                            ? 'bg-blue-100 text-blue-700' 
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }
                                        ${item.className || ''}
                                    `}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>
                    </aside>
                    
                    {/* Profile Content */}
                    <section className="w-full md:w-3/4 space-y-8">
                        {/* Personal Information */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white dark:bg-[#2c3049] rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex items-center mb-6">
                                <User className="mr-3 text-blue-500" />
                                <h2 className="text-xl font-semibold text-blue-900 dark:text-white">Informasi Pribadi</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input 
                                    type="text" 
                                    placeholder="Nama Lengkap" 
                                    className="border-2 border-gray-200 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" 
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    className="border-2 border-gray-200 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="No. Telepon" 
                                    className="border-2 border-gray-200 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Lokasi" 
                                    className="border-2 border-gray-200 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" 
                                />
                            </div>
                        </motion.div>
                        
                        {/* CV Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white dark:bg-[#2c3049] rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <FileText className="mr-3 text-blue-500" />
                                    <h2 className="text-xl font-semibold text-blue-900 dark:text-white">CV</h2>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    + Tambah
                                </motion.button>
                            </div>
                        </motion.div>
                        
                        {/* Experience */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white dark:bg-[#2c3049] rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <Briefcase className="mr-3 text-blue-500" />
                                    <h2 className="text-xl font-semibold text-blue-900 dark:text-white">Pengalaman</h2>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    + Tambah
                                </motion.button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { 
                                        title: "Senior UI Designer", 
                                        company: "Tech Company ABC", 
                                        period: "2020 - Sekarang" 
                                    },
                                    { 
                                        title: "UI/UX Designer", 
                                        company: "Design Agency XYZ", 
                                        period: "2018 - 2020" 
                                    }
                                ].map((exp, index) => (
                                    <motion.div 
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500"
                                    >
                                        <h3 className="font-semibold text-blue-900 dark:text-white">{exp.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                                        <p className="text-sm text-gray-400">{exp.period}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* Portfolio */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-white dark:bg-[#2c3049] rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <FileText className="mr-3 text-blue-500" />
                                    <h2 className="text-xl font-semibold text-blue-900 dark:text-white">Portfolio</h2>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    + Tambah
                                </motion.button>
                            </div>
                        </motion.div>
                    </section>
                </motion.div>
            </div>
        </MainLayout>
    );
}