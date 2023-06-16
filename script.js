// ! Untuk scroll web
$(".page-scroll").on("click", function (e) {
  var tujuan = $(this).attr("href");
  var elemenTujuan = $(tujuan);

  $("html,body").animate(
    {
      scrollTop: elemenTujuan.offset().top - 50,
    },
    1250,
    "swing"
  );

  e.preventDefault();
});

// ! Harga tiap makanan
const a = document.querySelector(".harga-alpukat");
const b = document.querySelector(".harga-blueberry");
const o = document.querySelector(".harga-orange");

// ! Input harga
const nilaiAlpukat = document.querySelector(".dibeli input[name=alpukat]");
const nilaiBlueberry = document.querySelector(".dibeli input[name=blueberry]");
const nilaiOrange = document.querySelector(".dibeli input[name=orange]");
const banyak = document.querySelectorAll(".dibeli input");

// ! Harga total makanan
const hargaAlpukat = document.getElementById("totalAlpukat");
const hargaBlueberry = document.getElementById("totalBlueberry");
const hargaOrange = document.getElementById("totalOrange");

// !Payment
const sub = document.getElementById("sub");
const ppn = document.getElementById("ppn");
const ongkir = document.getElementById("ongkir");
const potongan = document.getElementById("potongan");
const totalHarga = document.getElementById("totalHarga");

console.log(ongkir.textContent);
console.log(potongan.textContent);

banyak.forEach(function (pil) {
  pil.addEventListener("input", function () {
    // Untuk harga tiap buah
    const alpuket = nilaiAlpukat.value * a.textContent;
    const bluberry = nilaiBlueberry.value * b.textContent;
    const oren = nilaiOrange.value * o.textContent;

    hargaAlpukat.innerHTML = alpuket;
    hargaBlueberry.innerHTML = bluberry;
    hargaOrange.innerHTML = oren;

    // Untuk payment
    const totalan = alpuket + bluberry + oren;
    const pajak = totalan * 0.1;
    const ongkos = totalan * 0.2;
    const potong = totalan * 0.2;

    sub.innerHTML = totalan;
    ppn.innerHTML = pajak;
    ongkir.innerHTML = ongkos;
    potongan.innerHTML = potong;
    totalHarga.innerHTML = totalan + pajak + ongkos - potong;
  });
});
