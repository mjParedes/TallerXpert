import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const swaggerYaml = path.resolve(__dirname, '../../swagger.yaml')

const swaggerOptions: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'TallerXpert API',
            version: '1.0.0',
            description: 'Managing your workshop has never been so simple',
        },
    },
    servers: [
        {
            url: 'http://localhost:8080',
        },
    ],
    apis: [swaggerYaml]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec
