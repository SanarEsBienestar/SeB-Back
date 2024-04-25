//MODELS FOR RESERVATIONS
import * as methods from "../lib/crudMethod.js"
import { generateUUID } from "../lib/keyGen.js"
import logger from "../config/logger.config.js"


//List all sales data
export const listAllSales = async (req, res) => {
    try {
        const result = await methods.listAll("*", "sales_data")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}