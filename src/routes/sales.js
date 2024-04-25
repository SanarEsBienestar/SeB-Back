import * as models from '../models/sales.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

//Get all list of sales
router.get('/', requestData, models.listAllSales)


export default router