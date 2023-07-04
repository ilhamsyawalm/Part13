// Untuk scroll web
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

// Ambil data dari API
$.ajax({
  url: "buah.json",
  success: (isian) => {
    let cards = "";
    let isiKeranjang = "";
    const isi = document.querySelector(".isi");

    isian.forEach((x) => {
      cards += iklan(x);
    });

    isi.innerHTML = cards;

    // Memasukan barang ke keranjang
    $(".masuk").on("click", function () {
      const kiri = document.querySelector(".left");

      const isiNama = $(this).data("nama");
      const isiGambar = $(this).data("gambar");
      const isiHarga = $(this).data("harga");

      isiKeranjang += keranjang(isiNama, isiGambar, isiHarga);

      kiri.innerHTML = isiKeranjang;

      // Perhitungan Payment
      const banyak = document.querySelectorAll(".dibeli input");

      banyak.forEach(function (pil) {
        pil.addEventListener("input", function () {
          // Perhitungan harga tiap buah
          const nilai = pil.previousElementSibling.lastChild.textContent;
          const muncul = pil.nextElementSibling.lastChild;

          const jumlah = pil.value * nilai;
          muncul.innerHTML = jumlah;

          // Perhitungan total pembelian

          //
        });
      });
      //

      $(".ngapus").on("click", function (e) {
        kiri.removeChild(e.target.parentElement);

        isiKeranjang = kiri.innerHTML;
      });
    });
  },

  error: (e) => {
    console.log(e.responseText);
  },
});

function iklan(x) {
  return `<div class="iklan">
  <img class="gambar-besar" src="${x.gambar}" alt="">
  <div class="info">
      <h3>${x.nama}</h3>
      <p>${x.keterangan}</p>
      <h3>Rp<span>${x.harga}</span></h3>
  </div>
  <div class="tombol">
      <button class="masuk" data-nama="${x.nama}" data-gambar="${x.gambar}" data-harga="${x.harga}" data-keterangan="${x.keterangan}"> Add </button>
  </div>
</div>`;
}

function keranjang(a, b, c) {
  return `<div class="dibeli" id="${a}">
        <img src="${b}" alt="" class="gambar-kecil">
        <h3>${a}</h3>
        <p>Rp<span class="harga">${c}</span></p>
        <input type="number" min="1" value="1" name="${a}">
        <p>Rp<span id="totalHarga">${c}</span></p>
        <button class="ngapus">Cancel</button>
      </div>
  `;
}

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
