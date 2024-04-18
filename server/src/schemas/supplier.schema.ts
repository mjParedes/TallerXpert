import { z } from 'zod'

export const SupplierSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'El nombre de la empresa del proveedor debe ser un string',
		})
		.min(3, {
			message:
				'El nombre debe tener al menos 3 caracteres',
		})
		.max(50, {
			message:
				'El nombre debe tener como maximo 50 caracteres',
		}),
	cuit: z
		.number({
			invalid_type_error: 'El CUIT debe ser un number',
			required_error: 'El CUIT es requerido',
		})
		.gte(1000000000, {
			message: 'El dni del cliente debe tener como mínimo 10 digitos',
		})
		.lte(99999999000, {
			message: 'El dni del cliente debe tener como máximo 11 digitos',
		}),
	address: z
		.string({
			invalid_type_error: 'La direccion debe ser un string',
		})
		.min(3, {
			message: 'La direccion debe tener al menos 3 caracteres',
		})
		.max(30, {
			message: 'La direccion debe tener como maximo 50 caracteres',
		}),
	city: z
		.string({
			invalid_type_error: 'La ciudad debe ser un string',
		})
		.min(3, {
			message: 'La ciudad debe tener al menos 3 caracteres',
		})
		.max(30, {
			message: 'La ciudad debe tener como maximo 30 caracteres',
		}),
	phone: z
		.number({
			invalid_type_error: 'El telefono debe ser un number',
			required_error: 'El telefono es requerido',
		})
		.gte(10000000000, {
			message: 'El telefono debe tener 11 digitos',
		})
		.lte(99999999000, {
			message: 'El telefono debe tener 11 digitos',
		}),
	email: z
		.string({
			invalid_type_error: 'El email del cliente debe ser un string',
		})
		.email({
			message: 'El email del cliente debe tener un formato de email valido tipo  user@example.com',
		})
		.trim(),
    seller_name: z
		.string({
			invalid_type_error: 'El nombre del proveedor debe ser un string',
		})
		.min(3, {
			message: 'El nombre del proveedor debe tener al menos 3 caracteres',
		})
		.max(50, {
			message: 'El nombre del proveedor debe tener como maximo 50 caracteres',
		}),
	categories: z.array(z.string()).or(z.string().optional()),
})
