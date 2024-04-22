import { NextFunction, Request, Response } from 'express'
import { Reparation, User } from '../models'
import { Client } from '../models'
import { Product } from '../models/product.model'
import Pdfmake from 'pdfmake'
import { ErrorMessage, fontsPdf, pdfCreate } from '../utils'
import { dataHarcodeada } from '../constants'
import { HttpCodes } from '../utils'

export interface ProductReparation {
	name: string
	brand: string
	model: string
	serial_number?: string
	detail: string
	workshopId?: string
}
export interface ClientOrderReparation {
	fullName: string
	dni: number
	address: string
	city?: string
	phone?: number
	email: string
}
export interface ReparationOrder {
	ot_number?: string
	products: [ProductReparation]
	client: string
	issue_detail: string
	note?: string
	diagnostic?: string
	amount?: number
	entry_date?: Date
	exit_date?: Date
	register_by?: string
	reparation_cost?: number
	revision_cost: number
	total_cost?: number
	is_paid?: boolean
	state?: boolean
	assigned_user?: string
	warranty_invoice_number?: string
	warranty_date?: Date
}

export class ReparationController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await Reparation.findAll({
				include: [Client, Product, User],
			})
			res.status(HttpCodes.SUCCESS).json(results)
		} catch (error: any) {
			next(error)
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Reparation.findOne({
				where: {
					id: req.params.id,
				},
				include: [Client, Product, User],
			})
			res.status(HttpCodes.SUCCESS).json(result)
		} catch (error: any) {
			next(error)
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const products = req.body.products
			const client = req.body.client
			let clientId: string
			if (!client) {
				throw new Error('No se ingresó un cliente')
			}
			const clientInstance = await Client.findOne({
				where: { dni: client.dni },
			})
			if (clientInstance) {
				clientId = clientInstance.id
			} else {
				const newClient = await Client.create({ ...client })
				clientId = newClient.id
			}
			const reparation = await Reparation.create(
				{ client_id: clientId },
				{ include: [Client, Product, User] },
			)
			if (!products) {
				throw new Error('No se registraron artefactos o productos')
			}
			products.forEach(async (product: any) => {
				const newProduct = await Product.create({
					reparation_id: reparation.id,
					client_id: clientId,
					...product,
				})
				await reparation.$add('products', newProduct)
			})
			reparation.save()
			res.status(HttpCodes.SUCCESS_CREATED).json(reparation)
		} catch (error: any) {
			next(error)
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
			res.status(HttpCodes.SUCCESS).json(result)
		} catch (error: any) {
			next(error)
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Reparation.destroy({
				where: {
					id: req.params.id,
				},
			})
			res.status(HttpCodes.SUCCESS_DELETED).json(result)
		} catch (error: any) {
			next(error)
		}
	}

	// {
	//   "id": "0f56140e-4245-48e1-8ba1-5b6a3baff18c",
	//   "ot_number": "00000001",
	//   "client_id": "4b14d2f6-7086-425f-b416-b61cfa2e8b60",
	//   "created_at": "2024-04-21T06:48:43.000Z",
	//   "updated_at": "2024-04-21T06:48:43.000Z",
	//   "assigned_user": null,
	//   "client": {
	//     "id": "4b14d2f6-7086-425f-b416-b61cfa2e8b60",
	//     "fullName": "Marcos Poed",
	//     "dni": 45874545,
	//     "address": "Rambla 33",
	//     "city": "Barcelona",
	//     "phone": 69696968,
	//     "email": "marcospoed@gmail.com"
	//   },
	//   "products": [
	//     {
	//       "id": "9f77d0d9-2f0c-4419-8f3b-6f798f2c8bea",
	//       "product_name": "Radio",
	//       "product_category": "Electrodométicos",
	//       "brand": "PANASONIC",
	//       "model": "SPF484754",
	//       "serial_number": "AZEFTYUIOPLJH",
	//       "detail": null,
	//       "workshop": null,
	//       "issue_detail": "Sin sonido",
	//       "note": null,
	//       "diagnostic": null,
	//       "state": null,
	//       "is_paid": null,
	//       "total_cost": null,
	//       "revision_cost": "30.00",
	//       "reparation_cost": null,
	//       "warranty_date": "2024-03-25T00:00:00.000Z",
	//       "warranty_invoice_number": "R02-458454",
	//       "entry_date": "2024-04-21T06:48:43.000Z",
	//       "exit_date": "2024-04-21T06:48:44.000Z",
	//       "reparation_id": "0f56140e-4245-48e1-8ba1-5b6a3baff18c",
	//       "client_id": "4b14d2f6-7086-425f-b416-b61cfa2e8b60"
	//     },

	static async getPdf(req: Request, res: Response, next: NextFunction) {
		try {
			const { otNumber } = req.params

			// buscamos la reparation por ot_number
			const reparation = await Reparation.findOne({
				where: {
					ot_number: otNumber,
				},
				include: [Client, Product],
			})

			if (!reparation) throw new Error(ErrorMessage.REPARATION_NOT_FOUND)

			const pdf_make = new Pdfmake(fontsPdf)

			// creamos las opciones del pdf a partir de la respuesta con la funcion del helper
			const data_pdf = await pdfCreate(dataHarcodeada)

			// creamos el pdf
			const pdf_doc = pdf_make.createPdfKitDocument(data_pdf as any)

			// seteamos los encabezados del pdf
			res.setHeader('Content-Type', 'application/pdf')

			// subiendo cambios
			pdf_doc.pipe(res)
			pdf_doc.end()
		} catch (error) {
			next(error)
		}
	}
}
