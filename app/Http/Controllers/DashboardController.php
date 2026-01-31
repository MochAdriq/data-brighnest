<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Survey;

class DashboardController extends Controller
{
    public function index()
    {
        // === HITUNG STATISTIK ===
        $stats = [
            'total_respondents' => Survey::count(), // Total Baris Data Mentah
            'total_articles'    => Article::count(),
            'total_views'       => Article::sum('views'),
            'latest_update'     => Survey::latest()->first()->created_at ?? null,
        ];

        // Ambil 5 data import terakhir buat list kecil
        $recentSurveys = Survey::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentSurveys' => $recentSurveys
        ]);
    }
}