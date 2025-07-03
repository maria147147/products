const express = require("express");
const mongoose = require("mongoose");
const server = express();
const produtoRoute = require("./routes/RoutesApp");
const cors = require("cors");
server.use(cors());
//middleware
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.use(express.json());

server.use("/produto", produtoRoute);
server.use("/", produtoRoute);
server.use("/produto/:_id", produtoRoute);

const DB_USER = "mafer";
const DB_PASSWORD = encodeURIComponent("trabalhoweb");

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
server.listen(3000);
