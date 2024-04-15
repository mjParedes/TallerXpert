import { NextFunction, Request, Response } from 'express'
import { User, Client } from '../models'

export class UserController {
	static async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			/*const results = await User.findAll({
				include: [
					{
						model: Client,
					},
				],
			})
			res.status(200).json(results)*/
			const users = await User.findAll({
				attributes: { exclude: ['password'] },
			})
			res.status(200).json(users)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await User.create(req.body)
			res.status(201).json(user)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async updateUser(req: Request, res: Response) {
		try {
			const user = await User.update(
				{
					rol: req.body.rol,
				},
				{
					where: {
						id: res.locals.token.id,
					},
				},
			)
			if (user[0]) {
				return res.status(201).json({
					message: 'Actualizado',
					update: true,
				})
			}
			res.status(401).json({
				message: 'No Actualizado',
				update: false,
			})
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async getById(req: Request, res: Response) {
		try {
			const user = await User.findByPk(req.params.id, {
				attributes: { exclude: ['password'] },
			})
			res.status(201).json(user?.dataValues)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.params.id
			const user = await User.findByPk(userId)
			if (user) {
				await user.update({ is_active: false })
				res.status(200).json({ message: 'Usuario desactivado' })
			} else {
				res.status(404).json({ message: 'Usuario no encontrado' })
			}
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}
}
