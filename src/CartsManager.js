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
        const cart = carts.find (p => p.id === id)
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
        const cart = await this.getCartsById(idCart)
        //Validacion de existencia de carrito
        if(!cart){
            throw new Error("There is no cart with this id")
        }
        //Validacion de existencia de producto
        const product = await productManager.getProductById(idProduct)
        if(!product){
            throw new Error("There is no product with this id")
        }
        const producIndex = cart.products.findIndex(p => p.id === idProduct)
        if(producIndex === -1){
            const newProduct = {product:idProduct, quantity:1}
            cart.products.push(newProduct)
        } else {
            cart.products[producIndex].quantity++;
        }
    }

}

export const cartsManager = new CartsManager()