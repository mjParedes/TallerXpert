import { Router } from 'express'
import { SupplierController } from '../controllers/supplier.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const supplierRouter = Router()

supplierRouter.get('/', SupplierController.getAll)
supplierRouter.post('/', authMiddleware,SupplierController.create)
supplierRouter.get('/:id', SupplierController.getOne)
supplierRouter.patch('/:id', authMiddleware, SupplierController.update)
supplierRouter.delete('/:id', authMiddleware,SupplierController.delete)

export default supplierRouter
