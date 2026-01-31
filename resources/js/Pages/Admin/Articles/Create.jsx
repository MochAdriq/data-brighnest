import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios"; // Kita butuh axios buat nembak API preview
import {
    Image as ImageIcon,
    Type,
    FileText,
    ArrowLeft,
    Send,
    BarChart3,
    Search,
    Plus,
    Trash2,
    Filter,
    CheckCircle2,
    PieChart,
    LineChart,
    RefreshCw,
} from "lucide-react";

// --- SETUP CHART.JS ---
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

// Daftarkan komponen chart yang mau dipakai
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

// Pilihan Warna Grafik (Biar cantik otomatis)
const chartColors = [
    "rgba(54, 162, 235, 0.7)", // Biru
    "rgba(255, 99, 132, 0.7)", // Merah
    "rgba(255, 206, 86, 0.7)", // Kuning
    "rgba(75, 192, 192, 0.7)", // Hijau
    "rgba(153, 102, 255, 0.7)", // Ungu
    "rgba(255, 159, 64, 0.7)", // Orange
];

export default function ArticleCreate({ auth, metaConfig, categories }) {
    // Terima 'categories' dari controller

    const [searchTerm, setSearchTerm] = useState("");
    const [previewData, setPreviewData] = useState(null); // Data hasil API
    const [loadingPreview, setLoadingPreview] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        category_id: "", // Field baru buat Kategori
        content: "",
        image: null,
        chart_config: {
            tipe: "none",
            chart_type: "bar", // Default jenis chart
            filters: [],
            variables: [],
        },
    });

    // --- LOGIC FILTER BUILDER ---
    const addFilter = () => {
        setData("chart_config", {
            ...data.chart_config,
            filters: [...data.chart_config.filters, { key: "", value: "" }],
        });
    };

    const removeFilter = (index) => {
        const newFilters = [...data.chart_config.filters];
        newFilters.splice(index, 1);
        setData("chart_config", { ...data.chart_config, filters: newFilters });
    };

    const updateFilterKey = (index, newKey) => {
        const newFilters = [...data.chart_config.filters];
        newFilters[index] = { key: newKey, value: "" };
        setData("chart_config", { ...data.chart_config, filters: newFilters });
    };

    const updateFilterValue = (index, newValue) => {
        const newFilters = [...data.chart_config.filters];
        newFilters[index] = { ...newFilters[index], value: newValue };
        setData("chart_config", { ...data.chart_config, filters: newFilters });
    };

    const handleCheckboxChange = (key) => {
        const currentVars = data.chart_config.variables;
        const isAdding = !currentVars.includes(key);

        if (isAdding) {
            if (currentVars.length >= 4) {
                alert("Maksimal 4 Grafik.");
                return;
            }
            setData("chart_config", {
                ...data.chart_config,
                variables: [...currentVars, key],
            });
        } else {
            setData("chart_config", {
                ...data.chart_config,
                variables: currentVars.filter((v) => v !== key),
            });
        }
    };

    // --- LOGIC PREVIEW CHART (INTI PART 2) ---
    const fetchPreview = async () => {
        if (data.chart_config.variables.length === 0) {
            alert("Pilih minimal 1 variabel data untuk ditampilkan.");
            return;
        }

        setLoadingPreview(true);
        try {
            // Tembak API Laravel yang sudah kita buat
            const response = await axios.post(route("articles.preview-chart"), {
                tipe: data.chart_config.tipe,
                filters: data.chart_config.filters,
                variables: data.chart_config.variables,
            });

            if (response.data.status === "success") {
                setPreviewData(response.data.data);
            }
        } catch (error) {
            console.error("Gagal memuat preview:", error);
            alert("Gagal memuat data chart. Pastikan koneksi aman.");
        } finally {
            setLoadingPreview(false);
        }
    };

    // Helper: Render Grafik Sesuai Pilihan
    const renderChart = (label, chartData) => {
        const commonData = {
            labels: chartData.labels,
            datasets: [
                {
                    label: "Jumlah Responden",
                    data: chartData.values,
                    backgroundColor: chartColors,
                    borderColor: chartColors.map((c) => c.replace("0.7", "1")), // Border lebih tebal
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: `Grafik: ${label}` },
            },
        };

        switch (data.chart_config.chart_type) {
            case "pie":
                return <Pie data={commonData} options={options} />;
            case "line":
                return <Line data={commonData} options={options} />;
            default:
                return <Bar data={commonData} options={options} />;
        }
    };

    const currentConfig =
        data.chart_config.tipe !== "none" && metaConfig[data.chart_config.tipe]
            ? metaConfig[data.chart_config.tipe]
            : { filters: {}, variables: {} };

    const filteredVariables = Object.entries(currentConfig.variables).filter(
        ([label, key]) =>
            label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("articles.store"));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // --- 2. Handler: Saat Pilih File ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // SETTING BATAS (Misal: 2 MB)
        const MAX_MB = 2;
        const MAX_BYTES = MAX_MB * 1024 * 1024;

        // Cek Ukuran
        if (file.size > MAX_BYTES) {
            // A. TAMPILKAN POP-UP
            alert(
                `⚠️ FILE TERLALU BESAR!\n\n` +
                    `Ukuran File Anda: ${formatFileSize(file.size)}\n` +
                    `Batas Maksimum: ${MAX_MB} MB\n\n` +
                    `Mohon kompres gambar atau pilih gambar lain.`,
            );

            // B. RESET INPUT (Hapus file yang dipilih)
            e.target.value = null;

            // C. JANGAN SIMPAN DATA
            return;
        }

        // Kalau aman, baru simpan ke state Inertia
        setData("image", file);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl text-gray-800 leading-tight flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-blue-600" />
                        Tulis Berita Data
                    </h2>
                    <Link
                        href={route("articles.index")}
                        className="text-sm text-gray-500 hover:text-blue-600 flex items-center transition"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tulis Artikel" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="bg-white overflow-hidden shadow-xl sm:rounded-xl border border-gray-100">
                            <div className="p-8 space-y-8">
                                {/* 1. INPUT JUDUL & KATEGORI */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <Type className="w-4 h-4 mr-2 text-blue-500" />{" "}
                                            Judul Artikel
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full text-xl font-bold placeholder-gray-300 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            placeholder="Judul Berita..."
                                        />
                                        {errors.title && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kategori
                                        </label>
                                        <select
                                            className="w-full border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Pilih --
                                            </option>
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.category_id}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 2. AREA DATA DRIVEN */}
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-start">
                                            <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
                                            <div>
                                                <h3 className="font-bold text-lg text-blue-900">
                                                    Konfigurasi Data
                                                </h3>
                                                <p className="text-sm text-blue-600/80">
                                                    Hubungkan berita dengan data
                                                    survei.
                                                </p>
                                            </div>
                                        </div>

                                        {/* PILIHAN JENIS CHART */}
                                        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-blue-200">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("chart_config", {
                                                        ...data.chart_config,
                                                        chart_type: "bar",
                                                    })
                                                }
                                                className={`p-2 rounded ${data.chart_config.chart_type === "bar" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                                                title="Bar Chart"
                                            >
                                                <BarChart3 className="w-5 h-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("chart_config", {
                                                        ...data.chart_config,
                                                        chart_type: "pie",
                                                    })
                                                }
                                                className={`p-2 rounded ${data.chart_config.chart_type === "pie" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                                                title="Pie Chart"
                                            >
                                                <PieChart className="w-5 h-5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("chart_config", {
                                                        ...data.chart_config,
                                                        chart_type: "line",
                                                    })
                                                }
                                                className={`p-2 rounded ${data.chart_config.chart_type === "line" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                                                title="Line Chart"
                                            >
                                                <LineChart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* PILIH SUMBER DATA */}
                                    <div className="mb-4">
                                        <select
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={data.chart_config.tipe}
                                            onChange={(e) => {
                                                setData("chart_config", {
                                                    ...data.chart_config,
                                                    tipe: e.target.value,
                                                    filters: [],
                                                    variables: [],
                                                });
                                                setPreviewData(null); // Reset preview
                                            }}
                                        >
                                            <option value="none">
                                                -- Hanya Berita Teks --
                                            </option>
                                            <option value="siswa_sma">
                                                🎓 Data Siswa SMA/SMK
                                            </option>
                                            <option value="umum">
                                                👥 Data Masyarakat Umum
                                            </option>
                                        </select>
                                    </div>

                                    {/* FILTER & VARIABEL */}
                                    {data.chart_config.tipe !== "none" && (
                                        <div className="space-y-4">
                                            {/* Filter Builder */}
                                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center">
                                                        <Filter className="w-3 h-3 mr-1" />{" "}
                                                        Filter Data
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={addFilter}
                                                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 font-bold flex items-center"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />{" "}
                                                        Tambah
                                                    </button>
                                                </div>
                                                {data.chart_config.filters.map(
                                                    (filter, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex gap-2 items-center mb-2"
                                                        >
                                                            <select
                                                                className="w-1/3 text-sm rounded border-gray-300"
                                                                value={
                                                                    filter.key
                                                                }
                                                                onChange={(e) =>
                                                                    updateFilterKey(
                                                                        index,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            >
                                                                <option value="">
                                                                    -- Kolom --
                                                                </option>
                                                                {Object.entries(
                                                                    currentConfig.filters,
                                                                ).map(
                                                                    ([
                                                                        label,
                                                                        config,
                                                                    ]) => (
                                                                        <option
                                                                            key={
                                                                                config.key
                                                                            }
                                                                            value={
                                                                                config.key
                                                                            }
                                                                        >
                                                                            {
                                                                                label
                                                                            }
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                            <select
                                                                className="w-1/2 text-sm rounded border-gray-300"
                                                                value={
                                                                    filter.value
                                                                }
                                                                onChange={(e) =>
                                                                    updateFilterValue(
                                                                        index,
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                disabled={
                                                                    !filter.key
                                                                }
                                                            >
                                                                <option value="">
                                                                    -- Nilai --
                                                                </option>
                                                                {filter.key &&
                                                                    currentConfig.filters[
                                                                        Object.keys(
                                                                            currentConfig.filters,
                                                                        ).find(
                                                                            (
                                                                                l,
                                                                            ) =>
                                                                                currentConfig
                                                                                    .filters[
                                                                                    l
                                                                                ]
                                                                                    .key ===
                                                                                filter.key,
                                                                        )
                                                                    ]?.options.map(
                                                                        (
                                                                            opt,
                                                                            idx,
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                value={
                                                                                    opt
                                                                                }
                                                                            >
                                                                                {
                                                                                    opt
                                                                                }
                                                                            </option>
                                                                        ),
                                                                    )}
                                                            </select>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeFilter(
                                                                        index,
                                                                    )
                                                                }
                                                                className="text-red-400 hover:text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {/* Variable Selector */}
                                            <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
                                                <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                                                    <span className="text-xs font-bold text-blue-700">
                                                        Pilih Data (
                                                        {
                                                            data.chart_config
                                                                .variables
                                                                .length
                                                        }
                                                        /4)
                                                    </span>
                                                    <div className="relative w-40">
                                                        <Search className="absolute left-2 top-1.5 h-3 w-3 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            className="w-full pl-7 py-1 text-xs border border-gray-300 rounded"
                                                            placeholder="Cari..."
                                                            value={searchTerm}
                                                            onChange={(e) =>
                                                                setSearchTerm(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="h-40 overflow-y-auto p-3 grid grid-cols-2 gap-2">
                                                    {filteredVariables.map(
                                                        ([label, key]) => (
                                                            <label
                                                                key={key}
                                                                className={`flex items-center space-x-2 p-2 rounded border cursor-pointer text-xs ${data.chart_config.variables.includes(key) ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50 border-gray-100"}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="rounded text-blue-600"
                                                                    checked={data.chart_config.variables.includes(
                                                                        key,
                                                                    )}
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            key,
                                                                        )
                                                                    }
                                                                />
                                                                <span className="truncate">
                                                                    {label}
                                                                </span>
                                                            </label>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            {/* PREVIEW BUTTON */}
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    type="button"
                                                    onClick={fetchPreview}
                                                    disabled={
                                                        loadingPreview ||
                                                        data.chart_config
                                                            .variables
                                                            .length === 0
                                                    }
                                                    className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 transition shadow-lg"
                                                >
                                                    {loadingPreview ? (
                                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <BarChart3 className="w-4 h-4 mr-2" />
                                                    )}
                                                    {loadingPreview
                                                        ? "Mengambil Data..."
                                                        : "Lihat Preview Grafik"}
                                                </button>
                                            </div>

                                            {/* PREVIEW AREA */}
                                            {previewData && (
                                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
                                                    {Object.entries(
                                                        previewData,
                                                    ).map(
                                                        ([key, chartData]) => (
                                                            <div
                                                                key={key}
                                                                className="bg-white p-4 rounded-lg shadow border border-gray-100"
                                                            >
                                                                {renderChart(
                                                                    key,
                                                                    chartData,
                                                                )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* UPLOAD GAMBAR & KONTEN */}
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cover Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*" // Biar cuma bisa pilih gambar
                                            onChange={handleImageChange} // <--- Panggil fungsi kita
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                        />
                                        {/* Tambahan: Info teks kecil di bawah input */}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Maksimal ukuran: 2 MB. Format: JPG,
                                            PNG.
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Isi Berita
                                        </label>
                                        <textarea
                                            rows={10}
                                            className="block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            value={data.content}
                                            onChange={(e) =>
                                                setData(
                                                    "content",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-8 py-5 flex items-center justify-end gap-x-4 border-t border-gray-100">
                                <Link
                                    href={route("articles.index")}
                                    className="text-sm font-semibold text-gray-900 hover:text-gray-600"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-500 transition flex items-center disabled:opacity-50"
                                >
                                    {processing ? (
                                        "Menyimpan..."
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />{" "}
                                            Terbitkan
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
