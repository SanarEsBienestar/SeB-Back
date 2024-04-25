import * as models from '../lib/auth.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

//Authentication route
router.post('/login', requestData, models.authUser)

//Logout User
router.post('/logout', requestData, verifyToken, models.logout)

export default router