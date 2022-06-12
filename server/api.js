const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
var cors = require("cors");
router.use(cors());
require("dotenv").config();

const fetch = require("node-fetch");
router.use(bodyParser.json());

/* ------------- Begin Model Functions ------------- */

async function get_rover(rover, date, camera) {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=` +
      date +
      "&camera=" +
      camera +
      "&api_key=" +
      process.env.REACT_APP_NASA,
    {
      method: "GET",
      contentType: "application/json",
    }
  );
  let data = await res.json();

  return data;
}

async function get_rover_init(rover, date) {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=` +
      date +
      "&api_key=" +
      process.env.REACT_APP_NASA,
    {
      method: "GET",
      contentType: "application/json",
    }
  );
  let data = await res.json();

  return data;
}

async function get_rover_details(rover) {
  const res = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/?api_key=` +
      process.env.REACT_APP_NASA,
    {
      method: "GET",
      contentType: "application/json",
    }
  );
  let data = await res.json();
  return data;
}

async function get_apod() {
  const res = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=" + process.env.REACT_APP_NASA,
    {
      method: "GET",
      contentType: "application/json",
    }
  );
  let data = await res.json();

  return data;
}
/* ------------- End Model Functions ------------- */

/* ------------- Begin Controller Functions ------------- */
router.get("/rover/:rover/:date/:camera", function (req, res) {
  get_rover(req.params.rover, req.params.date, req.params.camera).then(
    (data) => {
      res.send(data);
    }
  );
});

router.get("/rover/:rover/:date", function (req, res) {
  get_rover_init(req.params.rover, req.params.date).then((data) => {
    res.json(data);
  });
});

router.get("/rover/:rover", function (req, res) {
  get_rover_details(req.params.rover).then((data) => {
    res.json(data);
  });
});

router.get("/apod", function (req, res) {
  get_apod().then((data) => {
    res.send(data);
  });
});

/* ------------- End Controller Functions ------------- */

module.exports = router;
