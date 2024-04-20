import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Request, Response } from 'express'
import { Profile, User } from '../models'

export class AuthAndSignController {
	static async register(req: Request, res: Response) {
		try {
			if (!req.body.email || !req.body.password ) {
				return res.status(400).json({ message: 'Faltan datos' })
			}
			const user = await User.create({			
					...req.body,
					password: getSHA256ofString(req.body.password),
			})
			if(!user){
				return res.status(500).json({message: "Ocurrió un error"})
			}
			const userProfile = await Profile.create({
				fullName: req.body.fullName,
				userId: user.id
			})
			await userProfile.save()
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
			res.status(201).json({
				...user.dataValues,
				token,
			})
		} catch (error: any) {
			res.status(500).json({
				message:  error.message,
			})
		}
	}
	static async signin(req: Request, res: Response) {
		try {
			const user = await User.findOne({
				where: {
					email: req.body.email,
					password: getSHA256ofString(req.body.password),
				},
			})
			if (user) {
				const token = jwt.sign(
					{ id: user.id },
					process.env.JWT_SECRET as string,
				)
				return res.status(201).json({
					...user.dataValues,
					token,
				})
			}
			res.status(401).json({
				message: 'No se encontro usuario',
			})
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}
}

function getSHA256ofString(text: string) {
	return crypto.createHash('sha256').update(text).digest('hex')
}