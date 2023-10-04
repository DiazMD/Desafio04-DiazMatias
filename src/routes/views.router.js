import { Router } from "express";
import { productManager } from "../ProductManager.js";

const router = Router();

const products = await productManager.getProducts()

router.get("/", (req, res) => {
    res.render("home", {products})
})

router.get("/realTimeProducts", async (req, res) => {
    res.render("realTimeProducts")
})

export default router;


















//Posibilidad de usarse a futuro
/*router.get("/product", (req, res) => {
    res.render("product")
})*/

/*router.get("/product/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const product = await productManager.getProductById(+idProduct)
        res.render("product", {product} )
    } catch (error) {

    }
})*/