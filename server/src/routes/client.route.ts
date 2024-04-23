import { Router } from 'express'
import { ClientController } from '../controllers'

const clientRouter = Router()

clientRouter.get('/', ClientController.getAll)
clientRouter.post('/', ClientController.create)
clientRouter.get('/:clientId', ClientController.getById)
clientRouter.patch('/:clientId', ClientController.update)
clientRouter.delete('/:clientId', ClientController.delete)

export default clientRouter
