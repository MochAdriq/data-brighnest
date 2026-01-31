<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SurveyController; // <--- Pastikan ini ada
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. HALAMAN DEPAN LANGSUNG LEMPAR KE LOGIN
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. DASHBOARD (Kosongin dulu biar gak error nyari artikel)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. JALUR KHUSUS DATA SURVEY (INI YANG BOSS MAU)
Route::middleware('auth')->group(function () {
    Route::get('/surveys', [SurveyController::class, 'index'])->name('surveys.index');
    Route::post('/surveys/import', [SurveyController::class, 'import'])->name('surveys.import');
});

// 4. PROFIL BAWAAN LARAVEL (Jangan dihapus biar ga error login)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// use App\Http\Controllers\ProfileController;
// use App\Http\Controllers\ArticleController;
// use App\Http\Controllers\SurveyController;
// use App\Http\Controllers\DashboardController; // <--- 1. JANGAN LUPA INI DITAMBAHKAN
// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use App\Models\Article;
// use App\Models\Category;


// // === 1. HALAMAN UTAMA (HOMEPAGE) ===
// // Route::get('/', function () {
// //     // A. Kategori
// //     $categories = Category::take(5)->get();

// //     // B. Hot Issue
// //     $featuredArticle = Article::where('status', 'published')->latest()->first();

// //     // C. Artikel Terbaru (Main Content)
// //     $articles = Article::with(['category', 'user'])
// //         ->where('status', 'published')
// //         ->latest()
// //         ->limit(9) 
// //         ->get();

// //     // D. Artikel Terpopuler (Sidebar Widget)
// //     $popularArticles = Article::where('status', 'published')
// //         ->orderBy('views', 'desc')
// //         ->take(5)
// //         ->get();

// //     return Inertia::render('Welcome', [
// //         'articles' => ['data' => $articles],
// //         'featuredArticle' => $featuredArticle,
// //         'categories' => $categories,
// //         'popularArticles' => $popularArticles, 
// //         'canLogin' => Route::has('login'),
// //         'canRegister' => Route::has('register'),
// //         'laravelVersion' => Application::VERSION,
// //         'phpVersion' => PHP_VERSION,
// //     ]);
// // });

// Route::get('/', function () {
//     return redirect()->route('login');
// });

// // === 2. HALAMAN PUBLIK LAINNYA ===
// Route::get('/search', [ArticleController::class, 'search'])->name('articles.search');
// Route::get('/category/{slug}', [ArticleController::class, 'showCategory'])->name('articles.category');
// Route::get('/read/{slug}', [ArticleController::class, 'showPublic'])->name('articles.show.public');


// // === 3. HALAMAN DASHBOARD ADMIN (BUTUH LOGIN) ===
// Route::middleware(['auth', 'verified'])->group(function () {
    
//     // A. DASHBOARD UTAMA (STATISTIK)
//     // Kita arahkan ke DashboardController yang baru kita buat
//     Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

//     // B. INPUT DATA (SURVEI) - INI YANG KEMARIN HILANG/MISSING
//     // Kita buat jalur khusus bernama 'surveys.index'
//     Route::get('/admin/surveys', [SurveyController::class, 'index'])->name('surveys.index'); 
//     Route::post('/surveys/import', [SurveyController::class, 'import'])->name('surveys.import');

//     // C. MANAJEMEN ARTIKEL
//     Route::resource('articles', ArticleController::class);
//     Route::post('/articles/chart-preview', [ArticleController::class, 'previewChartData'])->name('articles.preview-chart');

//     // D. PROFILE USER
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';