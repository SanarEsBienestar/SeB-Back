//MODELS FOR RESERVATIONS
import * as methods from "../lib/crudMethod.js"
import { generateUUID } from "../lib/keyGen.js"
import logger from "../config/logger.config.js"

//List all reservation data
export const listAllReservations = async (req, res) => {
    try {
        const result = await methods.listAll("*", "reservations_data")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

//List min reserv for check availability
export const listMinReservations = async (req, res) => {
    try{
        const result = await methods.listAll("*", "min_reserv")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

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
        const result = await methods.listWhere("*", querys, "reservations_data")
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
        const result = await methods.listWhere("*", status, "reservations_data")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch{
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// Create a new reservation "create"
export const createReservation = async (req, res) => {
    const { main_id, uuid, main_id_user, main_id_service, datetime_reserv, status } = req.body
    const newReservation = {
        main_id,
        uuid,
        main_id_user,
        main_id_service,
        datetime_reserv,
        status
    }
    if(!newReservation){
        return res.status(400).json({ message: "Bad request" })
    }
    try {
        const result = await methods.create(newReservation, "reservations")
        return res.status(201).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

//Update only the status of a reservation by MAIN_ID
export const updateReservationStatus = async (req, res) => {
    const { status } = req.body
    const id  = req.params.id
    const main_id = {
        main_id: id
    }
    const newStatus = {
        status
    }
    if(!main_id || !status){
        console.log(status)
        console.log(main_id)
        return res.status(400).json({ message: "Bad request" })
    }
    try {
        const result = await methods.update(main_id, newStatus, "reservations")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

//Delete a reservation by MAIN_ID
export const deleteReservation = async (req, res) => {
    const id  = req.params.id
    const main_id = {
        main_id: id
    }
    if(!main_id){
        return res.status(400).json({ message: "Bad request" })
    }
    try {
        const result = await methods.delete(main_id, "reservations")
        return res.status(200).json({ message: "Success", data: result})
    }
    catch (error) {
        logger.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}