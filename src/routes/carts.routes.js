import { Router } from "express";
/* import { CartManager } from "../dao/cartManager.js"
import { ProductManager } from "../dao/productManager.js"; */
import { CartsMongo } from "../dao/managers/mongo/cartsMongo.js";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

const cartService = new CartsMongo()
const productService = new ProductsMongo()

const router = Router();

router.get("/", async(req,res) =>{
    try {
        const cart = await cartService.getAll();
        res.json({status:"success", data:cart})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/", async(req,res) => {
    try {
        const cartCreated = await cartService.save();
        res.json({status:"success", data:cartCreated ,message:"carrito creado"})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.get("/:cid", async(req,res) =>{
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getById(cartId);
        if(cart){
            res.json({status:"success", data:cart ,message:"carrito encontrado"})
        }else{
            res.json({status:"error", message:`El carrito con id:${cid} no existe`});
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/:cid/product/:pid", async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartService.getById(cartId);
        if(cart){
            const product = await productService.getById(productId);
            let cartProducts = cart.products;

            let prod = cartProducts.find(e => {return parseInt(e.product) === productId});

            if(prod != undefined){
                prod.quantity++;
            }else{
                const newProd = {
                    product: productId,
                    quantity: 1
                }
                cart.products.push(newProd);
            }

            cartService.update(cartId, cart);
            res.json({status:"success", data: cart});

        }else{
            res.json({status:"error", message: `El carrito ${cid} no existe.`});
        }

    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});
export {router as cartsRouter}