import { NextFunction, Request, Response } from 'express'
import { Reparation, User } from '../models'
import { Client } from '../models'
import { Product } from '../models/product.model'
import Pdfmake from 'pdfmake'
import { ErrorMessage, fontsPdf, pdfCreate } from '../utils'
import {
	SENDPULSE_WHATSAPP_ID,
	SENDPULSE_WHATSAPP_SECRET,
	dataHarcodeada,
} from '../constants'
import { HttpCodes } from '../utils'
import { sendEmailWithAttachment } from '../utils/doc.mails'
import { Base64Encode } from 'base64-stream'

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
			const data_pdf = await pdfCreate(reparation)

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

	static async sendPdfandWhatsapp(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { otNumber } = req.params

			//========= funcionalidad para enviar email =========

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
			const data_pdf = await pdfCreate(reparation)

			// creamos el pdf
			// const pdf_doc = pdf_make.createPdfKitDocument(data_pdf as any)
			const pdf_doc = pdf_make.createPdfKitDocument(data_pdf as any)

			// creamos el pdf como binario
			const base64Stream = pdf_doc.pipe(new Base64Encode())
			pdf_doc.end()

			let tempFileBase64 = ''

			base64Stream.on('data', function (buffer) {
				tempFileBase64 += buffer.toString()
			})

			// funcionalidad para enviar el pdf por correo
			base64Stream.on('end', async function () {
				await sendEmailWithAttachment(tempFileBase64, otNumber)
			})

			//========= funcionalidad para enviar x whatsapp =========

			//-------------- token sendpulse ----------------
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					grant_type: 'client_credentials',
					client_id: SENDPULSE_WHATSAPP_ID,
					client_secret: SENDPULSE_WHATSAPP_SECRET,
				}),
			}

			const fetchApiToken = await fetch(
				'https://api.sendpulse.com/oauth/access_token',
				options,
			)

			const { access_token } = await fetchApiToken.json()

			// const { message, phone } = req.body
			// const phone = '+573224849822'
			const phone = '+51932052849'

			//-------------- nuevo contacto whatsapp ----------------
			// const fetchApiNewContact = await fetch(
			// 	'https://api.sendpulse.com/whatsapp/contacts',
			// 	{
			// 		method: 'POST',
			// 		headers: {
			// 			Authorization: `Bearer ${access_token}`,
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify({
			// 			phone,
			// 			name: 'contacto 4',
			// 			bot_id: '6622e56efa831206cc04c055', // esto lo saque de la aplicacion sino caballero dela api whatsapp
			// 			tags: ['contacto ncountry'],
			// 			variables: [
			// 				{
			// 					name: 'image',
			// 					value: 'https://ui-avatars.com/api/?name=John+Doe',
			// 				},
			// 			],
			// 		}),
			// 	},
			// )

			// const responseNewContact = await fetchApiNewContact.json()

			// // habilitar contacto

			// await fetch('https://api.sendpulse.com/whatsapp/contacts/enable', {
			// 	method: 'POST',
			// 	headers: {
			// 		Authorization: `Bearer ${access_token}`,
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({
			// 		contact_id: responseNewContact.id,
			// 	}),
			// })
			// // enviar plantilla

			// await fetch(
			// 	'https://api.sendpulse.com/whatsapp/contacts/sendTemplateByPhone',
			// 	{
			// 		method: 'POST',
			// 		headers: {
			// 			Authorization: `Bearer ${access_token}`,
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify({
			// 			bot_id: '6622e56efa831206cc04c055',
			// 			phone,
			// 			template: {
			// 				name: 'taller_xpert_2',
			// 				components: [],
			// 				language: {
			// 					policy: 'deterministic',
			// 					code: 'es',
			// 				},
			// 			},
			// 		}),
			// 	},
			// )

			// mensaje por whatsapp para contacto ya suscrito
			const url = `${req.protocol}://${req.hostname}`

			const message = `Hola Administrador de TallerXpert, este es tu pdf: ${url}/api/reparation/pdf/${otNumber}`

			console.log('message', message)

			const fetchApi = await fetch(
				'https://api.sendpulse.com/whatsapp/contacts/sendByPhone',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${access_token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						// contact_id: "662303ff3e6468c75a032936",
						bot_id: '6622e56efa831206cc04c055',
						phone,
						message: {
							type: 'text',
							text: {
								body: message,
							},
						},
					}),
				},
			)
			const response = await fetchApi.json()
			return res.status(200).send({
				message: 'WhatsApp enviado correctamente.',
				response,
			})
		} catch (error) {
			next(error)
		}
	}

	static async handleWebhookWhatsapp(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const [
				{
					info: {
						message: {
							channel_data: {
								message: {
									text: { body = '' } = {},
									button: { payload = '' } = {},
								} = {},
							} = {},
						} = {},
					} = {},
					service = '',
					title = '',
					contact: { id: contact_id = '' } = {},
				},
			] = req.body

			if (
				service === 'whatsapp' &&
				title === 'incoming_message' &&
				(body === 'Si' || payload === 'Si')
			) {
				//-------------- token sendpulse ----------------
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						grant_type: 'client_credentials',
						client_id: SENDPULSE_WHATSAPP_ID,
						client_secret: SENDPULSE_WHATSAPP_SECRET,
					}),
				}

				const fetchApiToken = await fetch(
					'https://api.sendpulse.com/oauth/access_token',
					options,
				)

				const { access_token } = await fetchApiToken.json()

				const message =
					'Este es tu pdf: https://cvl.bdigital.uncu.edu.ar/objetos_digitales/15657/monedas-virtuales-y-su-impacto-en-el-comercio-electr.pdf'

				//-------------- mensaje whatsapp ----------------
				// esto es para enviar el mensaje por whatsapp
				const fetchApi = await fetch(
					'https://api.sendpulse.com/whatsapp/contacts/send',
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${access_token}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							// contact_id: "662303ff3e6468c75a032936",
							contact_id,
							message: {
								type: 'text',
								text: {
									body: message,
								},
							},
						}),
					},
				)
				const response = await fetchApi.json()
				return res.status(200).send({
					message: 'WhatsApp enviado correctamente.',
					response,
				})
			}
		} catch (error) {
			console.log(error)
			res.status(500).send({
				message: 'Error al enviar el mensaje de WhatsApp.',
				error: error,
			})
		}
	}
}
