import { Router } from 'express'
import { UserController } from '../controllers'

const userRouter = Router()

userRouter.get('/', UserController.getAll)
userRouter.post('/', UserController.create)
// userRouter.delete('/:id', UserController.delete)
// userRouter.patch('/:id', UserController.update)

export default userRouter