import React from "react";
import {
    Sparkles,
    MapPin,
    Mail,
    Phone,
    Instagram,
    Linkedin,
    Youtube,
    Facebook,
} from "lucide-react";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer className="bg-[#0B1120] text-slate-400 border-t border-slate-800 relative overflow-hidden text-sm">
            {/* 1. ACCENT LINE (Tetap dipertahankan karena cantik) */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-primary to-purple-500"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
                    {/* === KOLOM 1: BRANDING (Compact) === */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
                                <Sparkles className="w-5 h-5 text-blue-400 fill-primary/20" />
                            </div>
                            <span className="text-xl font-extrabold text-white tracking-tight">
                                Brightnest
                            </span>
                        </div>

                        <p className="leading-relaxed max-w-sm">
                            Pusat intelijen data yang mendedikasikan teknologi
                            untuk akselerasi ekonomi dan kebijakan publik di
                            Sukabumi.
                        </p>

                        <div className="space-y-2 pt-2">
                            <div className="flex items-start gap-3 hover:text-white transition-colors">
                                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                                <span>
                                    Jl. Suryakencana No. 12, Cikole, Kota
                                    Sukabumi
                                </span>
                            </div>
                            <div className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>halo@brightnest.id</span>
                            </div>
                        </div>
                    </div>

                    {/* === KOLOM 2: NAVIGASI (Merged Program & Data) === */}
                    <div className="lg:col-span-2 lg:col-start-7">
                        <h4 className="font-bold text-white mb-4 tracking-wide">
                            Platform
                        </h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-primary transition-colors"
                                >
                                    Beranda
                                </Link>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Pusat Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Indikator Makro
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Peta Geospasial
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* === KOLOM 3: PROGRAM & LEGAL === */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white mb-4 tracking-wide">
                            Program
                        </h4>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Fellowship Riset
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Bootcamp Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Summit 2026
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-primary transition-colors"
                                >
                                    Karir
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* === KOLOM 4: CONNECT (Socials) === */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white mb-4 tracking-wide">
                            Ikuti Kami
                        </h4>
                        <div className="flex gap-3 mb-6">
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Legal Links Kecil */}
                        <div className="flex flex-col gap-2 text-xs text-slate-500">
                            <a href="#" className="hover:text-slate-300">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="hover:text-slate-300">
                                Syarat Ketentuan
                            </a>
                        </div>
                    </div>
                </div>

                {/* === COPYRIGHT (Sangat Tipis) === */}
                <div className="pt-6 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-slate-500">
                        &copy; 2026 Brightnest Institut. Built with{" "}
                        <span className="text-red-500">❤</span> for Sukabumi.
                    </p>
                    {/* <p className="text-xs text-slate-600">Versi 1.0.0 (Beta)</p> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
