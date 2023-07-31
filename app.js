const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

// Home route
app.get("/", (_req, res) => {
	res.status(200).json({ message: "Hello There!! You are at IDP Backend" });
});

// handle the error safely
process.on("uncaughtException", (err) => {
	console.log(err);
});

module.exports = app;