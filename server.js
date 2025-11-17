const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/pececita", async (req, res) => {
  try {
    const url = "https://soloboom.net/leaderboard";

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "es-MX,es;q=0.9",
      },
    });

    const $ = cheerio.load(response.data);
    let result = null;

    $("tr").each((_, row) => {
      const cols = $(row).find("td");

      // La tabla siempre tiene muchas columnas, mínimo 11
      if (cols.length < 11) return;

      const position = $(cols[0]).text().trim();
      const name = $(cols[2]).text().trim();
      const lp = $(cols[10]).text().trim();

      // columna del ELO es la 9
      const eloImgSrc = $(cols[9]).find("img").attr("src") || "";
      let elo = "";

      if (eloImgSrc) {
        const file = eloImgSrc.split("/").pop().split(".")[0];
        elo = file.charAt(0).toUpperCase() + file.slice(1);
      }

      if (name === "Pececita_1k") {
        result = {
          name,
          position,
          lp,
          elo,
          eloImage: eloImgSrc
        };
      }
    });

    if (!result) {
      return res.status(404).json({ error: "Pececita_1k no encontrada" });
    }

    res.json(result);

  } catch (e) {
    console.error("ERROR SCRAPING:", e.message);
    res.status(500).json({ error: "Error interno: " + e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API soloboom-pececita v3 running on port", port);
});
