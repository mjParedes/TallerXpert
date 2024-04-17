import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const userRouter = Router()

userRouter.get('/', UserController.getAllUsers)
userRouter.get('/:id', UserController.getById)
userRouter.patch('/:id', authMiddleware, UserController.updateUser)
userRouter.delete('/:id', UserController.deleteUser)

export default userRouter
