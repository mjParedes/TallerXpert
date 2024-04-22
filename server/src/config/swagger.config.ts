import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { PORT } from '../constants'

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
            url: `http://localhost:${PORT}`,
            description: 'Local server',
        },
        {
            url: `https://s14-36-t-node-react.onrender.com`,
            description: 'Testing server',
        },
    ],
    apis: [swaggerYaml]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec
