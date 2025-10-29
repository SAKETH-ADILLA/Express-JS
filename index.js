const express = require("express");
const axios = require("axios");

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const { city } = req.body;
  const apiKey = "aa42a7b58d347c151710074e7d4fef79"; // API key directly here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    res.render("index", { weather, error: null });
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.render("index", { weather: null, error: "City not found or invalid input." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
