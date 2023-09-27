import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js";

const app = express()
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

//routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)


app.listen(PORT, () => {
    console.log(`Escuchando al servidor ${PORT}`);
})