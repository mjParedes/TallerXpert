import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { ProfileController } from '../controllers'

const profileRouter = Router()

profileRouter.post('/', ProfileController.create)
profileRouter.get('/:id', ProfileController.getById)
profileRouter.patch('/:id', authMiddleware, ProfileController.update)

export default profileRouter
