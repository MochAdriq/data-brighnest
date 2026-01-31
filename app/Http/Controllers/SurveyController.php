<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index()
    {
        return Inertia::render('Surveys/Index');
    }

    public function import(Request $request)
    {
        // 1. Validasi Input Metadata
        $request->validate([
            'file' => 'required|mimes:csv,txt,xlsx,xls',
            'title' => 'required|string',
            'category' => 'required|string',
            'subcategory' => 'required|string',
            'period' => 'required|string',
            'pic' => 'required|string',
            'description' => 'nullable|string',
        ]);

        try {
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();

            // Cek apakah file adalah CSV/TXT (Sesuai contoh file Boss)
            if (in_array(strtolower($extension), ['csv', 'txt'])) {
                
                $path = $file->getRealPath();
                $data = array_map('str_getcsv', file($path));
                
                if (count($data) > 0) {
                    $header = $data[0]; // Baris pertama adalah Header Excel
                    
                    // --- STEP PENTING: BERSIHKAN HEADER ---
                    // Mengubah "Nama Lengkap" jadi "nama_lengkap" agar mudah dicocokkan
                    $cleanHeader = array_map(function($h) {
                        return strtolower(trim(str_replace(' ', '_', $h)));
                    }, $header);

                    unset($data[0]); // Hapus baris header dari data array
                    
                    $batchData = [];
                    foreach ($data as $row) {
                        // Pastikan jumlah kolom data sama dengan jumlah header
                        if (count($header) == count($row)) {
                            
                            // 1. Array Konten Asli (Untuk disimpan ke JSON)
                            $originalContent = array_combine($header, $row);

                            // 2. Array Konten Bersih (Untuk deteksi kolom spesifik)
                            $mappedContent = array_combine($cleanHeader, $row);
                            
                            $batchData[] = [
                                // === A. METADATA FORM (Dari Inputan Boss) ===
                                'title'       => $request->title,
                                'category'    => $request->category,
                                'subcategory' => $request->subcategory,
                                'period'      => $request->period,
                                'pic'         => $request->pic,
                                'description' => $request->description,
                                
                                // === B. IDENTITAS SISTEM ===
                                'user_id'     => Auth::id(), 
                                'tipe_survei' => 'umum',
                                
                                // === C. AUTOMATIC MAPPING (Hibrid) ===
                                // Sistem mencoba mencari kolom Excel yang cocok dengan Database
                                // Operator '??' artinya: Coba cari 'usia', kalau gak ada cari 'umur', kalau gak ada NULL.
                                'jenis_kelamin'       => $mappedContent['jenis_kelamin'] ?? $mappedContent['gender'] ?? $mappedContent['jk'] ?? null,
                                'usia'                => $mappedContent['usia'] ?? $mappedContent['umur'] ?? null,
                                'domisili'            => $mappedContent['domisili'] ?? $mappedContent['alamat'] ?? $mappedContent['kota'] ?? null,
                                'status_pernikahan'   => $mappedContent['status_pernikahan'] ?? $mappedContent['status'] ?? null,
                                'agama'               => $mappedContent['agama'] ?? null,
                                'pendidikan_terakhir' => $mappedContent['pendidikan_terakhir'] ?? $mappedContent['pendidikan'] ?? null,
                                'pekerjaan_utama'     => $mappedContent['pekerjaan_utama'] ?? $mappedContent['pekerjaan'] ?? null,
                                'pengeluaran_per_bulan' => $mappedContent['pengeluaran_per_bulan'] ?? $mappedContent['pengeluaran'] ?? null,
                                'jumlah_tanggungan'   => $mappedContent['jumlah_tanggungan'] ?? $mappedContent['tanggungan'] ?? null,
                                'suku_bangsa'         => $mappedContent['suku_bangsa'] ?? $mappedContent['suku'] ?? null,
                                
                                // === D. JSON WRAPPER (Data Cadangan) ===
                                // Semua data (termasuk yang tidak terpetakan) masuk ke sini
                                'data_survei' => json_encode($originalContent),
                                
                                'created_at'  => now(),
                                'updated_at'  => now(),
                            ];
                        }
                    }

                    // Insert Massal (Lebih cepat daripada insert satu-satu)
                    if (count($batchData) > 0) {
                        Survey::insert($batchData);
                    }
                }
            } else {
                return back()->with('error', 'Format file harus .CSV dulu ya Boss!');
            }

            return redirect()->back()->with('success', 'Sukses! Data tersimpan di kolom Spesifik & JSON.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }
}