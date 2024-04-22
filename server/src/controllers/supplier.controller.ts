import { Supplier } from '../models'
import { NextFunction, Request, Response } from 'express'
import { SupplierSchema } from '../schemas'
import { HttpCodes } from '../utils'

export class SupplierController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await Supplier.findAll()
			res.status(HttpCodes.SUCCESS).json(results)
		} catch (error: any) {
			next(error)
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Supplier.findOne({
				where: {
					id: req.params.id,
				},
			})
			res.status(HttpCodes.SUCCESS).json(result)
		} catch (error: any) {
			next(error)
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const supplierDataParse = SupplierSchema.parse(req.body)
			const supplier = await Supplier.create(supplierDataParse)
			res.status(HttpCodes.SUCCESS_CREATED).json(supplier)
		} catch (error: any) {
			next(error)
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const supplier: Supplier | null = await Supplier.findByPk(req.params.id);
			if(!supplier){
				return res.status(404).json({message: "Proveedor no encontrado"});
			}
			const updatedSupplier = await Supplier.update(
				{
					...req.body,
				},
				{
					where: {
						id: req.params.id,
					},
				},
			)
			res.status(HttpCodes.SUCCESS).json(updatedSupplier)
		} catch (error: any) {
			next(error)
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Supplier.destroy({
				where: {
					id: req.params.id,
				},
			})
			res.status(HttpCodes.SUCCESS_DELETED).json(result)
		} catch (error: any) {
			next(error)
		}
	}
}
