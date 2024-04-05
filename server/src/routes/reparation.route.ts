import { Router } from 'express'
import { ReparationController } from '../controllers';

const reparationRouter = Router()

reparationRouter.get('/', ReparationController.getAll)
reparationRouter.get('/:id', ReparationController.getOne)
reparationRouter.post('/', ReparationController.create)
reparationRouter.patch('/:id', ReparationController.update)
reparationRouter.delete('/:id', ReparationController.delete)

export default reparationRouter
