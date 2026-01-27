import React from "react";
import { ChevronDown, Flame, FileText, Download } from "lucide-react";
import DataCard from "../ui/DataCard";
import { insights, popularPosts, latestReports } from "../../data/dummyData"; // Import data dummy

const ContentSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* === KOLOM KIRI: MAIN CONTENT (Lebar 3/4) === */}
                <div className="lg:col-span-3">
                    {/* Header & Filter */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Latest Data Insights
                        </h2>
                        <div className="flex space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary hover:text-primary bg-white">
                                <span>All Categories</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary hover:text-primary bg-white">
                                <span>Sort By</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Grid Kartu Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {insights.map((item) => (
                            <DataCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Tombol Load More */}
                    <div className="mt-12 text-center">
                        <button className="px-8 py-3 bg-white border border-primary text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                            Load More Insights
                        </button>
                    </div>
                </div>

                {/* === KOLOM KANAN: SIDEBAR (Lebar 1/4) === */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Widget 1: Most Popular */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center space-x-2 mb-6">
                            <Flame className="w-5 h-5 text-red-500 fill-red-500" />
                            <h3 className="font-bold text-slate-900">
                                Most Popular
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {popularPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="flex gap-4 group cursor-pointer"
                                >
                                    <span className="text-3xl font-bold text-gray-200 group-hover:text-primary transition-colors">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-primary transition-colors mb-1">
                                            {post.title}
                                        </h4>
                                        <span className="text-xs text-gray-400">
                                            {post.views} views
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Widget 2: Latest Reports */}
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
                                    <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
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
