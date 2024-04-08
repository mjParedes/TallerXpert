import { Router } from 'express'
import { ClientController } from '../controllers'

const clientRouter = Router()

clientRouter.get('/', ClientController.getAll)
clientRouter.post('/', ClientController.create)
// clientRouter.delete('/:id', ClientController.delete)
// clientRouter.patch('/:id', ClientController.update)

export default clientRouter