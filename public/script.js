let mevcutKarakter = {};

document
  .getElementById("olusturDugmesi")
  .addEventListener("click", function () {
    const karakterTuru = document.getElementById("karakterTuru").value;

    let isimler, meslekler, kisilikOzellikleri, sacRenkleri, gozRenkleri;

    if (karakterTuru === "modern") {
      isimler = ["Ali", "Ayşe", "Mehmet", "Fatma", "Ahmet", "Elif"];
      meslekler = ["Mühendis", "Doktor", "Öğretmen", "Yazılımcı", "Avukat"];
      kisilikOzellikleri = ["Cesur", "Nazik", "Çalışkan", "Sabırlı", "Meraklı"];
      sacRenkleri = ["Siyah", "Kahverengi", "Sarışın", "Kızıl", "Gri"];
      gozRenkleri = ["Kahverengi", "Mavi", "Yeşil", "Ela", "Gri"];
    } else if (karakterTuru === "bilimKurgu") {
      isimler = ["Zorg", "Luna", "Kara", "Rex", "Nova", "Orion"];
      meslekler = [
        "Uzay Mühendisi",
        "Galaktik Doktor",
        "Yıldız Öğretmeni",
        "Robotik Uzmanı",
        "Uzay Avukatı",
      ];
      kisilikOzellikleri = ["Cesur", "Nazik", "Çalışkan", "Sabırlı", "Meraklı"];
      sacRenkleri = ["Mavi", "Yeşil", "Mor", "Gümüş", "Altın"];
      gozRenkleri = ["Kırmızı", "Mor", "Sarı", "Turuncu", "Beyaz"];
    } else if (karakterTuru === "fantastik") {
      isimler = ["Eldor", "Arwen", "Thorin", "Galadriel", "Legolas", "Gimli"];
      meslekler = ["Büyücü", "Savaşçı", "Elf", "Cüce", "Ork"];
      kisilikOzellikleri = ["Cesur", "Nazik", "Çalışkan", "Sabırlı", "Meraklı"];
      sacRenkleri = ["Beyaz", "Gümüş", "Altın", "Kızıl", "Kahverengi"];
      gozRenkleri = ["Mavi", "Yeşil", "Gri", "Ela", "Kahverengi"];
    }

    const rastgeleIsim = isimler[Math.floor(Math.random() * isimler.length)];
    const rastgeleYas = Math.floor(Math.random() * 60) + 18;
    const rastgeleMeslek =
      meslekler[Math.floor(Math.random() * meslekler.length)];
    const rastgeleKisilik =
      kisilikOzellikleri[Math.floor(Math.random() * kisilikOzellikleri.length)];
    const rastgeleBoy = Math.floor(Math.random() * 50) + 150; // 150-200 cm arası
    const rastgeleKilo = Math.floor(Math.random() * 50) + 50; // 50-100 kg arası
    const rastgeleSacRengi =
      sacRenkleri[Math.floor(Math.random() * sacRenkleri.length)];
    const rastgeleGozRengi =
      gozRenkleri[Math.floor(Math.random() * gozRenkleri.length)];

    mevcutKarakter = {
      isim: rastgeleIsim,
      yas: rastgeleYas,
      meslek: rastgeleMeslek,
      kisilik: rastgeleKisilik,
      boy: rastgeleBoy,
      kilo: rastgeleKilo,
      sacRengi: rastgeleSacRengi,
      gozRengi: rastgeleGozRengi,
    };

    document.getElementById("karakterAdi").textContent = "Adı: " + rastgeleIsim;
    document.getElementById("karakterYasi").textContent =
      "Yaşı: " + rastgeleYas;
    document.getElementById("karakterMeslegi").textContent =
      "Mesleği: " + rastgeleMeslek;
    document.getElementById("karakterKisilik").textContent =
      "Kişilik Özellikleri: " + rastgeleKisilik;
    document.getElementById("karakterBoy").textContent =
      "Boyu: " + rastgeleBoy + " cm";
    document.getElementById("karakterKilo").textContent =
      "Kilosu: " + rastgeleKilo + " kg";
    document.getElementById("karakterSacRengi").textContent =
      "Saç Rengi: " + rastgeleSacRengi;
    document.getElementById("karakterGozRengi").textContent =
      "Göz Rengi: " + rastgeleGozRengi;
  });

document.getElementById("kaydetDugmesi").addEventListener("click", function () {
  if (Object.keys(mevcutKarakter).length === 0) {
    alert("Önce bir karakter oluşturmalısınız!");
    return;
  }

  fetch("/kaydet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mevcutKarakter),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      const kaydedilenKarakterlerListesi = document.getElementById(
        "kaydedilenKarakterler"
      );
      const yeniKarakter = document.createElement("li");
      yeniKarakter.className = "list-group-item";
      yeniKarakter.textContent = `Adı: ${mevcutKarakter.isim}, Yaşı: ${mevcutKarakter.yas}, Mesleği: ${mevcutKarakter.meslek}, Kişilik Özellikleri: ${mevcutKarakter.kisilik}, Boyu: ${mevcutKarakter.boy} cm, Kilosu: ${mevcutKarakter.kilo} kg, Saç Rengi: ${mevcutKarakter.sacRengi}, Göz Rengi: ${mevcutKarakter.gozRengi}`;
      kaydedilenKarakterlerListesi.appendChild(yeniKarakter);
    })
    .catch((error) => {
      console.error("Hata:", error);
      alert("Karakter kaydedilemedi");
    });
});

document
  .getElementById("olusturHikayeDugmesi")
  .addEventListener("click", function () {
    if (Object.keys(mevcutKarakter).length === 0) {
      alert("Önce bir karakter oluşturmalısınız!");
      return;
    }

    fetch("/olusturHikaye", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mevcutKarakter),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("karakterHikayesi").textContent =
          "Arka Plan Hikayesi: " + data.hikaye;
      })
      .catch((error) => {
        console.error("Hata:", error);
        alert("Hikaye oluşturulamadı");
      });
  });
