import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Request, Response } from 'express'
import { User } from '../models'

export class AuthAndSignController {
	static async register(req: Request, res: Response) {
		try {
			// console.log(req.body);
			if (!req.body.email || !req.body.password) {
				return res.status(400).json({ message: 'Faltan datos' })
			}
			const user = await User.create({
				// where: {
				// 	email: req.body.email,
				// },
				// defaults: {
					...req.body,
					rol: "admin",
					password: getSHA256ofString(req.body.password),
				// },
			})
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
			res.status(201).json({
				...user.dataValues,
				token,
			})
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
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
