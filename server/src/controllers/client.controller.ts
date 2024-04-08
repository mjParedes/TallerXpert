import { NextFunction, Request, Response } from 'express'
import { Client } from '../models'

export class ClientController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await Client.findAll()
			res.status(200).json(results)
		} catch (error: any) {
			next(error)
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			// userSchema.parse(req.body)
			const result = await Client.create({
				...req.body,
			})
			res.status(201).json(result)
		} catch (error: any) {
			next(error)
		}
	}
}
