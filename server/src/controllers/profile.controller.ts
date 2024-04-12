import { NextFunction, Request, Response } from 'express'
import { Profile } from '../models'

export class ProfileController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body.fullName && !req.body.phone && !req.body['user_id']) {
				return res.status(400).json({
					message: 'Faltan datos',
				})
			}
			const [profile, createProfile] = await Profile.findOrCreate({
				where: {
					user_id: req.body['user_id'],
				},
				defaults: {
					...req.body,
				},
			})
			if (!createProfile) {
				return res.json({
					message: 'El perfil ya existe',
					create: false,
				})
			}
			res.status(201).json(profile)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const profile = await Profile.update(
				{
					...req.body,
				},
				{
					where: {
						id: req.params.id,
					},
				},
			)
			if (profile[0]) {
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
			const profile = await Profile.findByPk(req.params.id)

			if (!profile) {
				return res.json({
					message: 'No se encontro profile',
				})
			}
			res.status(201).json(profile?.dataValues)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}
}
