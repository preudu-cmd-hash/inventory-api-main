import express from "express";
import type { Application } from "express";
import { productRouter } from "./routes/productRouter";
import { AppDataSource } from "./data-source";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(productRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco: ", error));
