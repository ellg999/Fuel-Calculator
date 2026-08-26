// 1. Database Konsumsi Motor (Realita Jalanan)
const motorDB = {
    beat_karbu:    { konsumsi: 35 }, 
    beat_deluxe:   { konsumsi: 58 }, 
    vario_125_old: { konsumsi: 43 }, 
    vario_150:     { konsumsi: 41 }, 
    pcx_150:       { konsumsi: 40 }, 
    nmax_155:      { konsumsi: 38 }  
};

// 2. Fungsi Animasi Pilih Motor di Grid
function pilihMotor(tipe, element) {
    document.getElementById('selected-motor').value = tipe;
    const cards = document.querySelectorAll('.motor-card');
    cards.forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
}

// 3. Fungsi Pengubah Angka Jadi Format Rupiah
function formatRp(angka) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(angka);
}

// 4. OTAK UTAMA: Fungsi Hitung Bensin
function hitungBensin() {
    // Ambil input dari user
    const inputJarak = document.getElementById('jarak').value;
    const inputHarga = document.getElementById('harga_fulltank').value;

    // VALIDASI 1: Cek apakah kolom masih kosong
    if (inputJarak === "" || inputHarga === "") {
        alert("Eh, isi dulu Jarak dan Harga Full Tank-nya ya!");
        return; // Hentikan proses hitung di sini
    }

    // Ubah teks yang diketik menjadi angka desimal
    const jarakSekaliJalan = parseFloat(inputJarak);
    const hargaFullTank = parseFloat(inputHarga);
    
    // VALIDASI 2: Cek apakah user iseng masukin angka minus atau nol
    if (jarakSekaliJalan <= 0 || hargaFullTank <= 0) {
        alert("Jarak dan Harga nggak boleh nol atau minus dong!");
        return; // Hentikan proses hitung di sini
    }

    // Ambil data pilihan motor dan jenis bensin
    const tipeMotor = document.getElementById('selected-motor').value;
    const hargaPerLiter = parseFloat(document.getElementById('jenis_bensin').value);

    // Proses Kalkulasi Matematika
    const jarakPP = jarakSekaliJalan * 2;
    const spekMotor = motorDB[tipeMotor];
    const kapasitasTangki = hargaFullTank / hargaPerLiter;
    const literDibutuhkan = jarakPP / spekMotor.konsumsi;
    
    // Pembulatan ke atas (Math.ceil)
    let kaliMampirPom = kapasitasTangki > 0 ? Math.ceil(literDibutuhkan / kapasitasTangki) : 0;
    const uangKeluar = kaliMampirPom * hargaFullTank;
    const totalLiterDidapat = kaliMampirPom * kapasitasTangki;

    // Suntikkan hasil hitungan ke dalam struk kasir HTML
    document.getElementById('res-jarak').innerText = `${jarakPP} Km`;
    document.getElementById('res-bakar').innerText = `${literDibutuhkan.toFixed(1)} Liter`;
    document.getElementById('res-frekuensi').innerText = `${kaliMampirPom}x Full Tank`;
    document.getElementById('res-total').innerText = formatRp(uangKeluar);
    document.getElementById('res-total-liter').innerText = `${totalLiterDidapat.toFixed(1)} Liter`;

    // Sembunyikan form dan munculkan animasi print struk
    document.getElementById('form-section').style.display = 'none';
    const receiptBox = document.getElementById('receipt-box');
    
    // Trik mereset animasi
    receiptBox.classList.remove('printing');
    void receiptBox.offsetWidth; 
    receiptBox.classList.add('printing');
}

// 5. Fungsi Tombol Hitung Ulang
function hitungUlang() {
    const receiptBox = document.getElementById('receipt-box');
    receiptBox.classList.remove('printing');
    receiptBox.style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
}
