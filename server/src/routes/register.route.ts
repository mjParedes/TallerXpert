import { Router } from 'express'
import { AuthAndSignController } from '../controllers'

const registerRouter = Router()

registerRouter.post('/', AuthAndSignController.register)

export default registerRouter
