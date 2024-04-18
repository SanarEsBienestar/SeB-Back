//MODELS FOR SERVICES
import * as methods from "../lib/crudMethod.js"
import { generateUUID } from "../lib/keyGen.js"
import logger from "../config/logger.config.js"

//List all Services
export const listAllServices = async (req, res) => {
    try{
        const services = await methods.listAll( "*", "services")
        res.status(200).json(services)
    }
    catch(err){
        console.error(err)
    }
}

//Create New Service 
export const createService = async (req, res) => {
    const id = generateUUID()
    const service = req.body

    if (!service.title || !service.details || !service.duration || !service.cost) { // Asumiendo que 'name' y 'description' son necesarios
        return res.status(400).json({ message: "Missing required fields" })
    }

    service.main_id = id

    try{
        await methods.create(service, "services")
        logger.info(`Service ${id} created`)
        res.status(200).json({ message: "Service Created" })
    }
    catch(err){
        console.error(err)
    }
}

//Get Service By Id or Order
export const getServiceById = async (req, res) => {
    const param = req.params.id; // Asumiendo que el parámetro se llama 'id' en la ruta

    try {
        let service;
        // Verificar si el parámetro parece un UUID
        if (param.includes('-')) {
            // Buscar por UUID
            service = await methods.listWhere("*", { main_id: param }, "services");
        } else {
            // Asumir que el parámetro es un número de orden y convertir a número
            const order = parseInt(param);
            service = await methods.listWhere("*", { order: order }, "services");
        }

        res.status(200).json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

//Update Service By Id
export const updateServiceById = async (req, res) => {
    const id = req.params.id; // Asumiendo que el parámetro se llama 'id' en la ruta
    const service = req.body;

    try{
        if(param.includes('-')){
            await methods.updateWhere(service, { main_id: id }, "services")
            logger.info(`Service ${id} updated`)
            res.status(200).json({ message: "Service Updated" })
        } else {
            return res.status(400).json({ message: "Missing required fields" })
        }
    } catch(err){
        console.error(err)
    }
}

//Delete Service By Id
export const deleteServiceById = async (req, res) => {
    const id = req.params.id; // Asumiendo que el parámetro se llama 'id' en la ruta
    if(param.includes('-')){
        try{
            await methods.deleteWhere({ main_id: id }, "services")
            logger.info(`Service ${id} deleted`)
            res.status(200).json({ message: "Service Deleted" })
        } catch(err){
            console.error(err)
        }
    } else {
        return res.status(400).json({ message: "Missing required fields" })
    }

}
