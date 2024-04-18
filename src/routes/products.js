import * as models from '../models/products.js';
import express, { Router } from 'express'


const router = Router()

// List all Products
router.get('/', models.listAllProducts)

// List one product by param
router.get('/:id', models.getProductById)

// Create new Product
router.post('/new', models.createProduct) 

// Update Product
router.put('/update/:id', models.updateProductById)


export default router