// ! Harga tiap makanan
const hargaAlpukat = document.getElementById("totalAlpukat");
const hargaBlueberry = document.getElementById("totalBlueberry");
const hargaOrange = document.getElementById("totalOrange");

// ! Input harga
const nilaiAlpukat = document.querySelector(".dibeli input[name=alpukat]");
const nilaiBlueberry = document.querySelector(".dibeli input[name=blueberry]");
const nilaiOrange = document.querySelector(".dibeli input[name=orange]");
const banyak = document.querySelectorAll(".dibeli input");

// !Payment
const sub = document.getElementById("sub");
const ppn = document.getElementById("ppn");
const ongkir = 10000;
const potongan = 5000;
const totalHarga = document.getElementById("totalHarga");

banyak.forEach(function (pil) {
  pil.addEventListener("input", function () {
    // Untuk harga tiap buah
    const alpuket = nilaiAlpukat.value * 10000;
    const bluberry = nilaiBlueberry.value * 15000;
    const oren = nilaiOrange.value * 12000;

    hargaAlpukat.innerHTML = alpuket;
    hargaBlueberry.innerHTML = bluberry;
    hargaOrange.innerHTML = oren;

    // Untuk payment
    const totalan = alpuket + bluberry + oren;
    const pajak = totalan * 0.1;

    sub.innerHTML = totalan;
    ppn.innerHTML = pajak;
    totalHarga.innerHTML = totalan + pajak + ongkir + potongan;
  });
});
