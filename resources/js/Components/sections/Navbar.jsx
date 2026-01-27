import React from "react";
import { Search, Sparkles, Menu } from "lucide-react"; // Import Icon tambahan

const Navbar = () => {
    return (
        // Tambahkan backdrop-blur agar terlihat transparan & modern saat di-scroll
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* 1. BAGIAN KIRI: LOGO BRIGHTNEST (Kreatif) */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer gap-3 group">
                        {/* Icon Logo: Kotak rounded dengan icon Sparkles */}
                        <div className="bg-blue-50 p-2 rounded-xl border border-blue-100 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-300">
                            <Sparkles className="w-6 h-6 text-primary fill-blue-200" />
                        </div>

                        {/* Typography Logo */}
                        <div className="flex flex-col justify-center">
                            {/* Teks Utama: Gradient Text */}
                            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">
                                Brightnest
                            </span>
                            {/* Sub-text: Spacing lebar agar elegan */}
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] pl-0.5 group-hover:text-primary transition-colors">
                                Institut
                            </span>
                        </div>
                    </div>

                    {/* 2. BAGIAN TENGAH: MENU LINKS (Desktop) */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {[
                            "Riset Daerah",
                            "Program Data",
                            "Publikasi",
                            "Tentang Kami",
                        ].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-slate-500 hover:text-primary font-medium text-sm transition-colors relative group"
                            >
                                {item}
                                {/* Efek garis bawah saat hover */}
                                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* 3. BAGIAN KANAN: ACTIONS */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button (Icon Only on Mobile) */}
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Tombol Login */}
                        <button className="hidden md:block px-5 py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                            Masuk
                        </button>

                        {/* Tombol CTA Utama */}
                        <button className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-primary shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
                            Mulai Akses
                        </button>

                        {/* Hamburger Menu (Mobile Only) */}
                        <button className="md:hidden p-2 text-gray-500">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
