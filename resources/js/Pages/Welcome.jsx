import React from "react";
import { Head } from "@inertiajs/react"; // Opsional, buat judul tab
// import Navbar from "@/Components/sections/Navbar";
// import Hero from "@/Components/sections/Hero";
import ContentSection from "@/Components/sections/ContentSection";
// import Footer from "@/Components/sections/Footer";
import PublicLayout from "@/Layouts/PublicLayout";

// 1. TERIMA PROPS 'auth' DARI LARAVEL
export default function Welcome({
    articles,
    featuredArticle,
    categories,
    popularArticles,
}) {
    // Terima props baru
    const listArtikel = articles?.data || [];

    const heroData = {
        featuredArticle: featuredArticle,
    };
    return (
        <PublicLayout heroData={heroData}>
            <div className="min-h-screen bg-white">
                <Head title="Brightnest - Pusat Data Daerah" />

                <ContentSection
                    articles={articles}
                    popularArticles={popularArticles}
                />
            </div>
        </PublicLayout>
    );
}
