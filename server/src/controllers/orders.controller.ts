import { createPreference, getMerchantOrder } from '../utils/mercadopago.utils'
import { Order } from '../models/order.model'
import { Request, Response } from 'express'
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
			return res.json(response)
			// res.status(200).json({
			// 	url: response.init_point,
			// 	orderId: response.external_reference,
			// })
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
}
