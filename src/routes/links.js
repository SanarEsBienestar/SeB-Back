import * as models from '../models/links.js'
import { verifyToken } from '../lib/verifyAccess.js'
import { requestData } from '../lib/requestData.js'
import express, { Router } from 'express'

const router = Router()

//GET all Links
router.get('/', requestData, models.listAllLinks)

//Create a Link
router.post('/new', requestData, verifyToken, models.createLink)

//Update link by id
router.put('/:id', requestData, verifyToken, models.updateLinkById)

//Delete Service By Id
router.delete('/:id', requestData, verifyToken, models.deleteLinkById)


export default router