import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Calendar, User, FileQuestion } from "lucide-react";
// 1. IMPORT WIDGET POPULAR
import MostPopularWidget from "@/Components/widgets/MostPopularWidget";

// 2. TERIMA PROP 'popularArticles' DARI CONTROLLER
export default function SearchShow({ articles, query, popularArticles }) {
    const listArtikel = articles.data;
    const breadcrumbs = [{ label: `Pencarian: "${query}"`, url: null }];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pencarian: ${query}`} />

            {/* === HEADER CLEAN STYLE (TETAP SAMA) === */}
            <div className="relative bg-white border-b border-gray-200 overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#1d1f9a 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Judul Kiri */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-8 w-1.5 bg-secondary rounded-full"></div>
                                <span className="text-sm font-bold text-secondary tracking-widest uppercase">
                                    Hasil Pencarian
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                "{query}"
                            </h1>
                            <p className="mt-2 text-slate-500 text-lg">
                                Menampilkan hasil penelusuran untuk kata kunci
                                di atas.
                            </p>
                        </div>

                        {/* Statistik Kanan */}
                        <div className="hidden md:block text-right">
                            <div className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl">
                                <span className="block text-2xl font-bold text-slate-900">
                                    {articles.total}
                                </span>
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                    Ditemukan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* === CONTENT AREA (GRID LAYOUT BARU) === */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Grid Pembagi: Kiri (Konten) - Kanan (Sidebar) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* === KOLOM KIRI: HASIL PENCARIAN (Lebar 3/4) === */}
                    <div className="lg:col-span-3">
                        {listArtikel.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {listArtikel.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={route(
                                            "articles.show.public",
                                            article.slug,
                                        )}
                                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 relative"
                                    >
                                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                            {article.image ? (
                                                <img
                                                    src={`/storage/${article.image}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-slate-50">
                                                    <span className="text-xs font-bold uppercase">
                                                        No Image
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm z-10">
                                                {article.category?.name ||
                                                    "Umum"}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                                                <div className="flex items-center">
                                                    <User className="w-3 h-3 mr-1" />
                                                    {article.user?.name ||
                                                        "Redaksi"}
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {new Date(
                                                        article.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            // TAMPILAN KOSONG
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
                                    <FileQuestion className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Pencarian tidak ditemukan.
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Coba gunakan kata kunci lain atau periksa
                                    ejaan Anda.
                                </p>
                                <Link
                                    href="/"
                                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center gap-2">
                            {articles.prev_page_url && (
                                <Link
                                    href={articles.prev_page_url}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                                >
                                    &larr; Sebelumnya
                                </Link>
                            )}
                            {articles.next_page_url && (
                                <Link
                                    href={articles.next_page_url}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                                >
                                    Selanjutnya &rarr;
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* === KOLOM KANAN: SIDEBAR WIDGET (Lebar 1/4) === */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* 3. PASANG WIDGET MOST POPULAR */}
                        <MostPopularWidget articles={popularArticles} />
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
