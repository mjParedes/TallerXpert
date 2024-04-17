import { Supplier } from '../models'
import { NextFunction, Request, Response } from 'express'

export class SupplierController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await Supplier.findAll()
			res.status(200).json(results)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Supplier.findOne({
				where: {
					id: req.params.id,
				},
			})
			res.status(201).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Supplier.create({
				...req.body,
			})
			res.status(201).json(result)
		} catch (error: any) {
			console.log(error)
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const supplier: Supplier | null = await Supplier.findByPk(req.params.id);
			if(!supplier){
				return res.status(404).json({message: "Proveedor no encontrado"});
			}
			await supplier.save();
			res.status(201).json(supplier)
		} catch (error: any) {
			//
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
			res.status(201).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async deleteAll(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await Supplier.destroy({
				truncate: true
			})
			res.status(201).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}
}
