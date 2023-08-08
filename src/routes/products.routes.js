import { Router } from "express";
/* import { ProductManager } from "../dao/managers/fileSystem/productsFile.js" */
/* const productService = new ProductManager("products.json"); */

import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

const productService = new ProductsMongo();

/* const validateFields = (req,res,next) =>{
    const newProduct = req.body;
    if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category ){
        return res.json({status: "error", message:"campos incompletos"})
    } else{
        next();
    }
} */

const router = Router();


router.get("/", async(req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productService.get();
        if(limit){
            //devolver los productos de acuerdo al limite
            const filtro = products.slice(0, limit);
            res.json({status:"success", data:filtro}); 
        }else{
            res.json({status:"success", data:products});            
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/:pid", async(req,res)=>{
    try {
        const pid = req.params.pid;
        const productosId = await productService.getById(pid);
        res.json({status:"success", data:productosId});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
    
});

router.post("/", async(req,res)=>{
    try {
        const newProduct = req.body;
        const productCreated = await productService.save(newProduct);
        res.json({status:"success", data:productCreated, message:"producto creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.put("/:pid", (req,res) =>{
    const newProduct = req.body;    
});

router.delete("/:pid", async(req,res)=>{
    try {
        const pid = req.params.pid;
        const productosId = await productService.deleteProd(pid);
        console.log(productosId);
        res.json({status:"success", message:"el producto se eliminó con éxito"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});



export {router as productsRouter}