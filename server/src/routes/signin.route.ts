import { Router } from 'express'
import { AuthAndSignController } from '../controllers'

const signinRouter = Router()

signinRouter.post('/', AuthAndSignController.register)
signinRouter.post('/', AuthAndSignController.signin)


export default signinRouter
