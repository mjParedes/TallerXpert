import { z } from 'zod'

export const ClientSchema = z.object({
	fullName: z
		.string({
			invalid_type_error: 'El nombre y apellido del cliente debe ser un string',
		})
		.min(3, {
			message:
				'El nombre y apellido del cliente debe tener al menos 3 caracteres',
		})
		.max(50, {
			message:
				'El nombre y apellido del cliente debe tener como maximo 50 caracteres',
		}),
	// dni: z.coerce.number({
	//   required_error: 'El dni del cliente es requerido',
	//   invalid_type_error: 'El dni del cliente debe ser un number',
	// }).int({
	//   message: 'El dni del cliente debe ser un entero',
	// })
	dni: z
		.number({
			invalid_type_error: 'El dni del cliente debe ser un number',
			required_error: 'El dni del cliente es requerido',
		})
		.gte(10000000, {
			message: 'El dni del cliente debe tener como 8 digitos',
		})
		.lte(99999999, {
			message: 'El dni del cliente debe tener como 8 digitos',
		}),
	address: z
		.string({
			invalid_type_error: 'La direccion del cliente debe ser un string',
		})
		.min(3, {
			message: 'La direccion del cliente debe tener al menos 3 caracteres',
		})
		.max(30, {
			message: 'La direccion del cliente debe tener como maximo 30 caracteres',
		}),
	city: z
		.string({
			invalid_type_error: 'La ciudad del cliente debe ser un string',
		})
		.min(3, {
			message: 'La ciudad del cliente debe tener al menos 3 caracteres',
		})
		.max(30, {
			message: 'La ciudad del cliente debe tener como maximo 30 caracteres',
		}),
	phone: z
		.number({
			invalid_type_error: 'El telefono del cliente debe ser un number',
			required_error: 'El telefono del cliente es requerido',
		})
		.gte(10000000, {
			message: 'El telefono del cliente debe tener 8 digitos',
		})
		.lte(99999999, {
			message: 'El telefono del cliente debe tener 8 digitos',
		}),
	email: z
		.string({
			invalid_type_error: 'El email del cliente debe ser un string',
		})
		.email({
			message: 'El email del cliente debe ser un email valido',
		})
		.min(3, {
			message: 'El email del cliente debe tener al menos 3 caracteres',
		})
		.max(50, {
			message: 'El email del cliente debe tener como maximo 50 caracteres',
		})
		.trim(),
})
