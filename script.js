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

      // Perhitungan total pembelian
      const sub = document.getElementById("sub");
      const ppn = document.getElementById("ppn");
      const ongkir = document.getElementById("ongkir");
      const potongan = document.getElementById("potongan");
      const totalHarga = document.getElementById("totalHarga");

      let totalKanan = 0;

      const totalPerBarang = document.querySelectorAll("#totalHargaBarang");

      totalPerBarang.forEach(function (barang) {
        totalKanan += parseInt(barang.textContent);
        const pajak = totalKanan * 0.1;
        const ongkos = totalKanan * 0.2;
        const potong = totalKanan * 0.2;

        sub.innerHTML = totalKanan;
        ppn.innerHTML = pajak;
        ongkir.innerHTML = ongkos;
        potongan.innerHTML = potong;
        totalHarga.innerHTML = totalKanan + pajak + ongkos - potong;
      });

      // Perhitungan Payment
      const banyak = document.querySelectorAll(".dibeli input");

      banyak.forEach(function (pil) {
        pil.addEventListener("input", function () {
          // Perhitungan harga tiap buah
          const nilai = pil.previousElementSibling.lastChild.textContent;
          const muncul = pil.nextElementSibling.lastChild;

          const jumlah = pil.value * nilai;
          muncul.innerHTML = jumlah;

          // Perhitungan Total Pembelian
          let totalKanan = 0;

          const totalPerBarang = document.querySelectorAll("#totalHargaBarang");

          totalPerBarang.forEach(function (barang) {
            totalKanan += parseInt(barang.textContent);
            const pajak = totalKanan * 0.1;
            const ongkos = totalKanan * 0.2;
            const potong = totalKanan * 0.2;

            sub.innerHTML = totalKanan;
            ppn.innerHTML = pajak;
            ongkir.innerHTML = ongkos;
            potongan.innerHTML = potong;
            totalHarga.innerHTML = totalKanan + pajak + ongkos - potong;
          });
        });
      });

      $(".ngapus").on("click", function (e) {
        kiri.removeChild(e.target.parentElement);

        isiKeranjang = kiri.innerHTML;

        // Perhitungan Total Pembelian
        let totalKanan = 0;

        const totalPerBarang = document.querySelectorAll("#totalHargaBarang");
        console.log(totalPerBarang.length);

        if (totalPerBarang.length > 0) {
          totalPerBarang.forEach(function (barang) {
            totalKanan += parseInt(barang.textContent);
            const pajak = totalKanan * 0.1;
            const ongkos = totalKanan * 0.2;
            const potong = totalKanan * 0.2;

            sub.innerHTML = totalKanan;
            ppn.innerHTML = pajak;
            ongkir.innerHTML = ongkos;
            potongan.innerHTML = potong;
            totalHarga.innerHTML = totalKanan + pajak + ongkos - potong;
          });
        } else {
          const pajak = 0;
          const ongkos = 0;
          const potong = 0;

          sub.innerHTML = totalKanan;
          ppn.innerHTML = pajak;
          ongkir.innerHTML = ongkos;
          potongan.innerHTML = potong;
          totalHarga.innerHTML = totalKanan + pajak + ongkos - potong;
        }
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
        <p>Rp<span id="totalHargaBarang">${c}</span></p>
        <button class="ngapus">Cancel</button>
      </div>
  `;
}
