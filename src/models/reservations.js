//MODELS FOR RESERVATIONS
import * as methods from "../lib/crudMethod.js"
import { generateUUID } from "../lib/keyGen.js"
import logger from "../config/logger.config.js"
import { error } from "winston"

//List reservation by param
export const listReservationsBy = async (req, res) => {
    const querys = {
        ...req.query,
        ...req.params
    }
    console.log(querys)
    if(!querys){
        return res.status(400).json({ message: "Bad request" })
    }
    try {
        const result = await methods.listWhere("*", querys, "reservations")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// List ALL Reservation by this => 'booked', 'canceled', 'paid' or 'finished'
export const listReservationsStatus = async (req, res) => {
    const status = req.params.status
    
    if(!status){
        return res.status(400).json({ message: "Bad request" })
    }
    try {
        const result = await methods.listWhere("*", status, "reservations")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch{
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}