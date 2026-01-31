import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Database, FileText, Eye, Clock } from "lucide-react"; // Pastikan lucide-react terinstall

export default function Dashboard({ auth, stats, recentSurveys }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* 1. STATS CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1: Total Data */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-gray-100 flex items-center">
                            <div className="p-4 bg-blue-50 rounded-full text-blue-600 mr-4">
                                <Database className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm font-medium">
                                    Total Baris Data
                                </div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {stats.total_respondents}
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Total Artikel */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-gray-100 flex items-center">
                            <div className="p-4 bg-purple-50 rounded-full text-purple-600 mr-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm font-medium">
                                    Artikel Terbit
                                </div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {stats.total_articles}
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Total Views */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-gray-100 flex items-center">
                            <div className="p-4 bg-orange-50 rounded-full text-orange-600 mr-4">
                                <Eye className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-gray-500 text-sm font-medium">
                                    Total Pembaca
                                </div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {stats.total_views}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. RECENT ACTIVITY (Opsional) */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-gray-400" />
                                Aktivitas Import Terakhir
                            </h3>
                        </div>
                        <div className="p-6">
                            {recentSurveys && recentSurveys.length > 0 ? (
                                <ul className="divide-y divide-gray-100">
                                    {recentSurveys.map((survey) => (
                                        <li
                                            key={survey.id}
                                            className="py-3 flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600">
                                                Import Data kategori{" "}
                                                <span className="font-bold uppercase text-blue-600">
                                                    {survey.tipe_survei}
                                                </span>
                                            </span>
                                            <span className="text-gray-400">
                                                {new Date(
                                                    survey.created_at,
                                                ).toLocaleDateString("id-ID")}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    Belum ada data masuk.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
