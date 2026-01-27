import React from "react";
import { Search, TrendingUp, ArrowRight } from "lucide-react"; // Import Icon tambahan

const Hero = () => {
    // Data Dummy Topik Trending (Sukabumi Context)
    const trendingTopics = [
        "Tol Bocimi Seksi 3",
        "UMK Sukabumi 2026",
        "Harga Gabah",
        "Wisata Ciletuh",
        "Lahan Industri Cikembar",
        "Ekspor Manggis",
    ];

    return (
        <section className="relative w-full bg-[#F3F6FF] pb-20 pt-16 overflow-hidden">
            {/* Background Decoration (Optional: Blob samar biar gak sepi) */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 1. HERO TEXT & SEARCH */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Live Data Sukabumi Raya
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                            Brightnest Institut
                        </span>
                        <br />
                        Pusat Intelijen Data Daerah
                    </h1>

                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
                        Akses ribuan dataset strategis, peta investasi, dan
                        riset pasar mendalam untuk mengakselerasi keputusan
                        bisnis di Sukabumi.
                    </p>

                    {/* Search Bar Container */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari data, misal: 'Okupansi Hotel Situ Gunung'"
                            className="w-full pl-12 pr-36 py-4 rounded-xl border border-gray-200 shadow-lg shadow-blue-100/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-700 transition-all"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
                            Cari Data
                        </button>
                    </div>

                    {/* === FITUR BARU: TOPIK TRENDING (Tag Cloud) === */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Topik Populer
                            Minggu Ini:
                        </span>
                        <div className="flex flex-wrap justify-center gap-2">
                            {trendingTopics.map((topic, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-1.5 bg-white border border-gray-200 text-slate-600 text-sm font-medium rounded-full hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-1 border border-white">
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-[1.4rem] p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-3 py-1 rounded-full border border-red-200 tracking-wide uppercase">
                                    Hot Issue
                                </span>
                                <span className="text-slate-400 text-sm font-medium">
                                    Updated: 24 Jan 2026
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                                Efek Tol Bocimi: Investasi Manufaktur Melonjak{" "}
                                <span className="text-red-600">40%</span>
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-base">
                                Konektivitas Jakarta-Sukabumi yang membaik
                                memicu relokasi pabrik besar ke wilayah Sukabumi
                                Utara (Cicurug, Parungkuda, Cikembar).
                            </p>

                            <button className="group flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 transition-colors">
                                Baca Laporan Lengkap
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        <div className="flex-1 w-full flex justify-end">
                            <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-sm font-bold text-slate-700">
                                        Realisasi Investasi (Miliar IDR)
                                    </div>
                                    <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                                        +12.5% YoY
                                    </div>
                                </div>

                                <div className="flex items-end justify-between h-48 gap-3">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[90%] flex items-end justify-center group relative overflow-hidden">
                                        <div
                                            className="absolute bottom-0 w-full bg-blue-600 h-0 group-hover:h-full transition-all duration-700 ease-out"
                                            style={{ height: "90%" }}
                                        ></div>
                                        <span className="absolute -top-6 text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                                            850
                                        </span>
                                        <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400">
                                            Cikembar
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[75%] flex items-end justify-center group relative overflow-hidden">
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-500 h-0 group-hover:h-full transition-all duration-700 ease-out delay-75"
                                            style={{ height: "75%" }}
                                        ></div>
                                        <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400">
                                            Cicurug
                                        </div>
                                    </div>
                                    {/* Batang 3 */}
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[50%] flex items-end justify-center group relative overflow-hidden">
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-400 h-0 group-hover:h-full transition-all duration-700 ease-out delay-150"
                                            style={{ height: "50%" }}
                                        ></div>
                                        <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400">
                                            Sukaraja
                                        </div>
                                    </div>
                                    {/* Batang 4 */}
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[35%] flex items-end justify-center group relative overflow-hidden">
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-300 h-0 group-hover:h-full transition-all duration-700 ease-out delay-200"
                                            style={{ height: "35%" }}
                                        ></div>
                                        <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400">
                                            Cisaat
                                        </div>
                                    </div>
                                    {/* Batang 5 */}
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[25%] flex items-end justify-center group relative overflow-hidden">
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-200 h-0 group-hover:h-full transition-all duration-700 ease-out delay-300"
                                            style={{ height: "25%" }}
                                        ></div>
                                        <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400">
                                            P.Ratu
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-400">
                                    <span>Sumber: DPMPTSP Kab. Sukabumi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
