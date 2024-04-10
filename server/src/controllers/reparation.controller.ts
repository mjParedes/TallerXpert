
import { NextFunction, Request, Response } from 'express'
import { Reparation } from '../models'
import { workerData } from 'worker_threads'

export interface ProductReparation {
    name: string,
    category: string,
    brand: string,
    model: string,
    serial_number?: string,
    detail: string,
    workshopId?: string
}

export interface ReparationOrder {
    ot_number: string,
    products: [ProductReparation],
    client: string,
    diagnostic: string,
    amount?: number,
    entry_date?: Date,
    exit_date?: Date,
    register_by?: string
}

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
			const {client, ...restData}  = req.body;
			const products = req.body.products;
			let clientToSave;
			if( !client ) {
				throw new Error("No se ingresó un cliente");
			}
			const clientInstance = await Client.findOne( { where :{ dni : client.dni } }) ;
			if(!clientInstance){
				clientToSave = await Client.create(client);
			}
			const reparation = await Reparation.create({...restData , client: clientToSave});
			if(products){
				products.forEach((product: ProductReparation
				 ) => {
					let newProduct = Product.create({
						workshop: reparation.id;
						...product
					});
					reparation.$add('products',newProduct);
				});
			}
			reparation.save();
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
