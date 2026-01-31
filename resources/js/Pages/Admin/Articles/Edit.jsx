import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    Image as ImageIcon,
    Type,
    FileText,
    ArrowLeft,
    Save,
    BarChart3,
    Search,
    Plus,
    Trash2,
    Filter,
    CheckCircle2,
} from "lucide-react";

export default function ArticleEdit({ auth, article, metaConfig }) {
    const [searchTerm, setSearchTerm] = useState("");

    // PRE-FILL FORM DENGAN DATA ARTIKEL YANG MAU DIEDIT
    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Penting buat update file di Laravel Inertia
        title: article.title || "",
        content: article.content || "",
        image: null, // Image di-set null, kalau user gak upload berarti pakai yg lama
        chart_config: article.chart_config || {
            tipe: "none",
            filters: [],
            variables: [],
        },
    });

    // --- LOGIC FILTER BUILDER (SAMA PERSIS DENGAN CREATE) ---
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
        // POST ke route update dengan spoofing _method: PUT
        post(route("articles.update", article.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl text-gray-800 leading-tight flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-blue-600" />
                        Edit Berita Data
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
            <Head title="Edit Artikel" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="bg-white overflow-hidden shadow-xl sm:rounded-xl border border-gray-100">
                            <div className="p-8 space-y-8">
                                {/* INPUT JUDUL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <Type className="w-4 h-4 mr-2 text-blue-500" />{" "}
                                        Judul Artikel
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full text-2xl font-bold placeholder-gray-300 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 px-0 py-3 transition"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>

                                {/* === AREA DATA DRIVEN (FULL POWER) === */}
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <div className="flex items-start mb-6">
                                        <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
                                        <div>
                                            <h3 className="font-bold text-lg text-blue-900">
                                                Konfigurasi Data
                                            </h3>
                                            <p className="text-sm text-blue-600/80">
                                                Ubah sumber data atau filter
                                                artikel ini.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 1. SUMBER DATA */}
                                    <div className="mb-6">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                            Sumber Data
                                        </label>
                                        <select
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={data.chart_config.tipe}
                                            onChange={(e) => {
                                                setData("chart_config", {
                                                    tipe: e.target.value,
                                                    filters: [],
                                                    variables: [],
                                                });
                                                setSearchTerm("");
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

                                    {/* 2. FILTER BUILDER */}
                                    {data.chart_config.tipe !== "none" && (
                                        <div className="mb-6 bg-white p-4 rounded-lg border border-blue-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center">
                                                    <Filter className="w-3 h-3 mr-1" />{" "}
                                                    Filter Data
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={addFilter}
                                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition font-bold flex items-center"
                                                >
                                                    <Plus className="w-3 h-3 mr-1" />{" "}
                                                    Tambah Filter
                                                </button>
                                            </div>

                                            {data.chart_config.filters
                                                .length === 0 ? (
                                                <p className="text-xs text-gray-400 italic">
                                                    Tanpa filter (Semua data).
                                                </p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {data.chart_config.filters.map(
                                                        (filter, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex gap-2 items-center animate-fade-in-up"
                                                            >
                                                                <select
                                                                    className="w-1/3 text-sm rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                                    value={
                                                                        filter.key
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateFilterKey(
                                                                            index,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        -- Pilih
                                                                        Kolom --
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
                                                                    className="w-1/2 text-sm rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                                                                    value={
                                                                        filter.value
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateFilterValue(
                                                                            index,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !filter.key
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        -- Pilih
                                                                        Nilai --
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
                                            )}
                                        </div>
                                    )}

                                    {/* 3. VARIABEL SELECTOR */}
                                    {data.chart_config.tipe !== "none" && (
                                        <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
                                            <div className="p-3 bg-blue-50/50 border-b border-blue-100 flex justify-between items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`text-xs font-bold px-2 py-1 rounded ${data.chart_config.variables.length >= 4 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                                                    >
                                                        Grafik:{" "}
                                                        {
                                                            data.chart_config
                                                                .variables
                                                                .length
                                                        }{" "}
                                                        / 4
                                                    </span>
                                                </div>
                                                <div className="relative w-full sm:w-64">
                                                    <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Cari grafik..."
                                                        value={searchTerm}
                                                        onChange={(e) =>
                                                            setSearchTerm(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="h-60 overflow-y-auto p-4 custom-scrollbar">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {filteredVariables.map(
                                                        ([label, key]) => (
                                                            <label
                                                                key={key}
                                                                className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition select-none ${data.chart_config.variables.includes(key) ? "bg-blue-50 border-blue-500 shadow-sm" : "hover:bg-gray-50 border-gray-100"}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="h-4 w-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                                                                    checked={data.chart_config.variables.includes(
                                                                        key,
                                                                    )}
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            key,
                                                                        )
                                                                    }
                                                                />
                                                                <span
                                                                    className={`text-sm font-medium ${data.chart_config.variables.includes(key) ? "text-blue-900" : "text-gray-700"}`}
                                                                >
                                                                    {label}
                                                                </span>
                                                                {data.chart_config.variables.includes(
                                                                    key,
                                                                ) && (
                                                                    <CheckCircle2 className="w-4 h-4 text-blue-600 ml-auto" />
                                                                )}
                                                            </label>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* UPLOAD GAMBAR */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
                                        Cover Image (Biarkan kosong jika tidak
                                        diubah)
                                    </label>
                                    <input
                                        type="file"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                    {errors.image && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {errors.image}
                                        </div>
                                    )}
                                </div>

                                {/* KONTEN */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Narasi Berita
                                    </label>
                                    <textarea
                                        rows={10}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.content}
                                        onChange={(e) =>
                                            setData("content", e.target.value)
                                        }
                                    />
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
                                            <Save className="w-4 h-4 mr-2" />{" "}
                                            Simpan Perubahan
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
