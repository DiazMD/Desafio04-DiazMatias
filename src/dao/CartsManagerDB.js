import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
    async createCart (){
        const newCart = { products: [] }
        const response = await cartsModel.create(newCart)
        return response
    }

    async findCartById (idCart){
        const response = await cartsModel.findById(idCart)
        return response
    }

    async addProductToCart(idCart, idProduct ){
        const cart = await cartsModel.findById(idCart)

        if (!cart) {
            throw new Error(`El carrito con ID ${idCart} no existe`);
        }

        if (!cart.products) {
            cart.products = [];
        }

        const productIndex = cart.products.findIndex(p => p.product === idProduct)
        if(productIndex === -1) {
            cart.products.push({product: idProduct, quantity: 1})
        } else {
            cart.products[productIndex].quantity++;
        }
        return cart.save();
    }
}

export const cartsManager = new CartsManager()