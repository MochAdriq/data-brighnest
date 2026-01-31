<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder; 
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder 
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cats = [
            'Umum', 
            'Pemerintahan & Politik', 
            'Infrastruktur', 
            'Ekonomi', 
            'Bisnis & Industri', 
            'Pendidikan', 
            'Sosial & Kesejahteraan'
        ];

        foreach ($cats as $c) {
            Category::firstOrCreate([
                'name' => $c,
                'slug' => Str::slug($c)
            ]);
        }
    }
}