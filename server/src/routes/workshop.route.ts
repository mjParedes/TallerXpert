import { Router } from 'express'
import { WorkshopController } from '../controllers';

const workshopRouter = Router()

workshopRouter.get('/', WorkshopController.getAll)
workshopRouter.get('/:id', WorkshopController.getOne)
workshopRouter.post('/', WorkshopController.create)
workshopRouter.patch('/:id', WorkshopController.update)
workshopRouter.delete('/:id', WorkshopController.delete)
workshopRouter.delete('/', WorkshopController.deleteAll)

export default workshopRouter
