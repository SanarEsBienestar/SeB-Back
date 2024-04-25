import * as models from '../models/services.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

// List all Services
router.get('/', requestData, models.listAllServices)

// List one service by param
router.get('/:id', requestData, models.getServiceById)

// Create new Service
router.post('/new', requestData, verifyToken, models.createService) 

// Update Service
router.put('/update/:id', requestData, verifyToken, models.updateServiceById)

export default router