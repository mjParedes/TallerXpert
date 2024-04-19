import { Router } from 'express'
import { OrderController } from '../controllers'

const pdfRouter = Router()

// pdfRouter.get('/:orderId', OrderController.getPdf)
pdfRouter.get('/', OrderController.getPdf)

export default pdfRouter
