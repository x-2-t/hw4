import express from "express";
import { City, State, Country } from "country-state-city";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/game", (req, res) => {
    res.render("game");
});

app.get("/developers", (req, res) => {
    res.render("developers");
});


// displays Yokosuka properties from api
app.get("/realLife", async (req, res) => {

    let japanCities = City.getCitiesOfCountry("JP");

    let yokosuka = japanCities.find(city => city.name === "Yokosuka");

    let prefecture = State.getStateByCodeAndCountry(yokosuka.stateCode, yokosuka.countryCode);

    let country = Country.getCountryByCode(yokosuka.countryCode);


    //open-meteo api to get weather data for Yokosuka
    let url = `https://api.open-meteo.com/v1/forecast?latitude=35.28361&longitude=139.66722&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    res.render("realLife", { yokosuka, prefecture, country, data });
});


app.get("/forum", (req, res) => {
    res.render("forum");
});



app.listen(3000, () => {
    console.log("server started");
});

