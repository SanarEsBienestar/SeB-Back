import * as models from '../models/reservations.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

//Get all list reservations
router.get('/', requestData, models.listAllReservations)

//Get list reservation by param
router.get('/:id', requestData, models.listReservationsBy)

export default router