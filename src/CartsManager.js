import fs from "fs";
import { productManager } from "./ProductManager.js";

class CartsManager {
    
    constructor(){
        this.path= "./Carts.json"
    }

    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
                const cartsFile = await fs.promises.readFile(this.path, "utf-8")
                const cartsData = JSON.parse(cartsFile)
                return cartsData;
            } else {
                console.log("This file does not exist");
                return []
            }
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async getCartsById(id){
        try {
        const carts = await this.getCarts()
        const cart = carts.find(c => c.id === id)
        return cart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async addCart(){
        try {
            const carts = await this.getCarts()
            //Generacion ID autoincrementable
            let id
            if (!carts.length) {
                id = 1
            } else {
                id = carts[carts.length-1].id+1
            }
            const newCart = {id, products:[]}
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return newCart;
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async addProductToCart(idCart, idProduct){
        const carts = await this.getCarts();
        const stockProduct = await productManager.getProductById(idProduct)
        
        const getCartById = carts.find(cart => cart.id === idCart);
        const product = getCartById.products.find(p => p.productId === idProduct);

        if(!getCartById || !stockProduct){
            return false
        }
    
        if (product) {
          product.quantity++;
        } else {
          getCartById.products.push({ productId: idProduct, quantity: 1 });
        }
    
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return getCartById.products;
    }

}

export const cartsManager = new CartsManager()



//Primer codigo del addProductToCart, no encontre el error del grabado. Si usted lo ve y me lo puede decir para quedarme tranquilo de entenderlo se lo agradezco.
/*const cart = await this.getCartsById(idCart)
        const product = await productManager.getProductById(idProduct)
        //Validacion de existencia de carrito y producto
        if(!cart || !product){
            return false
        }
        const producIndex = cart.products.findIndex(p => p.id === idProduct)
        if(producIndex === -1){
            const newProduct = {product:idProduct, quantity:1}
            cart.products.push(newProduct)
        } else {
            cart.products[producIndex].quantity++;
            return cart.products
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cart))
        return cart.products*/