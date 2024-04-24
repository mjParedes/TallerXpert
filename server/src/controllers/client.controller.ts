import { NextFunction, Request, Response } from 'express'
import { Client } from '../models'
import { HttpCodes } from '../utils'
import { ClientSchema } from '../schemas'

export class ClientController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const clients = await Client.findAll()
			res.status(HttpCodes.SUCCESS).json(clients)
		} catch (error: any) {
			next(error)
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const clientDataParse = ClientSchema.parse(req.body)

			const client = await Client.create(clientDataParse)

			res.status(HttpCodes.SUCCESS_CREATED).json(client)
		} catch (error: any) {
			next(error)
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const { clientId } = req.params

			const client = await Client.findByPk(clientId)

			res.status(HttpCodes.SUCCESS).json(client)
		} catch (error: any) {
			next(error)
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { clientId } = req.params

			const clientDataParse = ClientSchema.parse(req.body)

			const client = await Client.update(clientDataParse, {
				where: {
					id: clientId,
				},
			})
			res.status(HttpCodes.SUCCESS).json(client)
		} catch (error: any) {
			next(error)
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { clientId } = req.params

			const client = await Client.findByPk(clientId)

			console.log(client)

			await client?.destroy()

			res.status(HttpCodes.SUCCESS).json(client)
		} catch (error: any) {
			next(error)
		}
	}
}
