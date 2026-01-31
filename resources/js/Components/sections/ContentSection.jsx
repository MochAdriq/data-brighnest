import React, { useState } from "react";
import { ChevronDown, FileText, Download } from "lucide-react"; // Hapus Flame karena sudah ada di Widget
import DataCard from "../ui/DataCard";
import { Link } from "@inertiajs/react";
// 1. IMPORT WIDGET KITA
import MostPopularWidget from "@/Components/widgets/MostPopularWidget";
// Import dummy data CUMA untuk Latest Reports
import { latestReports } from "../../data/dummyData";

const ContentSection = ({ articles, popularArticles = [] }) => {
    // State untuk Sorting
    const [sortOrder, setSortOrder] = useState("desc");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Data Processing
    let rawList = Array.isArray(articles) ? articles : articles?.data || [];

    // Logic Sorting
    const sortedList = [...rawList].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    const formatArticleToItem = (article) => {
        return {
            id: article.id,
            slug: article.slug,
            title: article.title,
            category: article.category?.name || "Umum",
            author: article.user?.name || "Redaksi",
            date: new Date(article.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            image: article.image
                ? `/storage/${article.image}`
                : "/images/default-news.jpg",
            views: article.views || 0,
            excerpt: article.excerpt || "Tidak ada ringkasan.",
        };
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* === KOLOM KIRI: MAIN CONTENT === */}
                <div className="lg:col-span-3">
                    {/* Header & Filter */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Latest Data Insights
                        </h2>

                        {/* Tombol Sortir */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary hover:text-primary bg-white transition-colors min-w-[140px] justify-between"
                            >
                                <span>
                                    {sortOrder === "desc"
                                        ? "Terbaru"
                                        : "Terlama"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown */}
                            {isSortOpen && (
                                <div className="absolute right-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden">
                                    <button
                                        onClick={() => {
                                            setSortOrder("desc");
                                            setIsSortOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${sortOrder === "desc" ? "text-primary font-bold bg-blue-50" : "text-gray-600"}`}
                                    >
                                        Terbaru (DESC)
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortOrder("asc");
                                            setIsSortOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${sortOrder === "asc" ? "text-primary font-bold bg-blue-50" : "text-gray-600"}`}
                                    >
                                        Terlama (ASC)
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Grid Kartu Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedList.length > 0 ? (
                            sortedList.map((article) => (
                                <DataCard
                                    key={article.id}
                                    item={formatArticleToItem(article)}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 font-medium">
                                    Belum ada artikel data.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tombol Load More */}
                    {sortedList.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="px-8 py-3 bg-white border border-primary text-primary font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                                Load More Insights
                            </button>
                        </div>
                    )}
                </div>

                {/* === KOLOM KANAN: SIDEBAR === */}
                <div className="lg:col-span-1 space-y-8">
                    {/* 2. PANGGIL WIDGET MOST POPULAR (Jauh lebih rapi!) */}
                    <MostPopularWidget articles={popularArticles} />

                    {/* Widget 2: Latest Reports (Tetap Dummy) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <FileText className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-slate-900">
                                Latest Reports
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {latestReports.map((report, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between items-center group cursor-pointer pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                                >
                                    <span className="text-sm text-gray-600 group-hover:text-primary transition-colors line-clamp-1">
                                        {report}
                                    </span>
                                    <Download className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentSection;
