import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddelware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.headers['authorization']?.split(' ')[1]
	if (!token) {
		return res.status(401).send('No hay Token')
	}

	const tokenVerify = jwt.verify(token, process.env.JWT_SECRET as string)

	if (tokenVerify) {
		res.locals.token = tokenVerify
		next()
		return
	} else {
		return res.status(401).send('Token invalido')
	}
}
