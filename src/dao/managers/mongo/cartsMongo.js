import { cartsModel } from "../../models/carts.model.js";

export class CartsMongo{
    constructor(){
        this.model = cartsModel;
    };

    async getAll(){
        try {
            const carritos = await this.model.find();
            return carritos;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los carritos");
        }
    }

    async save(){
        try {
            const carritoCreated = await this.model.create();
            return carritoCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al crear el carrito");
        }
    }

    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try {
            const cartId = await this.model.findById(id);
            return cartId;
        } catch (error) {
            console.log(error.message);
            throw new Error(`Hubo un error al encontrar el carrito`);
        }
    }
}