const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("שלום! השרת עובד. עבור ל-endpoint /services כדי לראות את רשימת השירותים שלך.");
});

// -------- Items Handling --------

// פונקציה מרכזית – כל סוג של /items יגיע אליה
const itemsHandler = (req, res) => {
  res.send("Items endpoint עובד בהצלחה!");
};

// /items בדיוק
app.get("/items", itemsHandler);

// כל וריאציה כמו /items/ או /items/משהו → נעשה redirect ל־/items
app.get("/items*", (req, res) => {
  res.redirect("/items");
});

// -------- Render Services --------
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
