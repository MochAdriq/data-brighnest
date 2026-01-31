import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout"; // <--- PENTING: Panggil Layout Utama
import { Calendar, User, Eye, BarChart3, Hash } from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

// Register Chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
);

// Pilihan Warna
const chartColors = [
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 99, 132, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
];

export default function ArticleShow({ article, chartData }) {
    // --- 1. LOGIC RENDER GRAFIK (Tetap Sama) ---
    const renderChart = (label, rawData) => {
        const config = article.chart_config;
        const type = config.chart_type || "bar";

        const data = {
            labels: rawData.labels,
            datasets: [
                {
                    label: "Jumlah Responden",
                    data: rawData.values,
                    backgroundColor: chartColors,
                    borderColor: chartColors.map((c) => c.replace("0.7", "1")),
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: `Data: ${label}` },
            },
        };

        switch (type) {
            case "pie":
                return <Pie data={data} options={options} />;
            case "line":
                return <Line data={data} options={options} />;
            default:
                return <Bar data={data} options={options} />;
        }
    };

    // --- 2. LOGIC BREADCRUMBS ---
    // Ini yang membuat teks "Beranda > Politik > Judul" muncul otomatis di bawah Navbar
    const breadcrumbs = [
        {
            label: article.category?.name || "Umum",
            // Nanti kalau halaman kategori sudah jadi, link ini akan aktif
            url: article.category ? `/category/${article.category.slug}` : "#",
        },
        {
            label: article.title,
            url: null, // null artinya ini halaman aktif (tidak bisa diklik)
        },
    ];

    // --- 3. TAMPILAN (Dibungkus PublicLayout) ---
    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={article.title} />

            {/* KONTAINER UTAMA */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Meta Kategori & Tanggal */}
                <div className="flex items-center gap-2 mb-4">
                    {article.category && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {article.category.name}
                        </span>
                    )}
                    <span className="text-gray-400 text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(article.created_at).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" },
                        )}
                    </span>
                </div>

                {/* Judul Besar */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                    {article.title}
                </h1>

                {/* Author & Views */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                                {article.user?.name || "Redaksi"}
                            </p>
                            <p className="text-xs text-gray-500">
                                Data Journalist
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-3 py-1 rounded-lg">
                        <Eye className="w-4 h-4 mr-1.5" />
                        {article.views.toLocaleString()} Pembaca
                    </div>
                </div>

                {/* GAMBAR UTAMA */}
                {article.image && (
                    <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                        <img
                            src={`/storage/${article.image}`}
                            alt={article.title}
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                )}

                {/* === DATA VISUALIZATION AREA === */}
                {chartData && Object.keys(chartData).length > 0 && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-8 mb-10">
                        <div className="flex items-center mb-6">
                            <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
                            <div>
                                <h3 className="font-bold text-xl text-gray-900">
                                    Data Insight
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Visualisasi data berdasarkan survei aktual.
                                </p>
                            </div>
                        </div>

                        {/* Filter Info */}
                        {article.chart_config.filters.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.chart_config.filters.map((f, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white text-gray-800 border border-gray-200 shadow-sm"
                                    >
                                        <Hash className="w-3 h-3 mr-1 text-gray-400" />
                                        {f.key}: <b>{f.value}</b>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Chart Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Object.entries(chartData).map(([key, data]) => (
                                <div
                                    key={key}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                                >
                                    {renderChart(key, data)}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-right">
                            <p className="text-xs text-gray-400 italic">
                                Sumber: Survei BrightNest (Real-time Data)
                            </p>
                        </div>
                    </div>
                )}

                {/* ISI BERITA */}
                <article className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed break-words overflow-hidden">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: article.content.replace(/\n/g, "<br>"),
                        }}
                    />
                </article>
            </div>

            {/* Footer sudah otomatis dari PublicLayout, jadi di sini dihapus */}
        </PublicLayout>
    );
}
