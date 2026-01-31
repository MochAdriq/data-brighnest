<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            
            // 1. Identitas Pengupload (Relasi ke User Admin)
            // Cascade on delete artinya: kalau User dihapus, data surveinya ikut kehapus (biar bersih)
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 

            // 2. Metadata Data (Yang diisi di Form)
            $table->string('title');        // Judul
            $table->string('categories');     // Kategori Utama
            $table->string('subcategory');  // Sub Kategori
            $table->string('period');       // Periode (Jan 2026)
            $table->string('pic');          // Penanggung Jawab
            $table->text('description')->nullable(); // Catatan (Boleh kosong)

            // 3. Tipe Survei (Untuk klasifikasi di masa depan)
            // Default kita set 'umum' dulu
            $table->enum('tipe_survei', ['umum', 'siswa_sma', 'mahasiswa', 'publik'])->default('umum');

            // 4. INI DIA: GUDANG DATANYA (JSON)
            // Kita pakai longText biar muat jutaan karakter jawaban Excel
            $table->longText('data_survei'); 

            $table->timestamps(); // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};