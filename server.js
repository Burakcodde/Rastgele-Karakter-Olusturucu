const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey:
    "API_KEY", // Buraya kendi OpenAI API anahtarınızı ekleyin
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/kaydet", (req, res) => {
  const karakter = req.body;
  fs.readFile("karakterler.json", (err, data) => {
    if (err) {
      return res.status(500).send("Sunucu hatası");
    }
    const karakterler = JSON.parse(data);
    karakterler.push(karakter);
    fs.writeFile(
      "karakterler.json",
      JSON.stringify(karakterler, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Sunucu hatası");
        }
        res.send("Karakter kaydedildi");
      }
    );
  });
});

app.post("/olusturHikaye", async (req, res) => {
  const karakter = req.body;
  const prompt = `Karakter Adı: ${karakter.isim}\nYaşı: ${karakter.yas}\nMesleği: ${karakter.meslek}\nKişilik Özellikleri: ${karakter.kisilik}\nFiziksel Özellikler: Boyu: ${karakter.boy} cm, Kilosu: ${karakter.kilo} kg, Saç Rengi: ${karakter.sacRengi}, Göz Rengi: ${karakter.gozRengi}\n\nBu karakter için bir arka plan hikayesi yazın.`;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", // Doğru model
      prompt: prompt,
      max_tokens: 150,
    });

    const hikaye = response.choices[0].text.trim();
    res.send({ hikaye: hikaye });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hikaye oluşturulamadı");
  }
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
