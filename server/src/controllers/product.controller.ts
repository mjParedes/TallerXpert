import { NextFunction, Request, Response } from 'express'
import { Product, productState } from '../models/product.model'
import { ErrorMessage } from '../utils'
import {
	client,
	createPreference,
	getMerchantOrder,
} from '../utils/mercadopago.utils'
import { Payment } from 'mercadopago'
import { sendEmailWithAttachment } from '../utils/doc.mails'

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

	static async sendCheckout(req: Request, res: Response, next: NextFunction) {
		try {
			const { productId } = req.params

			if (!productId) {
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

			// funcionalidad para crear la preferencia en Mercado Pago
			//====== MERCADOPAGO ======

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
					'https://291b-179-6-166-5.ngrok-free.app/api/product/mp/webhook',
			}

			const response = await createPreference(preference)

			// actualizar el url de mercadopago en la base de datos
			await Product.update(
				{
					uriMercadoPago: response.init_point,
				},
				{
					where: {
						id: product.id,
					},
				},
			)

			// mensaje para el usuario usando nodemailer y whatsapp sendpulse
			const message = `Hola👋 usuario ${product.client.fullName} te escribimos desde TallerXpert. Para enviarte el pago, hemos generado la siguiente URL de Mercado Pago: ${response.init_point}. Realiza el pago para el despacho de tu equipo ${product.product_name} ${product.brand}. El costo total es de $${product.total_cost || '$200'}. Además, si necesitas alguna asistencia adicional o tienes alguna pregunta, no dudes en contactarnos. ¡Gracias por tu colaboración!`

			// enviar correo con la url del pago al cliente
			//====== NODEMAILER ======

			await sendEmailWithAttachment({
				text: message,
				subject: `Pago TALLERXPERT Equipo ${product.product_name} ${product.brand}`,
				to: product.client.email,
			})

			// enviar mensaje wasap con la url del pago al cliente

			// return res.json(response)
			// res.status(200).json({
			// 	url: response.init_point,
			// 	orderId: response.external_reference,
			// })
		} catch (error: any) {
			next(error)
		}
	}

	static async getWebhook(req: Request, res: Response) {
		try {
			const payment = req.query

			if (payment.type === 'payment') {
				const dataId = payment['data.id'] as string | number

				const paymented = new Payment(client)

				const data = await paymented.get({
					id: dataId,
				})

				// verificar el estado del pago
				if (data && data.status === 'approved') {
					// actualizar el estado del producto en la base de datos como pago aprobado
					const product = await Product.findByPk(data.external_reference)

					if (!product) {
						throw new Error(ErrorMessage.PRODUCT_NOT_FOUND)
					}

					await Product.update(
						{
							is_paid: true,
							state: productState.PAID,
						},
						{
							where: {
								id: product.id,
							},
						},
					)

					// mensaje para el usuario usando nodemailer y whatsapp sendpulse
					const message = `Hola👋 desde la App TallerXpert el usuario ${product.product_name} realizo el pago para el despacho de su equipo ${product.product_name} ${product.brand} con serial ${product.serial_number}. El costo total fue de $${product.total_cost || '$200'}. ¡Nos vemos pronto! 🚀`

					// enviar correo con la url del pago al cliente
					//====== NODEMAILER ======
					// enviar correo de confirmación de pago al admin
					await sendEmailWithAttachment({
						text: message,
						subject: `PAGO TALLERXPERT - Usuario ${product.client.fullName} - Equipo ${product.product_name} ${product.brand} - APROBADO`,
						to: 'tallerxpert@gmail.com',
					})

					// enviar mensaje de confirmación de pago al admin

					return res.status(200).json({ ok: true })
				}
			}
		} catch (error: any) {
			res.status(500).json({
				message: error.message,
			})
		}
	}
}
