import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerYaml = path.resolve(__dirname, '../../swagger.yaml')

const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'TallerXpert API',
			version: '1.0.0',
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
	},
	apis: [swaggerYaml]
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
