// api/index.js (ou seu entrypoint)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const produtoRoute = require("./routes/RoutesApp");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para conexão Mongo com cache
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  const DB_USER = "mafer";
  const DB_PASSWORD = encodeURIComponent("trabalhoweb");
  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@produtos.edwr37u.mongodb.net/?retryWrites=true&w=majority&appName=produtos`;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
  console.log("Conectado ao Mongo!");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Erro na conexão com MongoDB:", err);
    res.status(500).json({ error: "Erro de conexão com banco" });
  }
});

// Rotas
app.use("/produto", produtoRoute);

// Rota raiz (opcional)
app.get("/", (req, res) => {
  res.status(200).json({ message: "API rodando" });
});

// Exporta como função serverless para Vercel
module.exports = serverless(app);
