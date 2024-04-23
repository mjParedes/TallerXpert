import { Router } from 'express'
import { ProductController } from '../controllers';

const productRouter = Router()

productRouter.get('/', ProductController.getAll)
productRouter.get('/:id', ProductController.getOne)
productRouter.post('/', ProductController.create)
productRouter.patch('/:id', ProductController.update)
productRouter.delete('/:id', ProductController.delete)
productRouter.get('/email/:id', ProductController.sendEmail)

export default productRouter