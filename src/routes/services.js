import * as models from '../models/services.js';
import express, { Router } from 'express'

const router = Router()

// List all Services
router.get('/', models.listAllServices)

// List one service by param
router.get('/:id', models.getServiceById)

// Create new Service
router.post('/new', models.createService) 

// Update Service
router.put('/update/:id', models.updateServiceById)


export default router