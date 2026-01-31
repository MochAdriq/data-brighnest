<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Survey;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;

class ArticleController extends Controller
{
    // DAFTAR KOLOM "VIP" (Kolom Asli di Tabel, Bukan JSON)
    private $vipColumns = [
        'jenis_kelamin', 'usia', 'domisili', 'status_pernikahan', 'agama', 
        'pendidikan_terakhir', 'pekerjaan_utama', 'pengeluaran_per_bulan', 
        'jumlah_tanggungan', 'suku_bangsa'
    ];
    

    // --- PRIVATE HELPER: SCANNER DATA (VIP + JSON) ---
    private function getMetaConfig()
    {
        $formatLabel = function ($key) {
            return ucwords(str_replace(['_', '-'], ' ', $key));
        };

        $scanTipe = function ($tipe) use ($formatLabel) {
            $sample = Survey::where('tipe_survei', $tipe)->latest()->first();
            $filters = [];   
            $variables = []; 

            // --- A. SCAN KOLOM VIP (REAL COLUMNS) ---
            if ($sample) {
                foreach ($this->vipColumns as $col) {
                    if (isset($sample->$col) || $sample->$col === null) { 
                        $label = $formatLabel($col);
                        try {
                            $uniqueValues = Survey::where('tipe_survei', $tipe)
                                ->select($col)
                                ->distinct()
                                ->limit(101)
                                ->pluck($col)
                                ->filter()
                                ->values()
                                ->toArray();

                            if (count($uniqueValues) > 0) {
                                $filters[$label] = [
                                    'key' => $col,      
                                    'is_vip' => true,   
                                    'options' => $uniqueValues
                                ];
                                $variables[$label] = $col;
                            }
                        } catch (\Exception $e) { continue; }
                    }
                }
            }

            // --- B. SCAN JSON DATA (SISA PERTANYAAN) ---
            $profilingKeywords = [
                'kelamin', 'gender', 'usia', 'umur', 'domisili', 'asal', 'wilayah', 'kabupaten', 'kota', 
                'agama', 'religi', 'suku', 'bangsa', 'status', 'kawin', 'nikah', 'pendidikan', 'ijazah', 
                'pekerjaan', 'profesi', 'pengeluaran', 'belanja', 'penghasilan', 'gaji', 'income', 
                'keuangan', 'tanggungan', 'cicilan', 'utang', 'rumah', 'hunian', 'kendaraan', 'mobil', 'motor',
                'sekolah', 'jurusan', 'prodi', 'nilai', 'rapor', 'skor', 'kuliah', 'kampus', 
                'provider', 'device', 'perangkat', 'hp', 'os', 'sistem', 'medsos', 'media_sosial'
            ];

            if ($sample && is_array($sample->data_survei)) {
                $blacklist = ['id', 'uuid', 'created_at', 'updated_at', 'email', 'password', 'token', 'user_id', 'nama', 'nama_lengkap', 'nik', 'no_hp', 'alamat_lengkap'];

                foreach ($sample->data_survei as $key => $value) {
                    if (in_array(strtolower($key), $blacklist)) continue;
                    $keyLower = strtolower($key);
                    $label = $formatLabel($key);

                    // Cek Profiling (JSON)
                    $isProfiling = false;
                    foreach ($profilingKeywords as $keyword) {
                        if (str_contains($keyLower, $keyword)) {
                            $isProfiling = true;
                            break;
                        }
                    }

                    if ($isProfiling) {
                        try {
                            $uniqueValues = Survey::where('tipe_survei', $tipe)
                                ->selectRaw("DISTINCT JSON_UNQUOTE(JSON_EXTRACT(data_survei, '$.\"$key\"')) as val")
                                ->limit(101)->pluck('val')->filter()->values()->toArray();

                            if (count($uniqueValues) > 0 && count($uniqueValues) <= 100) {
                                $filters[$label] = [
                                    'key' => $key,
                                    'is_vip' => false, 
                                    'options' => $uniqueValues
                                ];
                            }
                        } catch (\Exception $e) { continue; }
                    }

                    if (is_numeric($value) || (is_string($value) && strlen($value) <= 50)) {
                        $variables[$label] = $key;
                    }
                }
            }
            return ['filters' => $filters, 'variables' => $variables];
        };

        return [
            'siswa_sma' => $scanTipe('siswa_sma'),
            'umum' => $scanTipe('umum')
        ];
    }
    // ------------------------------------------------

    public function index()
    {
        $articles = Article::with(['user', 'category'])->latest()->paginate(10);
        return Inertia::render('Admin/Articles/Index', ['articles' => $articles]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create', [
            'metaConfig' => $this->getMetaConfig(),
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'   => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id', 
            'content' => 'required',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'chart_config' => 'nullable|array',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        Article::create([
            'user_id'   => auth()->id(),
            'category_id' => $request->category_id, 
            'title'     => $request->title,
            'slug'      => Str::slug($request->title) . '-' . time(),
            'content'   => $request->content,
            'excerpt'   => Str::limit(strip_tags($request->content), 150),
            'image'     => $imagePath,
            'status'    => 'published',
            'chart_config' => $request->chart_config,
        ]);

        return redirect()->route('articles.index')->with('success', 'Artikel berhasil diterbitkan!');
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
            'metaConfig' => $this->getMetaConfig(),
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id', 
            'title'   => 'required|string|max:255',
            'content' => 'required',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'chart_config' => 'nullable|array',
        ]);

        $imagePath = $article->image;
        if ($request->hasFile('image')) {
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article->update([
            'category_id' => $request->category_id, 
            'title'     => $request->title,
            'slug'      => Str::slug($request->title) . '-' . time(),
            'content'   => $request->content,
            'excerpt'   => Str::limit(strip_tags($request->content), 150),
            'image'     => $imagePath,
            'chart_config' => $request->chart_config,
        ]);

        return redirect()->route('articles.index')->with('success', 'Artikel berhasil diperbarui!');
    }

    public function destroy(Article $article)
    {
        if ($article->image && Storage::disk('public')->exists($article->image)) {
            Storage::disk('public')->delete($article->image);
        }
        $article->delete();
        return redirect()->back()->with('success', 'Artikel dihapus.');
    }

    // Fungsi ini dipakai oleh Admin (Preview) dan Public (Show)
    private function calculateChartData($tipe, $filters, $variables)
    {
        if (!$tipe || empty($variables)) return [];

        $results = [];
        $query = Survey::where('tipe_survei', $tipe);

        // 1. TERAPKAN FILTER
        if (!empty($filters)) {
            foreach ($filters as $f) {
                if (!empty($f['key']) && !empty($f['value'])) {
                    
                    $isVipMode = in_array($f['key'], $this->vipColumns) && $tipe === 'umum';

                    if ($isVipMode) {
                        $query->where($f['key'], $f['value']); 
                    } else {
                        $query->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(data_survei, '$.\"{$f['key']}\"')) = ?", [$f['value']]);
                    }
                }
            }
        }

        // 2. HITUNG AGREGASI
        foreach ($variables as $varKey) {
            
            $isVipMode = in_array($varKey, $this->vipColumns) && $tipe === 'umum';

            if ($isVipMode) {
                $selectRaw = "$varKey as label, COUNT(*) as total";
            } else {
                $selectRaw = "JSON_UNQUOTE(JSON_EXTRACT(data_survei, '$.\"$varKey\"')) as label, COUNT(*) as total";
            }

            $distribusi = (clone $query)
                ->selectRaw($selectRaw)
                ->groupBy('label')
                ->orderBy('total', 'desc')
                ->limit(10)
                ->get();

            $results[$varKey] = [
                'labels' => $distribusi->pluck('label'),
                'values' => $distribusi->pluck('total')
            ];
        }

        return $results;
    }

    // --- API ADMIN: PREVIEW CHART ---
    public function previewChartData(Request $request)
    {
        $data = $this->calculateChartData($request->tipe, $request->filters, $request->variables);
        return response()->json(['status' => 'success', 'data' => $data]);
    }

    // --- HALAMAN PUBLIK: BACA BERITA ---
    public function showPublic($slug)
    {
        // 1. Cari Artikel
        $article = Article::where('slug', $slug)
            ->where('status', 'published')
            ->with(['user', 'category'])
            ->firstOrFail();

        // 2. Increment Views (+1)
        $article->increment('views');

        // 3. Hitung Data Grafik (Real-time)
        $chartData = null;
        if (!empty($article->chart_config) && $article->chart_config['tipe'] !== 'none') {
            $config = $article->chart_config;
            $chartData = $this->calculateChartData(
                $config['tipe'], 
                $config['filters'] ?? [], 
                $config['variables'] ?? []
            );
        }

        // --- TAMBAHAN: MOST POPULAR ---
        $popularArticles = Article::where('status', 'published')
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Public/ArticleShow', [
            'article' => $article,
            'chartData' => $chartData,
            'popularArticles' => $popularArticles // <--- Dikirim ke Frontend
        ]);
    }
    
    // --- HALAMAN KATEGORI ---
    public function showCategory($slug)
    {
        // 1. Cari Kategori berdasarkan Slug
        $category = Category::where('slug', $slug)->firstOrFail();

        // 2. Ambil Artikel yang punya kategori ini
        $articles = Article::where('category_id', $category->id)
            ->where('status', 'published')
            ->with('user') 
            ->latest()
            ->paginate(9); 

        // --- TAMBAHAN: MOST POPULAR ---
        $popularArticles = Article::where('status', 'published')
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        // 3. Render Tampilan
        return Inertia::render('Public/CategoryShow', [
            'category' => $category,
            'articles' => $articles,
            'popularArticles' => $popularArticles // <--- Dikirim ke Frontend
        ]);
    }

    // --- HALAMAN PENCARIAN ---
    public function search(Request $request)
    {
        $query = $request->input('q');

        $articles = Article::where('status', 'published')
            ->where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%")
                  ->orWhereHas('category', function($q) use ($query){
                      $q->where('name', 'like', "%{$query}%");
                  });
            })
            ->with(['category', 'user'])
            ->latest()
            ->paginate(12);
        
        // --- TAMBAHAN: MOST POPULAR ---
        $popularArticles = Article::where('status', 'published')
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Public/SearchShow', [
            'articles' => $articles,
            'query' => $query,
            'popularArticles' => $popularArticles // <--- Dikirim ke Frontend
        ]);
    }
}