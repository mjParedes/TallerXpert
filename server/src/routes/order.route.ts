import { OrderController } from '../controllers/orders.controller'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'

const orderRouter = Router()

orderRouter.post('/', authMiddleware, OrderController.create)
orderRouter.post('/webhooks', authMiddleware, OrderController.getWebhook)
orderRouter.get('/', OrderController.getAll)

export default orderRouter
