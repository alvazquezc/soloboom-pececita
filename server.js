const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/pececita", async (req, res) => {
  try {
    const response = await axios.get("https://soloboom.net/leaderboard", {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const $ = cheerio.load(response.data);
    let result = null;

    $("tr").each((_, row) => {
      const cols = $(row).find("td");
      if (cols.length < 2) return;

      const position = $(cols[0]).text().trim();
      const name = $(cols[1]).text().trim();
      const lp = cols[2] ? $(cols[2]).text().trim() : "";

      if (name === "Pececita_1k") {
        result = { name, position, lp };
      }
    });

    if (!result) return res.status(404).json({ error: "Pececita_1k no encontrada" });
    res.json(result);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API soloboom-pececita running on port", port));
