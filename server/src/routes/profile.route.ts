import { Router } from 'express'
import { authMiddelware } from '../middlewares/auth.middleware'
import { ProfileController } from '../controllers'

const profileRouter = Router()

profileRouter.post('/', ProfileController.create)
profileRouter.get('/:id', ProfileController.getById)
profileRouter.patch('/:id', authMiddelware, ProfileController.update)

export default profileRouter
