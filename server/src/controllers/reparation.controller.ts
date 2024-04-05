
import { NextFunction, Request, Response } from 'express'
import { Reparation } from '../models'

export class ReparationController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await Reparation.findAll()
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
			const result = await Reparation.findOne({
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
			const {product, client, ...restData}  = req.body;
			let productInstance = await Product.findOne( { where :{ id : product } });
			let clientInstance = await Client.findOne( { where :{ id : client } }) ;
			if (!productInstance || !clientInstance ) throw new Error('Producto o Cliente no encontrado');
			const reparation = await Reparation.create({...restData , product: productInstance , client: clientInstance});
			res.status(201).json(reparation)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Reparation.update(
				{
					...req.body,
				},
				{
					where: {
						id: req.params.id,
					},
				},
			)
			res.status(201).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Reparation.destroy({
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
}
