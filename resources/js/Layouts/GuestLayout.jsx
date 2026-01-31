import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            {/* Background Decoration (Opsional: Lingkaran samar) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Logo Section */}
            <div className="mb-6 text-center">
                <Link href="/">
                    <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
                        BrightNest
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Portal Data & Aspirasi Sukabumi
                    </p>
                </Link>
            </div>

            {/* Card Form Container */}
            <div className="w-full sm:max-w-md mt-6 px-8 py-8 bg-white shadow-xl overflow-hidden sm:rounded-xl border border-gray-100">
                {children}
            </div>

            {/* Footer Copyright */}
            <div className="mt-8 text-center text-xs text-gray-400">
                &copy; 2024 BrightNest Eval. All rights reserved.
            </div>
        </div>
    );
}
