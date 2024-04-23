import { NextFunction, Request, Response } from 'express'
import { Product } from '../models/product.model'
import { ErrorMessage } from '../utils'
// import { Order } from '../models'
import { createPreference, getMerchantOrder } from '../utils/mercadopago.utils'

type TypeProductPreference = {
	userId: string
	product_name: string
	unit_price: number
	product_id: string
	description?: string
}

export class ProductController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await Product.findAll()
			res.status(200).json(results)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Product.findOne({
				where: {
					id: req.params.id,
				},
			})
			res.status(200).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const product = await Product.create(req.body)
			res.status(201).json(product)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Product.update(
				{
					...req.body,
				},
				{
					where: {
						id: req.params.id,
					},
				},
			)
			res.status(200).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await Product.destroy({
				where: {
					id: req.params.id,
				},
			})
			res.status(200).json(result)
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}

	static async sendEmail(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params

			const product = await Product.findByPk(id)

			if (!product) {
				throw new Error(ErrorMessage.PRODUCT_NOT_FOUND)
			}

			const urlMercadoLibre = `https://api.mercadolibre.com/sites/MLA/search?q=prueba`
		} catch (error) {
			next(error)
		}
	}

	static async sendCheckout(req: Request, res: Response, next: NextFunction) {
		try {
			const { productId } = req.params

			if (!res.locals.token && !productId) {
				return res.json({
					message: 'Faltan datos',
				})
			}

			const product = await Product.findByPk(productId)

			if (!product) {
				throw new Error(ErrorMessage.PRODUCT_NOT_FOUND)
			}

			// const order = await Order.create({
			// 	productId: product.id,
			// 	status: 'pending',
			// })

			const preference = {
				items: [
					{
						id: product.id,
						title: product.product_name,
						quantity: 1,
						unit_price: product.total_cost ?? 200,
						description: product.issue_detail ?? 'Detalle de equipo',
						// picture_url?: string,
						category_id: product.product_category || 'Equipos',
						// currency_id?: string,
					},
				],
				back_urls: {
					success: 'https://s14-36-t-node-react.vercel.app/thanks',
					pending: 'https://s14-36-t-node-react.vercel.app/',
					failure: 'https://s14-36-t-node-react.vercel.app/thanks',
				},
				auto_return: 'approved',
				external_reference: product.id,
				notification_url:
					'https://s14-36-t-node-react.onrender.com/api/order/webhooks',
			}

			const response = await createPreference(preference)

			console.log(
				response.init_point,
				response.external_reference,
				'MERCADO PAGO',
			)
			// return res.json(response)
			// res.status(200).json({
			// 	url: response.init_point,
			// 	orderId: response.external_reference,
			// })
		} catch (error: any) {
			next(error)
		}
	}
	// static async getWebhook(req: Request, res: Response) {
	// 	try {
	// 		const { id, topic } = req.query
	// 		if (topic == 'merchant_order') {
	// 			const { external_reference, order_status } = await getMerchantOrder(
	// 				Number(id),
	// 			)
	// 			if (order_status == 'paid') {
	// 				const orderId = external_reference
	// 				const newOrder = await Order.update(
	// 					{ status: 'closed' },
	// 					{
	// 						where: {
	// 							id: orderId,
	// 						},
	// 					},
	// 				)
	// 				if (newOrder[0] > 0) {
	// 					return res.status(200).json({
	// 						message: 'Todo bien',
	// 						buy: true,
	// 					})
	// 				}
	// 				res.status(200).json({
	// 					message: 'Algo salio mal',
	// 					buy: false,
	// 				})
	// 			}
	// 		}
	// 	} catch (error: any) {
	// 		res.status(500).json({
	// 			message: error.message,
	// 		})
	// 	}
	// }
}
