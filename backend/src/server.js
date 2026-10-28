const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const produtosRoute = require("./routes/produtosRoute");
const categoriasRoute = require("./routes/categoriasRoute");

app.use(express.json());
app.use("/produtos", produtosRoute);
app.use("/categorias", categoriasRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na http://localhost:${PORT}`);
});
