import * as models from '../models/products.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

// List all Products
router.get('/', requestData, models.listAllProducts)

// List one product by param
router.get('/:id', requestData, models.getProductById)

// Create new Product
router.post('/new', requestData, verifyToken, models.createProduct) 

// Update Product
router.put('/update/:id', requestData, verifyToken, models.updateProductById)


export default router