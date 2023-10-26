import fs from "fs";

class ProductManager {
    
    constructor(){
        this.path= "./Products.json"
    }

    async getProducts(queryObj = {}){
        const {limit} = queryObj
        try {
            if(fs.existsSync(this.path)){
                const productsFile = await fs.promises.readFile(this.path, "utf-8")
                const productsData = JSON.parse(productsFile)
                return limit ? productsData.slice(0, +limit) : productsData;
            } else {
                return []
            }
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductById(id){
        try {
        const products = await this.getProducts();
        const product = products.find (p => p.id === id);
        return product
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProduct(product){
        try {
            const products = await this.getProducts()
            const codeExists = products.some(p => p.code === product.code)

            //Validacion de datos
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                return console.log("Error: Todos los parametros deben ser completados");
            }  
            //Validacion de no repeticion
            if (codeExists) {
                return  console.log(`Error: El objeto "${product.title}" ya se encuentra en la lista, no puedes volver a agregarlo.`);
            }
            //Generacion ID autoincrementable
            let id
            if (!products.length) {
                id = 1
            } else {
                id = products[products.length-1].id+1
            }
            const newProduct = {id, ...product, status: true}
            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return newProduct;
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProduct(id, obj){
        try{
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === id)
            if(productIndex === -1) {
                return null
            }
            const updateProduct = {...products[productIndex], ...obj}
            products.splice(productIndex, 1, updateProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return updateProduct;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async deleteProduct(id){
        try {
            const products = await this.getProducts();
            const product = products.find( p => p.id === id);
            if (product) {
                const newArrayProducts = products.filter(p => p.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            }
            return null
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const productManager = new ProductManager()