// Importações
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

require("./api/models/pessoa");
require("./api/models/endereco");

const app = express();

const pessoa = require("./api/routes/pessoa");
const endereco = require("./api/routes/endereco");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = (req, res, next) => {
  const whitelist = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "token,Content-Type,Authorization, x-access-token"
  );
  next();
};
app.use(cors);

app.use("/pessoa", pessoa);
app.use("/endereco", endereco);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
