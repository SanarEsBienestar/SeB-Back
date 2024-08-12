import * as methods from "../lib/crudMethod.js"
import { generateUUID } from "../lib/keyGen.js"
import logger from "../config/logger.config.js"

//List all Links
export const listAllLinks = async (req, res) => {
    try{
        const products = await methods.listAll( "*", "links")
        res.status(200).json(products)
    }
    catch(err){
        logger.error(`An error ocurred try to list all: ${err}`)
    }
}

//Create New Link
export const createLink = async (req, res) => {
    const link = req.body

    if (!link.title || !link.link || !link.details || !link.type ) { // Check if required fields are present
        return res.status(400).json({ message: "Missing required fields" })
    }
    //Check if link.link didn't already exist
    const linkExist = await methods.listWhere('link',{ link: link.link }, "links")
    if (linkExist.length > 0) {
        return res.status(400).json({ message: "Link already exist" })
    }

    try{
        await methods.create(link, "links")
        logger.info(`link ${link.title} created`)
        res.status(200).json({ message: "link Created" })
    }
    catch(err){
        console.error(err)
    }
}


//Update Service By Id
export const updateLinkById = async (req, res) => {
    const id = req.params.id // Asumiendo que el parámetro se llama 'id' en la ruta
    const link = req.body
    try{
        await methods.updateWhere(link, { main_id: id }, "links")
        logger.info(`link ${link} updated`)
        res.status(200).json({ message: "link Updated" })
    } catch(err){
        console.error(err)
    }
}

//Delete Service By Id
export const deleteLinkById = async (req, res) => {
    const id = req.params.id 
    try{
        await methods.deleteWhere({ main_id: id }, "links")
        logger.info(`link ${id} deleted`)
        res.status(200).json({ message: "link Deleted" })
    } catch(err){
        console.error(err)
    }
}