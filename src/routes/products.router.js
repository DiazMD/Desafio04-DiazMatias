import { Router } from "express";
//import { productManager } from "../ProductManager.js"
import { productsManager } from "../dao/ManagersDB/ProductsManagerDB.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await productsManager.findAll()
        res.status(200).json({message: "Products", products})
    } catch (error) {
        res.status(500).json({error: err.message})
    }
});

router.get("/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const product = await productsManager.findById(idProduct)
        res.status(200).json({message: "Product", product})
    } catch (error) {
        res.status(500).json({error: err.message})
    }
});

router.post("/", async (req, res) => {
    const {title, description, price, code, category, stock} = req.body;
    if (!title || !description || !price || !code || !category || !stock){
        return res.status(400).json({ message: "Some data is missing"})}
    try {
        const createdProduct = await productsManager.createOne(req.body)
        res.status(200).json({message: "Product created", product: createdProduct})
    } catch (error) {
        res.status(500).json({error: err.message})
    }
});

router.delete("/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        await productsManager.deleteOne(idProduct)
        res.status(200).json({message: "Product deleted"})
    } catch (error) {
        res.status(500).json({error: err.message})
    }
});

router.put("/:idProduct", async (req, res) => {
    const {idProduct} = req.params

    try {
        await productsManager.updateOne(idProduct)
        res.status(200).json({message: "Product updated"})
    } catch (error) {
        res.status(500).json({error: err.message})
    }
});


/* FS GET /
router.get("/", async (req, res) => {
    try{
        const products = await productManager.getProducts(req.query);
        if(!products.length){
            return res.status(404).json({message: "No products"});
        }
        res.status(200).json({message: "Products found", products})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})*/

/* FS GET ID /
router.get("/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const product = await productManager.getProductById(+idProduct)
        if (!product) {
            return res
            .status(404)
            .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product found", product})
    }
    catch (error){
        res.status(500).json({message:error.message})
    }
})*/

/* FS POST /
router.post("/", async (req, res) => {
    const {title, description, price, code, category, stock} = req.body;
    if (!title || !description || !price || !code || !category || !stock){
        return res.status(400).json({ message: "Some data is missing"})}
     try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(200).json({message: "Product created", product: newProduct })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})*/

/* FS DELETE /
router.delete("/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const response = await productManager.deleteProduct(+idProduct)
        if (!response) {
           return res
            .status(404)
            .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product delete"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
*/

/* FS PUT /
router.put("/:idProduct", async (req, res) => {
    const {idProduct} = req.params
    try {
        const response = await productManager.updateProduct(+idProduct, req.body)
        if (!response) {
            return res
            .status(404)
            .json({message: "Product not found with the id provided"})
        }
        res.status(200).json({message: "Product updated"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});*/

export default router