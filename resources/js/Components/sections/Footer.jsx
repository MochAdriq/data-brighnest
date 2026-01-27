import React from "react";
import { Sparkles, MapPin, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#0B1120] text-white pt-20 pb-10 border-t border-slate-800 relative overflow-hidden">
            {/* CREATIVE TOUCH: Garis Gradasi di Atas */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* KOLOM 1: BRANDING (Lebih Lebar - 4 Kolom) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Logo Brightnest Versi Dark Mode */}
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">
                                <Sparkles className="w-6 h-6 text-blue-400 fill-blue-500/20" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                                    Brightnest
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] pl-0.5">
                                    Institut
                                </span>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed pr-6">
                            Lembaga riset independen yang mendedikasikan
                            teknologi dan sains data untuk mengakselerasi
                            kemajuan ekonomi serta kebijakan publik di Sukabumi
                            Raya.
                        </p>

                        {/* Info Kontak dengan Icon */}
                        <div className="space-y-3 pt-4 border-t border-slate-800/50">
                            <div className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span>Cikole, Kota Sukabumi, Jawa Barat</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <span>halo@brightnest.id</span>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM 2: PROGRAM (2 Kolom) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="font-bold text-white mb-6 text-lg tracking-wide">
                            Program
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{" "}
                                    Fellowship Riset
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{" "}
                                    Bootcamp Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{" "}
                                    Inkubator Bisnis
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{" "}
                                    Summit 2026
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* KOLOM 3: PUSAT DATA (2 Kolom) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white mb-6 text-lg tracking-wide">
                            Pusat Data
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Indikator Makro
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Peta Geospasial
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Laporan Tahunan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Jurnal Open Access
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* KOLOM 4: LEGALITAS (2 Kolom) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white mb-6 text-lg tracking-wide">
                            Legalitas
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Kebijakan Privasi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Syarat Penggunaan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    Lisensi Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM COPYRIGHT */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © 2026 Brightnest Institut. Hak Cipta Dilindungi. Built
                        with ❤️ for Sukabumi.
                    </p>

                    <div className="flex gap-4">
                        {/* Social Media Placeholders (Circles) */}
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer group"
                            >
                                <span className="w-4 h-4 bg-slate-500 group-hover:bg-white rounded-sm transition-colors"></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
