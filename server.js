const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// במקום להציג טקסט — שולח ל-items
app.get("/", (req, res) => {
  res.redirect("/items");
});

// כאן את שמה מה שאת רוצה ש-/items יעשה
app.get("/items", async (req, res) => {
  try {
    const response = await axios.get("https://todolistserver-g9dd.onrender.com/items");
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Endpoint שמחזיר את רשימת השירותים ב-Render
app.get("/services", async (req, res) => {
  try {
    const response = await axios.get("https://api.render.com/v1/services", {
      headers: {
        Authorization: `Bearer ${process.env.RENDER_API_KEY}`
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Failed to fetch data from Render API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
