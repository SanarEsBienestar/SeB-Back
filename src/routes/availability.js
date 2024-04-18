import * as models from '../models/availability.js';
import express, { Router } from 'express'

const router = Router()

//Get all Avialability data
router.get('/', models.getAvailability)

//Update work_days 
router.put('/workday/', models.updateWorkday)

//Create new Date_off
router.post('/date_off/add/', models.addDateOff)

export default router