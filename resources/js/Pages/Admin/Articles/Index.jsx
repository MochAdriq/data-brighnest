import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, FileText, BarChart3, Eye } from "lucide-react";

export default function ArticleIndex({ auth, articles }) {
    // Helper: Handle data pagination atau array biasa
    const dataList = articles.data ? articles.data : articles;
    const meta = articles.meta ? articles.meta : null;
    const links = articles.links ? articles.links : null;

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
            router.delete(route("articles.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-xl text-gray-800 leading-tight flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-blue-600" />
                        Manajemen Artikel Data
                    </h2>
                    <Link
                        href={route("articles.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Buat Baru
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Artikel" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Flash Message */}
                    {usePage().props.flash.success && (
                        <div
                            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                            role="alert"
                        >
                            <span className="block sm:inline">
                                {usePage().props.flash.success}
                            </span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Judul & Penulis
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Konfigurasi Data
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataList.length > 0 ? (
                                        dataList.map((article) => (
                                            <tr
                                                key={article.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        {article.image ? (
                                                            <img
                                                                className="h-10 w-10 rounded-lg object-cover mr-3"
                                                                src={`/storage/${article.image}`}
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center mr-3 text-gray-400">
                                                                <FileText className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-bold text-gray-900 line-clamp-1">
                                                                {article.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                Oleh:{" "}
                                                                {
                                                                    article.user
                                                                        ?.name
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {article.chart_config
                                                        ?.tipe &&
                                                    article.chart_config
                                                        .tipe !== "none" ? (
                                                        <div className="flex flex-col items-start gap-1">
                                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                                {article
                                                                    .chart_config
                                                                    .tipe ===
                                                                "siswa_sma"
                                                                    ? "🎓 Siswa SMA"
                                                                    : "👥 Umum"}
                                                            </span>
                                                            <span className="text-xs text-gray-500 flex items-center">
                                                                <BarChart3 className="w-3 h-3 mr-1" />
                                                                {article
                                                                    .chart_config
                                                                    .variables
                                                                    ?.length ||
                                                                    0}{" "}
                                                                Grafik
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                            Teks Biasa
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(
                                                        article.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <a
                                                            href={route(
                                                                "articles.show.public",
                                                                article.slug,
                                                            )}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-md hover:bg-green-100 transition"
                                                            title="Lihat di Web"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </a>
                                                        <Link
                                                            href={route(
                                                                "articles.edit",
                                                                article.id,
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md hover:bg-indigo-100 transition"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    article.id,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md hover:bg-red-100 transition"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-10 text-center text-gray-500 italic"
                                            >
                                                Belum ada artikel yang dibuat.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINATION (Jika ada) */}
                        {links && links.length > 3 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-wrap gap-1 justify-center sm:justify-end">
                                    {links.map((link, key) =>
                                        link.url === null ? (
                                            <span
                                                key={key}
                                                className="px-3 py-1 text-sm text-gray-400 border rounded bg-gray-50"
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ) : (
                                            <Link
                                                key={key}
                                                href={link.url}
                                                className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${link.active ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" : "text-gray-600 bg-white"}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
