<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    // public function share(Request $request): array
    // {
    //     return array_merge(parent::share($request), [
    //         'auth' => [
    //             'user' => $request->user(),
    //         ],
    //         // TAMBAHAN: Kirim Data Kategori ke Seluruh Halaman
    //         // 'globalCategories' => \App\Models\Category::orderBy('name')->get(),
            
    //         // Flash Message (Biar alert sukses muncul)
    //         'flash' => [
    //             'success' => fn () => $request->session()->get('success'),
    //             'error' => fn () => $request->session()->get('error'),
    //         ],
    //     ]);
    // }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            // 'categories' => \App\Models\Category::all(), <--- HAPUS ATAU KOMENTARI BARIS INI!!!
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
