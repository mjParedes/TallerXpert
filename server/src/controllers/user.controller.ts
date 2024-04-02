import { NextFunction, Request, Response } from 'express'
import { User } from '../models'

export class UserController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await User.findAll()
			res.status(200).json(results)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
			// next(error)
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			// userSchema.parse(req.body)
			const result = await User.create({
				...req.body,
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
