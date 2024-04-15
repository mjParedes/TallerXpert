import { OrderController } from '../controllers/orders.controller'
import { Router } from 'express'
import { authMiddelware } from '../middlewares/auth.middleware'

const orderRouter = Router()

orderRouter.post('/', authMiddelware, OrderController.create)
orderRouter.post('/webhooks', authMiddelware, OrderController.getWebhook)
orderRouter.get('/', OrderController.getAll)

export default orderRouter
