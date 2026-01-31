import React, { useState, useEffect, useRef } from "react";
import {
    Menu,
    X,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    User,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";

const Navbar = ({ user, categories = [] }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State untuk Dropdown
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    // Refs untuk Click Outside Close
    const topicRef = useRef(null);
    const userRef = useRef(null);

    // 1. EFEK SCROLL (Biar Navbar berubah saat digulir)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 2. LOGIC TUTUP MENU KALAU KLIK DI LUAR
    useEffect(() => {
        function handleClickOutside(event) {
            if (topicRef.current && !topicRef.current.contains(event.target)) {
                setIsTopicOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setIsUserOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <nav
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2"
                    : "bg-white border-b border-transparent py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-12">
                    {" "}
                    {/* Tinggi konten fix */}
                    {/* === KIRI: LOGO === */}
                    <Link
                        href="/"
                        className="flex-shrink-0 flex items-center gap-3 group mr-auto"
                    >
                        <img
                            src="/images/brightnest_company.png"
                            alt="Logo"
                            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                        {/* <span
                            className={`text-xl font-extrabold tracking-tight leading-none transition-colors ${isScrolled ? "text-gray-900" : "text-primary"}`}
                        >
                            Brightnest
                        </span> */}
                    </Link>
                    {/* === TENGAH: MENU UTAMA (Desktop) === */}
                    <div className="hidden md:flex items-center space-x-8 mr-8">
                        <Link
                            href="/"
                            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                        >
                            Beranda
                        </Link>

                        {/* Dropdown Topik */}
                        <div className="relative" ref={topicRef}>
                            <button
                                onClick={() => setIsTopicOpen(!isTopicOpen)}
                                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${isTopicOpen ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                            >
                                Topik
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isTopicOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Mega Menu Content */}
                            {isTopicOpen && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-5 w-[480px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>

                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                        Jelajahi Data
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                        {categories.slice(0, 8).map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={`/category/${cat.slug}`}
                                                className="flex items-center group/item p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                                onClick={() =>
                                                    setIsTopicOpen(false)
                                                }
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-primary mr-3 transition-colors"></div>
                                                <span className="text-sm font-medium text-gray-700 group-hover/item:text-primary">
                                                    {cat.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* <Link
                            href="/about"
                            className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                        >
                            Tentang Kami
                        </Link> */}
                    </div>
                    {/* === KANAN: AUTH / USER MENU === */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            // JIKA SUDAH LOGIN: Tampilkan Dropdown User
                            <div className="relative" ref={userRef}>
                                <button
                                    onClick={() => setIsUserOpen(!isUserOpen)}
                                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-gray-200 hover:border-primary/50 hover:bg-blue-50/50 transition-all group"
                                >
                                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary max-w-[100px] truncate">
                                        {user.name.split(" ")[0]}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                </button>

                                {/* Dropdown Menu User */}
                                {isUserOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-1">
                                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                            <p className="text-xs text-gray-500">
                                                Masuk sebagai
                                            </p>
                                            <p className="text-sm font-bold text-gray-900 truncate">
                                                {user.email}
                                            </p>
                                        </div>

                                        <Link
                                            href={route("dashboard")}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                        >
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Link>

                                        <Link
                                            href={route("profile.edit")}
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Profile Saya
                                        </Link>

                                        <div className="border-t border-gray-50 mt-1 pt-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Keluar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // JIKA BELUM LOGIN
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("login")}
                                    className="text-sm font-bold text-gray-600 hover:text-primary transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-full hover:bg-blue-800 shadow-md shadow-blue-200 hover:shadow-lg transition-all"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="p-2 text-gray-500 hover:text-primary"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* === MOBILE MENU DRAWER === */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-lg absolute w-full left-0">
                    <Link
                        href="/"
                        className="block text-base font-bold text-gray-700"
                    >
                        Beranda
                    </Link>

                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                            Topik
                        </span>
                        <div className="grid grid-cols-2 gap-3 pl-2">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/category/${cat.slug}`}
                                    className="block text-sm text-gray-600 hover:text-primary"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={route("dashboard")}
                                    className="block py-2 text-sm font-medium text-gray-700"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 text-sm font-medium text-red-600"
                                >
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    href={route("login")}
                                    className="w-full text-center py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="w-full text-center py-2.5 bg-primary text-white rounded-lg text-sm font-bold"
                                >
                                    Daftar Sekarang
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
