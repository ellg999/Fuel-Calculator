const motorDB = {
    beat_karbu:    { konsumsi: 35 }, 
    beat_deluxe:   { konsumsi: 58 }, 
    vario_125_old: { konsumsi: 43 }, 
    vario_150:     { konsumsi: 41 }, 
    pcx_150:       { konsumsi: 40 }, 
    nmax_155:      { konsumsi: 38 }  
};

function pilihMotor(tipe, element) {
    document.getElementById('selected-motor').value = tipe;
    const cards = document.querySelectorAll('.motor-card');
    cards.forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
}

function formatRp(angka) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(angka);
}

function hitungBensin() {
    const inputJarak = document.getElementById('jarak').value;
    const inputHarga = document.getElementById('harga_fulltank').value;

    // Cek Kosong
    if (inputJarak === "" || inputHarga === "") {
        alert("Harap isi Jarak dan Harga Full Tank terlebih dahulu!");
        return; 
    }

    const jarakSekaliJalan = parseFloat(inputJarak);
    const hargaFullTank = parseFloat(inputHarga);
    
    // Cek Minus atau Nol
    if (jarakSekaliJalan <= 0 || hargaFullTank <= 0) {
        alert("Jarak dan Harga harus lebih dari angka 0!");
        return; 
    }

    const tipeMotor = document.getElementById('selected-motor').value;
    const hargaPerLiter = parseFloat(document.getElementById('jenis_bensin').value);

    // Proses Hitung
    const jarakPP = jarakSekaliJalan * 2;
    const spekMotor = motorDB[tipeMotor];
    const kapasitasTangki = hargaFullTank / hargaPerLiter;
    const literDibutuhkan = jarakPP / spekMotor.konsumsi;
    
    let kaliMampirPom = kapasitasTangki > 0 ? Math.ceil(literDibutuhkan / kapasitasTangki) : 0;
    const uangKeluar = kaliMampirPom * hargaFullTank;
    const totalLiterDidapat = kaliMampirPom * kapasitasTangki;

    // Suntik ke HTML
    document.getElementById('res-jarak').innerText = `${jarakPP} Km`;
    document.getElementById('res-bakar').innerText = `${literDibutuhkan.toFixed(1)} Liter`;
    document.getElementById('res-frekuensi').innerText = `${kaliMampirPom}x Full Tank`;
    document.getElementById('res-total').innerText = formatRp(uangKeluar);
    document.getElementById('res-total-liter').innerText = `${totalLiterDidapat.toFixed(1)} Liter`;

    // Animasi Struk
    document.getElementById('form-section').style.display = 'none';
    const receiptBox = document.getElementById('receipt-box');
    
    receiptBox.classList.remove('printing');
    void receiptBox.offsetWidth; 
    receiptBox.classList.add('printing');
}

function hitungUlang() {
    const receiptBox = document.getElementById('receipt-box');
    receiptBox.classList.remove('printing');
    receiptBox.style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
}
