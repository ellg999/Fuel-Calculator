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
function hitungBensin() {
    // 1. Ambil Data Teks Asli
    const inputJarak = document.getElementById('jarak').value;
    const inputHarga = document.getElementById('harga_fulltank').value;

    // 2. CEK KOSONG: Hentikan kalau ada yang belum diisi
    if (inputJarak === "" || inputHarga === "") {
        alert("Eh, isi dulu Jarak dan Harga Full Tank-nya ya!");
        return; // Tombol berhenti bekerja di sini
    }

    // 3. Ubah teks menjadi angka desimal
    const jarakSekaliJalan = parseFloat(inputJarak);
    const hargaFullTank = parseFloat(inputHarga);
    
    // 4. CEK MINUS/NOL: Hentikan kalau angkanya nggak masuk akal
    if (jarakSekaliJalan <= 0 || hargaFullTank <= 0) {
        alert("Jarak dan Harga nggak boleh nol atau minus dong!");
        return; // Tombol berhenti bekerja di sini
    }

    // 5. Lanjut Hitung Matematika (Kalau lolos cek di atas)
    const tipeMotor = document.getElementById('selected-motor').value;
    const hargaPerLiter = parseFloat(document.getElementById('jenis_bensin').value);

    const jarakPP = jarakSekaliJalan * 2;
    const spekMotor = motorDB[tipeMotor];
    const kapasitasTangki = hargaFullTank / hargaPerLiter;
    const literDibutuhkan = jarakPP / spekMotor.konsumsi;
    
    let kaliMampirPom = kapasitasTangki > 0 ? Math.ceil(literDibutuhkan / kapasitasTangki) : 0;
    const uangKeluar = kaliMampirPom * hargaFullTank;
    const totalLiterDidapat = kaliMampirPom * kapasitasTangki;

    // 6. Masukkan Angka ke Struk
    document.getElementById('res-jarak').innerText = `${jarakPP} Km`;
    document.getElementById('res-bakar').innerText = `${literDibutuhkan.toFixed(1)} Liter`;
    document.getElementById('res-frekuensi').innerText = `${kaliMampirPom}x Full Tank`;
    document.getElementById('res-total').innerText = formatRp(uangKeluar);
    document.getElementById('res-total-liter').innerText = `${totalLiterDidapat.toFixed(1)} Liter`;

    // 7. Animasi Struk Keluar
    document.getElementById('form-section').style.display = 'none';
    const receiptBox = document.getElementById('receipt-box');
    receiptBox.classList.remove('printing');
    void receiptBox.offsetWidth; 
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
