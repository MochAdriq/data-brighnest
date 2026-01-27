import React from "react";
import { Lock, BarChart3, PieChart, TrendingUp } from "lucide-react";

const DataCard = ({ item }) => {
    // Helper Warna Kategori (Updated)
    const getCategoryColor = (cat) => {
        switch (cat) {
            case "Infrastructure":
                return "bg-blue-700";
            case "Tourism":
                return "bg-orange-500";
            case "Agriculture":
                return "bg-green-600";
            case "Industries":
                return "bg-slate-700";
            case "Property":
                return "bg-purple-600";
            case "Digital":
                return "bg-blue-500";
            default:
                return "bg-gray-600";
        }
    };

    // Helper Visual Grafik (Fallback jika gambar error/tidak ada)
    const renderChartVisual = () => {
        if (item.type === "pie")
            return <PieChart className="w-16 h-16 text-gray-300 opacity-50" />;
        if (item.type === "line")
            return (
                <TrendingUp className="w-16 h-16 text-gray-300 opacity-50" />
            );
        return <BarChart3 className="w-16 h-16 text-gray-300 opacity-50" />;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
            {/* 1. GAMBAR / VISUAL AREA */}
            <div className="relative h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                {/* LOGIC GAMBAR: Jika ada image url, tampilkan image. Jika tidak, tampilkan ikon grafik */}
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                {/* Overlay PREMIUM (Jika terkunci) */}
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

            {/* 2. KONTEN TEKS */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                    {item.desc}
                </p>
                <div className="text-xs text-gray-400 font-medium pt-4 border-t border-gray-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    {item.date}
                </div>
            </div>
        </div>
    );
};

export default DataCard;
