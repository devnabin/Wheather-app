const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getgeo = require("../utils/getgeo");
const getweather = require("../utils/getweather");

const app = express();
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("", (req, res) => {
  res.render("index", {
    name: "Home",
    author: "Nabin Bhandari",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.search;
  if (!address) {
    return res.send("Address is not defined");
  }

  getgeo(address, (error, {long , lat} = {}) => {
    if (error) {
      return res.send("Address is not defined");
    }else if(long === undefined && lat ===undefined){
    return res.send("Address is not defined");
    }
    getweather(long ,lat , (error, data) => {
      if (error) {
        return console.log(error);
      }
      res.send(data);
    });
  });
 
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "About us",
    author: "Nabin Bhandari",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Help",
    author: "Nabin Bhandari",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not Found",
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    error: "About Section not Found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not Found",
  });
});

app.listen(port, () => {
  console.log(`App is listen in ${port} port`);
});
