import { Router } from 'express'
import { SupplierController } from '../controllers/supplier.controller'
import { authMiddelware } from '../middlewares/auth.middleware'

const supplierRouter = Router()

supplierRouter.get('/', SupplierController.getAll)
supplierRouter.post('/', SupplierController.create)
supplierRouter.get('/:id', SupplierController.getOne)
supplierRouter.patch('/:id', authMiddelware, SupplierController.update)
supplierRouter.delete('/:id', SupplierController.delete)

export default supplierRouter
