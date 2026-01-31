<?php

namespace App\Imports;

use App\Models\Survey;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SurveyImport implements ToModel, WithHeadingRow
{
    private $tipe; // Variabel penampung tipe

    // 1. KONSTRUKTOR: Menerima tipe dari Controller
    public function __construct($tipe)
    {
        $this->tipe = $tipe;
    }

    /**
     * KAMUS UMUM (Dictionary yang sudah ada)
     */
    private $dictionaryUmum = [
        '11_secara_umum_apakah_anda_merasa_daerah_ini_bergerak_ke_arah_yang_benar_atau_salah' => 'arah_pembangunan_daerah',
        '12_seberapa_puas_anda_dengan_kinerja_kepala_daerah_bupatiwalikota_saat_ini' => 'kepuasan_kepala_daerah',
        '13_bagaimana_penilaian_anda_terhadap_kondisi_infrastruktur_jalan_di_lingkungan_anda' => 'kondisi_infrastruktur_jalan',
        '14_seberapa_mudah_akses_layanan_kesehatan_puskesmasrsud_di_daerah_anda' => 'akses_layanan_kesehatan',
        '15_apakah_anda_merasa_aman_dari_tindak_kejahatan_di_lingkungan_tempat_tinggal_anda' => 'rasa_aman',
        '16_seberapa_penting_menurut_anda_pendidikan_dinibimbel_bagi_anak_usia_dini' => 'pentingnya_pendidikan_dini',
        '17_menurut_anda_apa_masalah_paling_prioritas_yang_gagal_diselesaikan_pemerintah_saat_ini' => 'masalah_prioritas',
        '18_seberapa_bersih_birokrasi_pemerintah_daerah_anda_dari_praktik_punglikorupsi' => 'kebersihan_birokrasi',
        '19_bagaimana_kinerja_pemerintah_dalam_menangani_masalah_lingkungan' => 'kinerja_lingkungan',
        '20_apakah_anda_mengenal_nama_anggota_dewan_dpr_ri_yang_mewakili_daerah_anda' => 'kenal_dpr_ri',
        '21_sebutkan_tambah_tabel_setiap_anggota' => 'nama_dpr_ri',
        '22_apakah_anda_mengenal_nama_anggota_dewan_dprd_yang_mewakili_daerah_anda' => 'kenal_dprd',
        '23_sebutkan' => 'nama_dprd',
        '24_jika_pemilu_diadakan_hari_ini_apakah_anda_akan_memilih_kembali_petahana_incumbent' => 'pilih_petahana',
        '25_jika_tidak_siapa_yang_akan_anda_pilih' => 'pilihan_alternatif',
        '26_faktor_apa_yang_paling_mempengaruhi_pilihan_politik_anda' => 'faktor_pilihan_politik',
        '27_bagaimana_sikap_anda_terhadap_praktik_serangan_fajar_politik_uang' => 'sikap_politik_uang',
        '28_seberapa_percaya_anda_pada_institusi_kepolisian_saat_ini' => 'kepercayaan_polisi',
        '29_seberapa_percaya_anda_pada_komisi_pemilihan_umum_kpubawaslu' => 'kepercayaan_kpu',
        '30_seberapa_puas_anda_dengan_pemerintahan_prabowogibran' => 'kepuasan_pemerintah_pusat',
        '31_apakah_anda_setuju_dengan_program_mbg' => 'setuju_program_mbg',
        '32_apakah_anda_merasa_aspirasikritik_anda_didengar_oleh_pemerintah_setempat' => 'aspirasi_didengar',

        '33_bagaimana_kondisi_keuangan_anda_dibandingkan_setahun_yang_lalu' => 'kondisi_keuangan',
        '34_apakah_anda_memiliki_dana_darurat_yang_cukup_untuk_hidup_3_bulan_tanpa_penghasilan' => 'punya_dana_darurat',
        '35_seberapa_besar_kekhawatiran_anda_terhadap_ancaman_resesi_ekonomi_tahun_depan' => 'kekhawatiran_resesi',
        '36_apa_pos_pengeluaran_terbesar_dalam_anggaran_bulanan_anda' => 'pos_pengeluaran_terbesar',
        '37_apakah_anda_memiliki_cicilanutang_yang_sedang_berjalan_saat_ini' => 'punya_cicilan',
        '38_apakah_anda_memiliki_sumber_penghasilan_tambahan_selain_pekerjaan_utama_side_hustle' => 'punya_side_hustle',
        '39_instrumen_investasi_apa_yang_anda_miliki_saat_ini' => 'instrumen_investasi',
        '40_apakah_kenaikan_harga_bbmlistrik_sangat_mempengaruhi_pola_konsumsi_anda' => 'dampak_kenaikan_bbm',
        '41_berapa_persen_dari_penghasilan_bulanan_yang_bisa_anda_tabung' => 'persentase_tabungan',
        '42_apakah_anda_merasa_harga_sembako_saat_ini_terjangkau' => 'harga_sembako_terjangkau',
        '43_apakah_anda_menggunakan_fitur_paylater_untuk_kebutuhan_konsumtif' => 'guna_paylater',
        '44_apakah_anda_memiliki_rencana_untuk_pembelian_mobil_dalam_1_tahun_ke_depan' => 'rencana_beli_mobil',
        '45_apa_merek_jenis_mobil_favorit_anda' => 'merek_mobil_favorit',
        '46_apakah_anda_memiliki_rencana_untuk_pembelian_motor_dalam_1_tahun_ke_depan' => 'rencana_beli_motor',
        '47_apa_merek_jenis_motor_favorit_anda' => 'merek_motor_favorit',
        '48_apakah_anda_memiliki_rencana_untuk_pembelian_rumah_dalam_1_tahun_ke_depan' => 'rencana_beli_rumah',
        '49_apa_jenis_tempat_tinggal_yang_lebih_anda_minati' => 'jenis_hunian_minat',
        '50_apakah_anda_merasa_lapangan_pekerjaan_mudah_didapatkan_saat_ini' => 'ketersediaan_lapangan_kerja',
        '51_seberapa_bergantung_anda_pada_bantuan_sosial_bansos_pemerintah' => 'ketergantungan_bansos',

        '52_berapa_jam_sehari_anda_menghabiskan_waktu_menatap_layar_hp_screen_time' => 'screen_time',
        '53_media_sosial_mana_yang_menjadi_sumber_berita_utama_anda' => 'sumber_berita_medsos',
        '54_jenis_konten_apa_yang_paling_anda_sukai' => 'konten_favorit',
        '55_apakah_anda_sering_membagikan_share_berita_politiksosial_di_akun_pribadi_anda' => 'sering_share_politik',
        '56_seberapa_percaya_anda_pada_berita_yang_beredar_di_grup_whatsapp_keluarga' => 'percaya_grup_wa',
        '57_provider_jaringan_internet_apa_yang_anda_pakai_saat_ini' => 'provider_internet',
        '58_apakah_anda_menggunakan_vpn_saat_berselancar_di_internet' => 'guna_vpn',
        '59_jam_berapa_biasanya_anda_paling_aktif_membuka_media_sosial' => 'jam_aktif_medsos',
        '60_apakah_anda_mengikuti_follow_akun_media_sosial_resmi_pemerintahpejabat_publik' => 'follow_akun_pemerintah',
        '61_konten_iklan_seperti_apa_yang_membuat_anda_berhenti_scrolling_dan_menonton' => 'iklan_penarik_perhatian',
        '62_apakah_anda_berlangganan_layanan_streaming_berbayar_netflixspotifydisney' => 'langganan_streaming',
        '63_seberapa_sering_anda_mendengarkan_radio_konvensional' => 'dengar_radio',
        '64_apakah_anda_masih_membaca_koran_cetak' => 'baca_koran',
        '65_media_lokal_apa_yang_sering_anda_kunjungitabel_setiap_platform' => 'media_lokal_favorit',
        '66_bagaimana_pendapat_anda_tentang_privasi_data_pribadi_anda_di_internet' => 'concern_privasi_data',
        '67_siapa_tokoh_publik_nasional_yang_berpengaruh_positif_untuk_anda_saat_ini' => 'tokoh_nasional_positif',
        '68_siapa_tokoh_publik_lokal_yang_berpengaruh_positif_untuk_anda_saat_ini' => 'tokoh_lokal_positif',
        '69_tokoh_publikselebriti_mana_yang_menurut_anda_paling_berpengaruh_positif_saat_ini_tabel_setiap_opsi_yang_diketahui' => 'selebriti_positif',

        // --- BAGIAN 4: PERILAKU KONSUMEN (No 70-85) ---
        '70_berapa_persentase_belanja_anda_yang_dilakukan_secara_online_vs_offline' => 'persentase_belanja_online',
        '71_marketplace_mana_yang_paling_sering_anda_gunakan' => 'marketplace_utama',
        '72_apa_metode_pembayaran_favorit_anda' => 'metode_pembayaran',
        '73_seberapa_sering_anda_menggunakan_layanan_pesan_antar_makanan_gofoodgrabfoodshopeefood' => 'frekuensi_food_delivery',
        '74_apakah_anda_bersedia_membayar_lebih_mahal_untuk_produk_yang_ramah_lingkungan' => 'bayar_lebih_eco_friendly',
        '75_dalam_membeli_produk_elektronikgadget_faktor_apa_yang_paling_penting' => 'faktor_beli_gadget',
        '76_seberapa_besar_pengaruh_influencerreviewer_terhadap_keputusan_pembelian_anda' => 'pengaruh_influencer',
        '77_apakah_anda_cenderung_setia_pada_satu_merek_atau_suka_berganti_ganti_mencoba_merek_baru' => 'loyalitas_merek',
        '78_dimana_anda_biasanya_membeli_produk_skincare_atau_perawatan_tubuh' => 'tempat_beli_skincare',
        '79_seberapa_penting_promo_gratis_ongkir_dalam_keputusan_belanja_online_anda' => 'pentingnya_gratis_ongkir',
        '80_apakah_anda_pernah_berbelanja_melalui_live_shopping_tiktok_liveshopee_live' => 'belanja_live_shopping',
        '81_kategori_produk_apa_yang_tidak_akan_pernah_anda_beli_secara_online' => 'produk_anti_online',
        '82_seberapa_sering_anda_berbelanja_di_mall_city_mall_toserba_yogya_dalam_seminggu' => 'frekuensi_ke_mall',
        '83_apa_yang_anda_harapkan_jika_mengunjungi_mall' => 'tujuan_ke_mall',
        '84_seberapa_sering_anda_berbelanja_di_minimarket_indomaretalfamart_dalam_seminggu' => 'frekuensi_minimarket',
        '85_bagaimana_reaksi_anda_jika_merek_favorit_anda_menaikkan_harga_sebesar_10' => 'reaksi_kenaikan_harga',
    ];

private $dictionarySMA = [
        // --- DATA PRIBADI & SEKOLAH ---
        'timestamp' => 'timestamp', 
        'score' => 'score', 
        'nama_lengkap' => 'nama_lengkap', 
        'jenis_kelamin' => 'jenis_kelamin', 
        'no_handphone_wa' => 'no_hp', 
        'nama_sekolah' => 'nama_sekolah', 
        'jurusan_sekolah' => 'jurusan', 
        'rata_rata_nilai_rapor_semester_1_5' => 'nilai_rapor', 
        'mata_pelajaran_favorit_1' => 'mapel_fav_1', 
        'mata_pelajaran_favorit_2' => 'mapel_fav_2', 
        'email_address' => 'email',

        // --- MINAT & BAKAT (RIASEC) ---
        'tipe_realistik_teknispraktis' => 'tipe_realistik', 
        'tipe_investigatif_risetintelektual' => 'tipe_investigatif', 
        'tipe_artistik_kreatifestetika' => 'tipe_artistik', 
        'tipe_sosial_membantumelayani' => 'tipe_sosial', 
        'tipe_kewirausahaan_enterprisingmemimpin' => 'tipe_kewirausahaan', 
        'tipe_konvensional_terstrukturdetail' => 'tipe_konvensional', 

        // --- SKILL & KEMAMPUAN ---
        'saya_dapat_menganalisis_data_statistik_atau_grafik_dengan_mudah' => 'skill_analisis_data', 
        'saya_memiliki_ide_ide_orisinal_dan_unik_kreativitas_tinggi' => 'skill_kreativitas', 
        'saya_ahli_dalam_bernegosiasi_dan_menyelesaikan_konflik' => 'skill_negosiasi', 
        'saya_mampu_mengoperasikan_atau_memperbaiki_masalah_teknis_pada_komputergadget' => 'skill_teknis_gadget', 
        'saya_mudah_menghafal_mengelola_dan_mengingat_informasi_yang_banyak' => 'skill_memori', 
        'saya_dapat_membuat_presentasi_yang_menarik_dan_persuasif' => 'skill_presentasi', 
        'saya_menguasai_minimal_satu_bahasa_asing_selain_bahasa_indonesia' => 'skill_bahasa_asing', 
        'saya_sering_menjadi_pengurus_atau_panitia_dalam_kegiatan_sekolah' => 'pengalaman_organisasi', 
        'saya_memiliki_tingkat_fokus_dan_ketelitian_yang_sangat_baik_pada_detail' => 'skill_ketelitian', 

        // --- RENCANA KULIAH ---
        'apakah_anda_sudah_melanjutkan_ke_perguruan_tinggi_pt' => 'status_lanjut_kuliah', 
        'jika_lanjut_pt_jenjang_pendidikan_tertinggi_yang_anda_targetkan' => 'target_jenjang_kuliah', 
        'tiga_3_jurusan_kuliah_program_studi_yang_paling_anda_pertimbangkan_saat_ini_sebutkan_secara_spesifik_contoh_teknik_sipil_ilmu_komunikasi_akuntansi' => 'minat_3_jurusan', 
        'pilihan_utama_anda_saat_ini_cenderung_ke_arah_pilih_salah_satu' => 'bidang_pilihan_utama', 
        'faktor_paling_dominan_yang_memengaruhi_pilihan_studi_dan_karier_anda' => 'faktor_pilihan_karier', 
        'setelah_lulus_kuliah_apa_target_karier_utama_anda' => 'target_karier', 
        'apakah_anda_mempertimbangkan_untuk_melanjutkan_studi_di_luar_negeri' => 'minat_kuliah_luar_negeri', 

        // --- PERSEPSI KULIAH DI SUKABUMI ---
        'apakah_anda_mempertimbangkan_untuk_melanjutkan_kuliah_di_perguruan_tinggi_yang_berada_di_wilayah_kotakabupaten_sukabumi' => 'minat_kuliah_di_sukabumi', 
        'jika_anda_memilih_kuliah_di_sukabumi_apa_alasan_utamanya_pilih_maksimal_2' => 'alasan_pilih_sukabumi', 
        'faktor_apa_yang_membuat_anda_ragu_atau_tidak_memilih_kuliah_di_sukabumi_pilih_maksimal_2' => 'alasan_ragu_sukabumi', 
        'jenis_perguruan_tinggi_lokal_di_sukabumi_yang_paling_anda_minati' => 'jenis_pt_sukabumi_minat', 
        'perguruan_tinggi_apa_di_sukabumi_yang_paling_anda_ketahui_keberadaannya_sebutkan_3' => 'pt_sukabumi_dikenal', 
        'jurusanprogram_studi_dan_perguruan_tinggi_apa_di_sukabumi_yang_paling_anda_ketahui_keberadaannya_sebutkan_1' => 'prodi_sukabumi_dikenal', 
        'jika_ada_perguruan_tinggi_lokal_di_sukabumi_yang_menawarkan_jurusan_sesuai_minat_anda_seberapa_besar_kemungkinan_anda_memilihnya' => 'probabilitas_pilih_lokal', 
        'saran_anda_mengenai_perguruan_tinggi_di_sukabumi_tuliskan_secara_singkat_contoh_perlu_lebih_banyak_jurusan_teknikkesehatanekonomi' => 'saran_pt_sukabumi', 

        // --- MINAT STEM (SAINS & TEKNOLOGI) ---
        'saya_menikmati_tantangan_memecahkan_soal_soal_matematika_yang_kompleks' => 'minat_matematika', 
        'saya_sangat_tertarik_untuk_memahami_hukum_hukum_alam_fisika_dan_kimia_dan_proses_biologis' => 'minat_sains_alam', 
        'saya_suka_membaca_atau_menonton_berita_tentang_penemuan_ilmiah_terbaru' => 'minat_berita_sains', 
        'saya_mampu_berpikir_logis_dan_sistematis_dalam_menghadapi_masalah' => 'kemampuan_logika', 
        'saya_merasa_biologi_adalah_mata_pelajaran_yang_menarik_terutama_yang_berhubungan_dengan_tubuh_manusia_atau_lingkungan' => 'minat_biologi', 
        'saya_menikmati_merancang_membuat_model_atau_membangun_sesuatu_secara_fisik_engineering' => 'minat_engineering', 
        'saya_tertarik_untuk_belajar_coding_programming_atau_mengembangkan_aplikasiwebsite' => 'minat_coding', 
        'saya_senang_melakukan_eksperimen_di_lab_atau_di_rumah_untuk_melihat_hasil_nyata_dari_teori' => 'minat_eksperimen', 
        'saya_cenderung_ingin_tahu_bagaimana_cara_kerja_suatu_perangkat_teknologi_dan_suka_membongkarmemperbaikinya' => 'minat_hardware', 
        'saya_melihat_diri_saya_bekerja_sebagai_seorang_insinyur_programmer_atau_peneliti_di_masa_depan' => 'cita_cita_stem', 
        'saya_yakin_dengan_kemampuan_saya_untuk_unggul_di_jurusan_kuliah_yang_berbasis_stem' => 'confidence_stem', 
        'saya_menganggap_karier_di_bidang_stem_memiliki_masa_depan_yang_lebih_cerah_dan_menjanjikan' => 'persepsi_karier_stem', 
        'saya_bersedia_menghabiskan_banyak_waktu_untuk_mempelajari_konsep_stem_yang_sulit' => 'effort_belajar_stem', 

        // --- PREFERENSI KAMPUS ---
        'akreditasi_institusi_pt_dan_program_studi_jurusan_harus_a_atau_unggul' => 'pentingnya_akreditasi', 
        'reputasi_perguruan_tinggi_secara_nasional_masuk_daftar_pt_favoritterbaik' => 'pentingnya_reputasi', 
        'kualitas_dan_kompetensi_dosen_atau_pengajar_memiliki_gelar_s3profesor' => 'pentingnya_dosen', 
        'kurikulum_yang_relevan_dengan_kebutuhan_industri_dan_pasar_kerja_saat_ini' => 'pentingnya_kurikulum', 
        'kerjasama_internasional_dan_peluang_pertukaran_pelajar_student_exchange' => 'pentingnya_kerjasama_global', 
        'lokasi_kampus_ideal_anda' => 'lokasi_kampus_ideal', 
        'fasilitas_yang_paling_anda_harapkan_dari_kampus_pilih_maksimal_3' => 'fasilitas_kampus_harapan', 
        'lingkungan_pergaulan_yang_anda_harapkan' => 'lingkungan_kampus_harapan', 
        'model_pembelajaran_yang_anda_sukai' => 'model_belajar_fav', 
        'fasilitas_dukungan_karier_yang_anda_anggap_paling_penting_dari_kampus' => 'dukungan_karier_harapan', 
        'prioritas_dalam_memilih_beasiswabantuan_dana_pilih_salah_satu' => 'prioritas_beasiswa', 
        'seberapa_besar_harapan_anda_terhadap_kecepatan_dan_kemudahan_proses_administrasi_di_kampus' => 'harapan_layanan_admin', 

        // --- GAYA HIDUP DIGITAL ---
        'apa_perangkat_utama_primary_driver_yang_paling_sering_anda_gunakan_seharian' => 'device_utama', 
        'ekosistem_sistem_operasi_apa_yang_paling_dominan_anda_gunakan' => 'os_dominan', 
        'berapa_rata_rata_durasi_penggunaan_layar_screen_time_anda_dalam_sehari' => 'screen_time', 
        'media_sosial_mana_yang_menjadi_sumber_berita_utama_anda' => 'sumber_berita_medsos', 
        'jenis_hiburan_digital_apa_yang_paling_sering_anda_akses' => 'hiburan_digital_fav', 
        'provider_jaringan_internet_apa_yang_anda_pakai_saat_ini' => 'provider_internet', 
        'metode_pembayaran_apa_yang_paling_sering_anda_gunakan_saat_bertransaksi_sehari_hari' => 'metode_bayar_fav', 
        'genre_musik_apa_yang_paling_mendominasi_playlist_harian_anda' => 'genre_musik_fav', 
        'siapa_artis_musisi_atau_grup_favorit_yang_paling_anda_sukai_saat_ini_tuliskan_nama' => 'artis_fav', 
        'apakah_anda_tergabung_dalam_fandom_klub_penggemar_tertentu_secara_aktif' => 'join_fandom', 

        // --- PSIKOLOGI PENGGUNAAN HP ---
        'saya_merasa_gelisah_jika_tertinggal_smartphone_di_rumah_walau_hanya_sebentar' => 'nomophobia_level', 
        'hal_pertama_yang_saya_lakukan_saat_bangun_tidur_adalah_mengecek_notifikasi_hp' => 'cek_hp_bangun_tidur', 
        'saya_sering_mengecek_hp_di_tengah_percakapan_langsung_dengan_orang_lain_phubbing' => 'phubbing_behavior', 
        'saya_lebih_suka_membeli_makanan_secara_online_delivery_app_daripada_memasak_atau_beli_langsung' => 'habit_food_delivery', 
        'saya_sering_membeli_barang_yang_tidak_terlalu_dibutuhkan_hanya_karena_melihat_promoiklan_di_media_sosial_impulsive_buying' => 'habit_impulsive_buying', 
        'saya_jarang_membawa_uang_tunai_dalam_jumlah_banyak_di_dompet' => 'habit_cashless', 
        'saya_menggunakan_aplikasi_khusus_untuk_memantau_kesehatanolahraga_smartwatchhealth_app' => 'habit_health_app', 
        'saya_merasa_waktu_istirahat_saya_terganggu_karena_keasyikan_scrolling_media_sosial' => 'sleep_disruption', 
        'saya_lebih_nyaman_bekerjabelajar_secara_remote_waringwfa_dibanding_datang_ke_lokasi_fisik' => 'preferensi_wfa', 
        'saya_secara_rutin_melakukan_digital_detox_puasa_gadget_di_akhir_pekan' => 'habit_digital_detox', 
        
    ];
    public function model(array $row)
    {
        // 1. TENTUKAN DATA DEMOGRAFI (KURSI VIP)
        if ($this->tipe === 'siswa_sma') {
            
            // --- LOGIC KHUSUS SISWA ---
            $dataDemografi = [
                'user_id'       => Auth::id() ?? 1,
                'tipe_survei'   => 'siswa_sma',
                
      
            ];

            // KITA TIDAK BUTUH $profilSiswa MANUAL DISINI
            // Karena 'nama_sekolah', 'jurusan', dll SUDAH ADA di $dictionarySMA
            // Jadi otomatis masuk ke JSON di langkah ke-2.

        } else {
            // --- LOGIC UMUM (TETAP SEPERTI KEMARIN) ---
            $dataDemografi = [
                'user_id'       => Auth::id() ?? 1,
                'tipe_survei'   => 'umum',
                'jenis_kelamin' => $row['1_jenis_kelamin'] ?? null,
                'usia'          => $row['2_usia_anda_saat_ini'] ?? null,
                'domisili'      => $row['3_domisili_kabupatenkota'] ?? $row['3_domisili_kabupaten_kota'] ?? null,
                'status_pernikahan' => $row['4_status_pernikahan'] ?? null,
                'agama'         => $row['5_agama'] ?? null,
                'pendidikan_terakhir' => $row['6_pendidikan_terakhir'] ?? null,
                'pekerjaan_utama' => $row['7_pekerjaan_utama'] ?? null,
                'pengeluaran_per_bulan' => $row['8_rata_rata_pengeluaran_rumah_tangga_per_bulan'] ?? null,
                'jumlah_tanggungan' => $row['9_jumlah_tanggungan_dalam_keluarga'] ?? null,
                'suku_bangsa'   => $row['10_suku_bangsa_opsional'] ?? null,
            ];
        }

        // 2. PROSES KAMUS (JSON) - "Kantong Ajaib"
        $currentDictionary = ($this->tipe === 'siswa_sma') ? $this->dictionarySMA : $this->dictionaryUmum;
        
        $jsonData = [];
        foreach ($row as $key => $value) {
            // Cek apakah key excel ada di kamus kita?
            if (array_key_exists($key, $currentDictionary)) {
                $shortKey = $currentDictionary[$key];
                $jsonData[$shortKey] = $value;
            }
        }

        return new Survey(array_merge($dataDemografi, [
            'data_survei' => $jsonData, 
        ]));
    }
    
}