import React from "react";
// Perhatikan path import-nya berubah menyesuaikan struktur folder baru
import Navbar from "@/Components/sections/Navbar";
import Hero from "@/Components/sections/Hero";
import ContentSection from "@/Components/sections/ContentSection";
import Footer from "@/Components/sections/Footer";

// Import CSS tidak perlu lagi di sini karena sudah otomatis di-load Laravel
// Hapus baris: import './App.css' jika ada.

function Welcome() {
    // Ganti nama fungsi App jadi Welcome (opsional, tapi rapi)
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <ContentSection />
            <Footer />
        </div>
    );
}

export default Welcome;
