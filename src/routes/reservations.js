import * as models from '../models/reservations.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

//Get all list reservations
router.get('/', requestData, models.listAllReservations)

//Get Min reservations
router.get('/min', requestData, models.listMinReservations)

//Get list reservation by param
router.get('/by/:service_reservation_id', requestData, models.listReservationsBy)

//Create new Reservation 
router.post('/', requestData, models.createReservation)

//Update only the status of a reservation by MAIN_ID
router.patch('/status/:id', requestData, models.updateReservationStatus)

//Delete Reservation by MAIN_ID
router.delete('/delete/:id', requestData, models.deleteReservation)

export default router