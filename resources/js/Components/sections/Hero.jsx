import React, { useState } from "react";
import { Search, TrendingUp, ArrowRight, Calendar } from "lucide-react";
import { Link, router } from "@inertiajs/react";

// Terima props 'featuredArticle' dan 'categories' dari Welcome.jsx
const Hero = ({ featuredArticle, categories = [] }) => {
    // State untuk Search
    const [keyword, setKeyword] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // Redirect ke halaman search dengan parameter q
            router.get("/search", { q: keyword });
        }
    };

    return (
        <section className="relative w-full bg-[#F3F6FF] pb-20 pt-16 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 1. HERO TEXT & SEARCH */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Live Data Daerah
                    </div> */}

                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                            Brightnest Institut
                        </span>
                        <br />
                        Pusat Intelijen Data Daerah
                    </h1>

                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
                        Akses ribuan dataset strategis dan riset mendalam untuk
                        akselerasi keputusan Anda.
                    </p>

                    {/* SEARCH BAR (SUDAH BERFUNGSI) */}
                    <form
                        onSubmit={handleSearch}
                        className="relative max-w-2xl mx-auto mb-8"
                    >
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cari data, misal: 'Kemiskinan' atau 'Infrastruktur'"
                            className="w-full pl-12 pr-36 py-4 rounded-xl border border-gray-200 shadow-lg shadow-blue-100/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-gray-700 transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-6 rounded-lg font-bold hover:bg-primary transition-colors flex items-center gap-2"
                        >
                            Cari Data
                        </button>
                    </form>

                    {/* TAG CLOUD DINAMIS (Dari Database) */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Topik Populer:
                        </span>
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.length > 0 ? (
                                categories.slice(0, 5).map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/category/${cat.slug}`}
                                        className="px-4 py-1.5 bg-white border border-gray-200 text-slate-600 text-sm font-medium rounded-full hover:border-primary hover:text-primary hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
                                    >
                                        {cat.name}
                                    </Link>
                                ))
                            ) : (
                                <span className="text-xs text-gray-400">
                                    Belum ada topik trending.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. HOT ISSUE CARD (DINAMIS DARI ARTIKEL TERBARU) */}
            </div>
        </section>
    );
};

export default Hero;

// {featuredArticle && (
//     <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-1 border border-white">
//         <div className="bg-gradient-to-br from-slate-50 to-white rounded-[1.4rem] p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-10">
//             <div className="flex-1 space-y-4">
//                 <div className="flex items-center gap-3">
//                     <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-3 py-1 rounded-full border border-red-200 tracking-wide uppercase">
//                         Hot Issue
//                     </span>
//                     <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         {new Date(
//                             featuredArticle.created_at,
//                         ).toLocaleDateString("id-ID")}
//                     </span>
//                 </div>

//                 <h2 className="text-3xl font-bold text-slate-900 leading-tight">
//                     {featuredArticle.title}
//                 </h2>
//                 <p className="text-slate-500 leading-relaxed text-base line-clamp-2">
//                     {featuredArticle.excerpt}
//                 </p>

//                 <Link
//                     href={route(
//                         "articles.show.public",
//                         featuredArticle.slug,
//                     )}
//                     className="group flex items-center gap-2 text-primary font-bold hover:text-blue-800 transition-colors"
//                 >
//                     Baca Laporan Lengkap
//                     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//             </div>

//             {/* GRAFIK VISUAL (Kanan) - Biarkan Statis Dulu untuk Estetika, atau ganti Image Artikel jika mau */}
//             <div className="flex-1 w-full flex justify-end">
//                 <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-hidden relative">
//                     {/* Kalau ada gambar artikel, pakai gambar. Kalau gak, pakai ilustrasi grafik Boss tadi */}
//                     {featuredArticle.image ? (
//                         <img
//                             src={`/storage/${featuredArticle.image}`}
//                             alt={featuredArticle.title}
//                             className="w-full h-64 object-cover rounded-xl hover:scale-105 transition-transform duration-700"
//                         />
//                     ) : (
//                         // Fallback ke visual grafik Boss (Saya singkat biar gak kepanjangan di sini)
//                         <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
//                             <TrendingUp className="w-16 h-16" />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </div>
// )}
