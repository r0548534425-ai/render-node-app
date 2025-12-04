const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Items ----------
const itemsHandler = (req, res) => {
  res.send("Items endpoint עובד בהצלחה!");
};

// /items או /items/
app.get(/^\/items\/?$/, itemsHandler);

// ----------- Services -----------
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

// ---------- Catch-all ----------
app.get(/.*/, (req, res) => {
  res.redirect("/items");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
