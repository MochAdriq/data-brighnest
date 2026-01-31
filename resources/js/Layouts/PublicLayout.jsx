import React from "react";
import Navbar from "@/Components/sections/Navbar";
import { Link, usePage } from "@inertiajs/react";
import { Home, ChevronRight } from "lucide-react";
import Footer from "@/Components/sections/Footer";
import Hero from "@/Components/sections/Hero"; // <--- 1. IMPORT HERO

export default function PublicLayout({
    children,
    breadcrumbs = [],
    heroData = null,
}) {
    // 1. Ambil data dari Middleware
    const { auth, globalCategories } = usePage().props;
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
            {/* 2. PASANG NAVBAR (Sini kuncinya!) */}
            {/* Pastikan props 'categories' diisi dengan 'globalCategories' */}
            <Navbar user={auth.user} categories={globalCategories} />

            {/* 3. Breadcrumbs */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-primary flex items-center transition-colors text-gray-400"
                            >
                                <Home className="w-4 h-4" />
                                {/* Opsional: Kalau mau ada teks "Beranda" di sebelah ikon, tulis disini */}
                            </Link>
                        </li>

                        {/* Loop Anak Breadcrumb (Topik / Artikel) */}
                        {breadcrumbs.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
                                {item.url ? (
                                    <Link
                                        href={item.url}
                                        className="hover:text-primary font-medium transition-colors text-primary"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-gray-800 font-semibold truncate max-w-[200px] sm:max-w-md">
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {heroData && (
                <Hero
                    featuredArticle={heroData.featuredArticle}
                    categories={globalCategories} // Kita pakai globalCategories biar hemat
                />
            )}

            {/* 4. Main Content */}
            <main className="flex-grow">{children}</main>

            {/* 5. Footer */}
            <Footer />
        </div>
    );
}
