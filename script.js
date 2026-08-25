// Fungsi untuk mengganti pilihan motor yang aktif (warna biru)
function pilihMotor(tipe, element) {
    document.getElementById('selected-motor').value = tipe;
    
    // Hapus warna biru dari semua kartu
    const cards = document.querySelectorAll('.motor-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    // Tambahkan warna biru ke kartu yang barusan diklik
    element.classList.add('selected');
}
// Database Efisiensi Motor (Km per Liter) - 
const motorDB = {
    beat_karbu:    { konsumsi: 35 }, // Beat Karbu 2008-2012 
    beat_deluxe:   { konsumsi: 58 }, // Beat Deluxe CBS ISS 
    vario_125_old: { konsumsi: 43 }, // Vario 125 Old 
    vario_150:     { konsumsi: 41 }, // Vario 150 
    pcx_150:       { konsumsi: 40 }, // PCX 150 
    nmax_155:      { konsumsi: 38 }  // NMAX 155 
};

const hargaPerLiter = 10000; 

// Fungsi untuk merubah angka biasa jadi format Rupiah (Rp)
function formatRp(angka) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(angka);
}

// Fungsi utama perhitungan
function hitungBensin() {
    const jarakSekaliJalan = parseFloat(document.getElementById('jarak').value) || 0;
    const tipeMotor = document.getElementById('selected-motor').value;
    const hargaFullTank = parseFloat(document.getElementById('harga_fulltank').value) || 0;

    const jarakPP = jarakSekaliJalan * 2;
    const spekMotor = motorDB[tipeMotor];
    
    // Kapasitas Tangki dari uang yang biasa dikeluarkan user
    const kapasitasTangki = hargaFullTank / hargaPerLiter;
    
    // Liter bensin yang benar-benar dibakar oleh mesin motor
    const literDibutuhkan = jarakPP / spekMotor.konsumsi;
    
    // Logika Realita: Berapa kali harus bayar isi full tank?
    // Math.ceil membulatkan ke atas (misal 1.2 kali isi, dibulatkan jadi 2 kali isi)
    let kaliMampirPom = kapasitasTangki > 0 ? Math.ceil(literDibutuhkan / kapasitasTangki) : 0;
    
    // Total uang riil yang dikeluarkan dari dompet di pom bensin
    const uangKeluar = kaliMampirPom * hargaFullTank;
    
    // Total bensin yang masuk ke tangki dari uang tersebut
    const totalLiterDidapat = kaliMampirPom * kapasitasTangki;

    // Menampilkan hasil hitungan ke layar (ke dalam struk)
    document.getElementById('res-jarak').innerText = `${jarakPP} Km`;
    document.getElementById('res-bakar').innerText = `${literDibutuhkan.toFixed(1)} Liter`;
    document.getElementById('res-frekuensi').innerText = `${kaliMampirPom}x Full Tank`;
    document.getElementById('res-total').innerText = formatRp(uangKeluar);
    document.getElementById('res-total-liter').innerText = `${totalLiterDidapat.toFixed(1)} Liter`;

    // Memunculkan kotak struk yang awalnya disembunyikan
    document.getElementById('receipt-box').style.display = 'block';
}
