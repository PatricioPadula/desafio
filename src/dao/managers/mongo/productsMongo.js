import {productsModel} from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model = productsModel;
    };

    async get(){
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los productos");
        }
    };

    async save(productInfo){
        try {
            const productCreated = await this.model.create(productInfo);
            return productCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al crear el producto");
        }
    }

    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try {
            const productId = await this.model.findById(id);
            return productId;
        } catch (error) {
            console.log(error.message);
            throw new Error(`Hubo un error al encontrar el producto`);
        }
    }

}