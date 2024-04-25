import * as models from '../models/availability.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

//Get all Avialability data
router.get('/', requestData, models.getAvailability)

//Update work_days 
router.put('/workday/', requestData, verifyToken, models.updateWorkday)

//Create new Date_off
router.post('/date_off/add/', requestData, verifyToken, models.addDateOff)

//Delete a Date_off
router.delete('/date_off/rm/:date_off', requestData, verifyToken, models.deleteDateOff)

export default router