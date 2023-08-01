import express from "express";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { __dirname } from "./utils.js";
import path from 'path';

const port = 8080;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname, "/public")));

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);