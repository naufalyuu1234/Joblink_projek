// import { useState, useEffect } from 'react';
import { FaUserEdit, FaCog, FaSignOutAlt } from 'react-icons/fa';
import MainLayout from '@/components/layouts/MainLayout';

export default function Profile() {
    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Profile */}
                    <aside className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] ">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" alt=""
                                className='w-full h-full object-cover rounded-full'
                                />
                            </div>
                            <h2 className="text-lg font-bold">John Doe</h2>
                            <p className="text-black dark:text-white font-bold">UI/UX Designer</p>
                        </div>
                        
                        {/* Tombol Sidebar */}
                        <div className="mt-6 space-y-3">
                            <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-700">
                                <FaUserEdit /> Edit Profil
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-700">
                                <FaCog /> Pengaturan
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-700 text-red-600">
                                <FaSignOutAlt /> Keluar
                            </button>
                        </div>
                    </aside>
                    
                    {/* Bagian Konten Profile */}
                    <section className="w-full md:w-3/4 space-y-6">
                        {/* Informasi Pribadi */}
                        <div className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] ">
                            <h2 className="text-lg font-semibold mb-3">Informasi Pribadi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Nama Lengkap" className="border p-2 rounded-md w-full placeholder:text-gray-500 dark:placeholder:text-white" />
                                <input type="email" placeholder="Email" className="border p-2 rounded-md w-full placeholder:text-gray-500 dark:placeholder:text-white" />
                                <input type="text" placeholder="No. Telepon" className="border p-2 rounded-md w-full placeholder:text-gray-500 dark:placeholder:text-white" />
                                <input type="text" placeholder="Lokasi" className="border p-2 rounded-md w-full placeholder:text-gray-500 dark:placeholder:text-white" />
                            </div>
                        </div>
                        
                        {/* Portofolio */}
                        <div className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b]">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">CV</h2>
                                <button className="border px-3 py-1 rounded-md hover:bg-gray-700">+ Tambah</button>
                            </div>
                        </div>
                        {/* Pengalaman */}
                        <div className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b] ">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold">Pengalaman</h2>
                                <button className="border px-3 py-1 rounded-md hover:bg-gray-700">+ Tambah</button>
                            </div>
                            <div className="space-y-3">
                                <div className="p-3 border rounded-lg">
                                    <h3 className="font-semibold">Senior UI Designer</h3>
                                    <p className="text-gray-500">Tech Company ABC</p>
                                    <p className="text-sm text-gray-400">2020 - Sekarang</p>
                                </div>
                                <div className="p-3 border rounded-lg">
                                    <h3 className="font-semibold">UI/UX Designer</h3>
                                    <p className="text-gray-500">Design Agency XYZ</p>
                                    <p className="text-sm text-gray-400">2018 - 2020</p>
                                </div>
                            </div>
                        </div>
                        {/* Cv */}
                        <div className="border p-6 rounded-md shadow-md bg-white dark:bg-[#22243b]">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Portfolio</h2>
                                <button className="border px-3 py-1 rounded-md hover:bg-gray-700">+ Tambah</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
}