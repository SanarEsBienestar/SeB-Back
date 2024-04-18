//MODELS FOR PRODUCTS
import * as methods from "../lib/crudMethod.js"
import { generateUUID } from "../lib/keyGen.js"
import logger from "../config/logger.config.js"

//List all Products
export const listAllProducts = async (req, res) => {
    try{
        const products = await methods.listAll( "*", "products")
        res.status(200).json(products)
    }
    catch(err){
        logger.error(`An error ocurred try to list all: ${err}`)
    }
}

//Create New Product 
export const createProduct = async (req, res) => {
    const id = generateUUID()
    const product = req.body

    if (!product.product || !product.details || !product.qty || !product.cost) { // Asumiendo que 'name' y 'description' son necesarios
        return res.status(400).json({ message: "Missing required fields" })
    }

    product.main_id = id

    try{
        await methods.create(product, "products")
        logger.info(`Product ${product.product} with id: ${id} created`)
        res.status(200).json(product)
    }
    catch(err){
        logger.error(`An error ocurred try to create a product: ${err}`)
    }
}

//Get Product By Id or Order
export const getProductById = async (req, res) => {
    const param = req.params.id; // Asumiendo que el parámetro se llama 'id' en la ruta

    try {
        let product;
        // Verificar si el parámetro parece un UUID
        if (param.includes('-')) {
            // Buscar por UUID
            product = await methods.listWhere("*", { main_id: param }, "products");
        } else {
            // Asumir que el parámetro es un número de orden y convertir a número
            const order = parseInt(param);
            product = await methods.listWhere("*", { order: order }, "products");
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

//Update Product By Id
export const updateProductById = async (req, res) => {
    const id = req.params.id; // Asumiendo que el parámetro se llama 'id' en la ruta
    const product = req.body;

    try{
        if(param.includes('-')){
            await methods.updateWhere(product, { main_id: id }, "products")
            logger.info(`Product ${product.product} ${id} updated`)
            res.status(200).json({ message: "Service Updated" })
        } else {
            return res.status(400).json({ message: "Missing required fields" })
        }
    } catch(err){
        console.error(err)
    }
}

//Delete Product By Id
export const deleteProductById = async (req, res) => {
    const id = req.params.id; // Asumiendo que el parámetro se llama 'id' en la ruta
    if(param.includes('-')){
        try{
            await methods.deleteWhere({ main_id: id }, "products")
            logger.info(`Product ${id} deleted`)
            res.status(200).json({ message: "Product Deleted" })
        } catch(err){
            console.error(err)
        }
    } else {
        return res.status(400).json({ message: "Missing required fields" })
    }
}
