import { Router } from "express";
import { cartsManager } from "../CartsManager.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const newCart = await cartsManager.addCart();
        res.status(200).json({message: "Cart created", cart: newCart })
    }catch (error) {
        res.status(500).json({message:error.message})
    }

})

router.get("/:idCart", async (req, res) => {
    const {idCart} = req.params
    try{
        const cart = await cartsManager.getCartsById(+idCart)
        if (!cart) {
            return res
            .status(404)
            .json({message: "Cart not found with the id provided"})
        }
        res.status(200).json({message: "Cart found", cart})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.post("/:idCart/product/:idProduct", async (req, res) => {
    const {idCart, idProduct} = req.params
    try{
        const newProductToCart = await cartsManager.addProductToCart(+idCart, +idProduct)
        if (!newProductToCart) {
            return res
            .status(404)
            .json({message: "Cart or product not found with the id provided"})
        }
        res.status(200).json({message: "Product added", newProductToCart})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
})

export default router;