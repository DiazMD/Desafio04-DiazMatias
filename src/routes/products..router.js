import { Router } from "express";

const router = Router()

router.get("/api/products", async (req, res) => {
    try{
        const products = await manager.getProducts(req.query);
        res.status(200).json({message: "Products found", products})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

router.get("/api/products/:id", async (req, res) => {
    const {id} = req.params
    try {
        const product = await manager.getProductById(+id)
        if (!product) {
            res
            .status(404)
            .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product found", product})
    }
    catch (error){
        res.status(500).json({message:error.message})
    }
})

router.post("/api/products", async (req, res) => {
    const {title, description, price, thumbnail, code, status, category, stock} = req.body;
    console.log("body", req.body);
    if (!title || !description || !price || !code || !status || !category || !stock){
        return res.status(400).json({ message: "Some data is missing"})}
     try {
        const response = await manager.addProduct(req.body);
        res.status(200).json({message: "Product created", product: response})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.delete("/api/products/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const response = await manager.deleteProduct(+idProduct)
        if (!response) {
            res
            .status(404)
            .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product delete"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.put("/api/products/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const response = await manager.updateProduct(+idProduct, req.body)
        if (!response) {
            return res
            .status(404)
            .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

export default router