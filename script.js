function pilihMotor(tipe, element) {
    document.getElementById('selected-motor').value = tipe;
    const cards = document.querySelectorAll('.motor-card');
    cards.forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
}

const motorDB = {
    beat_karbu:    { konsumsi: 35 }, 
    beat_deluxe:   { konsumsi: 58 }, 
    vario_125_old: { konsumsi: 43 }, 
    vario_150:     { konsumsi: 41 }, 
    pcx_150:       { konsumsi: 40 }, 
    nmax_155:      { konsumsi: 38 }  
};

const hargaPerLiter = 10000; 

function formatRp(angka) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(angka);
}

function hitungBensin() {
    // 1. Ambil Data
    const jarakSekaliJalan = parseFloat(document.getElementById('jarak').value) || 0;
    const tipeMotor = document.getElementById('selected-motor').value;
    const hargaFullTank = parseFloat(document.getElementById('harga_fulltank').value) || 0;

    // 2. Hitung Matematika
    const jarakPP = jarakSekaliJalan * 2;
    const spekMotor = motorDB[tipeMotor];
    const kapasitasTangki = hargaFullTank / hargaPerLiter;
    const literDibutuhkan = jarakPP / spekMotor.konsumsi;
    
    let kaliMampirPom = kapasitasTangki > 0 ? Math.ceil(literDibutuhkan / kapasitasTangki) : 0;
    const uangKeluar = kaliMampirPom * hargaFullTank;
    const totalLiterDidapat = kaliMampirPom * kapasitasTangki;

    // 3. Masukkan Angka ke Struk
    document.getElementById('res-jarak').innerText = `${jarakPP} Km`;
    document.getElementById('res-bakar').innerText = `${literDibutuhkan.toFixed(1)} Liter`;
    document.getElementById('res-frekuensi').innerText = `${kaliMampirPom}x Full Tank`;
    document.getElementById('res-total').innerText = formatRp(uangKeluar);
    document.getElementById('res-total-liter').innerText = `${totalLiterDidapat.toFixed(1)} Liter`;

    // 4. MENGHILANGKAN FORM & MEMUNCULKAN STRUK
    document.getElementById('form-section').style.display = 'none'; // Form menghilang
    
    const receiptBox = document.getElementById('receipt-box');
    receiptBox.classList.remove('printing');
    
    // Trik kecil untuk me-reset animasi agar bisa diulang
    void receiptBox.offsetWidth; 
    
    // Tambahkan class printing untuk memicu animasi keluar seperti kertas
    receiptBox.classList.add('printing');
}

// Fungsi jika tombol "Hitung Ulang" ditekan
function hitungUlang() {
    // Sembunyikan struk dan hilangkan animasinya
    const receiptBox = document.getElementById('receipt-box');
    receiptBox.classList.remove('printing');
    receiptBox.style.display = 'none';

    // Munculkan kembali form pengisian awal
    document.getElementById('form-section').style.display = 'block';
}
