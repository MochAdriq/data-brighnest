import React from "react";
import {
    Lock,
    BarChart3,
    PieChart,
    TrendingUp,
    Eye,
    User,
    Calendar,
} from "lucide-react";
import { Link } from "@inertiajs/react";

const DataCard = ({ item }) => {
    // 1. Helper Warna Kategori (Updated untuk Bahasa Indonesia)
    const getCategoryColor = (cat) => {
        // Normalisasi ke huruf kecil biar gak sensitif huruf besar/kecil
        const category = cat?.toLowerCase() || "";

        if (category.includes("ekonomi") || category.includes("finance"))
            return "bg-green-600";
        if (category.includes("politik") || category.includes("pemerintahan"))
            return "bg-red-600";
        if (category.includes("teknologi") || category.includes("digital"))
            return "bg-blue-600";
        if (category.includes("pendidikan") || category.includes("sosial"))
            return "bg-yellow-500";
        if (category.includes("infrastruktur")) return "bg-slate-700";
        if (category.includes("kesehatan")) return "bg-teal-500";

        // Default color
        return "bg-blue-700";
    };

    // 2. Helper Visual Grafik (Fallback jika gambar error/tidak ada)
    const renderChartVisual = () => {
        return <BarChart3 className="w-16 h-16 text-gray-300 opacity-50" />;
    };

    return (
        // UBAH JADI LINK (Supaya bisa diklik ke detail artikel)
        // Pastikan 'item.slug' ada (Nanti kita cek ContentSection lagi)
        <Link
            href={item.slug ? route("articles.show.public", item.slug) : "#"}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full"
        >
            {/* --- BAGIAN ATAS: GAMBAR --- */}
            <div className="relative h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/default-news.jpg"; // Safety net kalau gambar rusak
                        }}
                    />
                ) : (
                    renderChartVisual()
                )}

                {/* Badge Kategori */}
                <span
                    className={`absolute top-3 right-3 ${getCategoryColor(item.category)} text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10 shadow-sm`}
                >
                    {item.category}
                </span>

                {/* Overlay PREMIUM (Opsional) */}
                {item.isPremium && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white z-20">
                        <div className="bg-white/20 p-3 rounded-full mb-2 backdrop-blur-md">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-bold tracking-wide">
                            Premium Data
                        </span>
                    </div>
                )}
            </div>

            {/* --- BAGIAN BAWAH: KONTEN --- */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Judul */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                </h3>

                {/* Ringkasan (Excerpt) - GANTI desc JADI excerpt */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow leading-relaxed">
                    {item.excerpt}
                </p>

                {/* Footer Info (Date, Author, Views) */}
                <div className="text-xs text-gray-400 font-medium pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Tanggal */}
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                        </div>
                        {/* Penulis */}
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="truncate max-w-[80px]">
                                {item.author}
                            </span>
                        </div>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1 text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                        {item.views}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DataCard;
