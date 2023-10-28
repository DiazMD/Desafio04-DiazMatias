import { cartsModel } from "../models/carts.model.js";

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

        const productIndex = cart.products.findIndex(p => p.product.equals(idProduct))
        if(productIndex === -1) {
            cart.products.push({product: idProduct, quantity: 1})
        } else {
            cart.products[productIndex].quantity++;
        }
        return cart.save();
    }

    async deleteCart (id){
        const response = await cartsModel.deleteOne({_id:id})
        return response;
    }
}

export const cartsManager = new CartsManager()