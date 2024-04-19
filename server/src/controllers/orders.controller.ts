import { createPreference, getMerchantOrder } from '../utils/mercadopago.utils'
import { Order } from '../models/order.model'
import { Request, Response, NextFunction } from 'express'
import Pdfmake from 'pdfmake'
import { fontsPdf, pdfCreate } from '../utils'
import { dataHarcodeada } from '../constants'

type TypeProductPreference = {
	user_id: string
	product_name: string
	unit_price: number
	product_id: string
	description?: string
}

export class OrderController {
	static async create(req: Request, res: Response) {
		try {
			const product: TypeProductPreference = req.body
			if (!res.locals.token && !product.product_id) {
				return res.json({
					message: 'Faltan datos',
				})
			}
			const order = await Order.create({
				...product,
				status: 'pending',
			})
			const preference = {
				items: [
					{
						id: product.product_id,
						title: product.product_name,
						quantity: 1,
						unit_price: product.unit_price,
						// description?: string,
						// picture_url?: string,
						// category_id?: string,
						// currency_id?: string,
					},
				],
				back_urls: {
					success: 'https://s14-36-t-node-react.vercel.app/thanks',
					pending: 'https://s14-36-t-node-react.vercel.app/',
					failure: 'https://s14-36-t-node-react.vercel.app/thanks',
				},
				auto_return: 'approved',
				external_reference: order.dataValues.id,
				notification_url:
					'https://s14-36-t-node-react.onrender.com/api/order/webhooks',
			}
			const response = await createPreference(preference)
			res.status(200).json({
				url: response.init_point,
				orderId: response.external_reference,
			})
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}
	static async getWebhook(req: Request, res: Response) {
		try {
			const { id, topic } = req.query
			if (topic == 'merchant_order') {
				const { external_reference, order_status } = await getMerchantOrder(
					Number(id),
				)
				if (order_status == 'paid') {
					const orderId = external_reference
					const newOrder = await Order.update(
						{ status: 'closed' },
						{
							where: {
								id: orderId,
							},
						},
					)
					if (newOrder[0] > 0) {
						return res.status(200).json({
							message: 'Todo bien',
							buy: true,
						})
					}
					res.status(200).json({
						message: 'Algo salio mal',
						buy: false,
					})
				}
			}
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}
	static async getAll(req: Request, res: Response) {
		try {
			const orders = await Order.findAll()
			res.json(orders)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async getPdf(req: Request, res: Response, next: NextFunction) {
		try {
			// const { orderId } = req.params

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
