<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    
    protected $guarded = ['id'];

    // TAMBAHKAN CASTING INI
    protected $casts = [
        'chart_config' => 'array', // Biar otomatis jadi Array saat diambil
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function category() {
        return $this->belongsTo(Category::class);
    }
}