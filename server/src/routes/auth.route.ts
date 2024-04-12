import { Router } from 'express'
import { AuthAndSignController } from '../controllers'

const authRouter = Router()

authRouter.post('/', AuthAndSignController.auth)

export default authRouter
