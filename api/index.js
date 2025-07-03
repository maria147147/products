const express = require("express");
const mongoose = require("mongoose");
const produtoRoute = require("../routes/RoutesApp");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/produto", produtoRoute);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@produtos.edwr37u.mongodb.net/?retryWrites=true&w=majority&appName=produtos`
  )
  .then(() => {
    console.log("Conectado ao Mongo!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
