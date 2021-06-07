const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { get } = require("http");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebar engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mohammad Shehran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mohammmad Shehran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "I am here to guide you my friend!!!!",
    title: "Help",
    name: "Shehran",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address passed",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      //const { longitude, latitude } = data;
      forecast(longitude, latitude, (weather_error, info) => {
        if (weather_error) {
          return res.send({
            error: weather_error,
          });
        }
        res.send({
          location: location,
          info: info,
        });
      });
    }
  );

  // res.send({
  //   forecast: 59,
  //   weather: "cloudy",
  //   address: req.query.address,
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "There is no search",
    });
  }

  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message: "Help article not found",
    name: "Shehran",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    message: "Page not found",
    name: "shehran",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Server is up on the port " + port);
});
