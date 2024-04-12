import { Router } from 'express'
import { UserController } from '../controllers'
import { authMiddelware } from '../middlewares/auth.middleware'

const userRouter = Router()

userRouter.get('/', UserController.getAll)
userRouter.post('/', UserController.create)
userRouter.get('/:id', UserController.getById)
userRouter.patch('/:id', authMiddelware, UserController.update)
userRouter.delete('/:id', UserController.delete)

export default userRouter
