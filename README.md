# Rastgele Karakter Oluşturucu

Bu proje, kullanıcıların rastgele karakterler oluşturmasına ve bu karakterler için AI destekli hikayeler oluşturmasına olanak tanır. Karakterler modern, bilim kurgu veya fantastik türlerde olabilir.

## Özellikler

- Rastgele karakter oluşturma
- Karakterlerin fiziksel ve kişilik özelliklerini belirleme
- Karakterleri kaydetme
- AI destekli karakter hikayesi oluşturma (OpenAI GPT-3 kullanarak)

## Gereksinimler

- Node.js (en son sürüm)
- NPM (Node Package Manager)
- OpenAI API anahtarı

## Kurulum

### 1. Depoyu Klonlayın

```sh
git clone https://github.com/kullanici-adi/rastgele-karakter-olusturucu.git
cd rastgele-karakter-olusturucu
```

## Gerekli Paketleri Yükleyin

```sh
npm install
```

## OpenAl API Anahtarınızı Ekleyin

```sh
const configuration = new Configuration({
  apiKey: "API_KEY",
});
```

## Sunucuyu Başlatın

```sh
node server.js
```

## Uygulamayı Açın

Tarayıcınızda http://localhost:3000 adresine gidin.

## Kullanım

1. Karakter türünü seçin (Modern, Bilim Kurgu, Fantastik).
2. "Karakter Oluştur" butonuna tıklayın.
3. Oluşturulan karakter bilgilerini göreceksiniz.
4. "Karakteri Kaydet" butonuna tıklayarak karakteri kaydedin.
5. "Hikaye Oluştur" butonuna tıklayarak karakter için AI destekli bir hikaye oluşturun.

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.
