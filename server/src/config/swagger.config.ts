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
            url: 'http://localhost:3000',
        },
    ],
    apis: [swaggerYaml],
    components: {
        schemas: {
            User: {
                type: 'object',
                required: ['email', 'password', 'role'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        uniqueItems: true,
                    },
                    password: {
                        type: 'string',
                        pattern: '^(?=.*[A-Z])(?=.*[a-z]).{5,8}$',
                        example: 'Password',
                    },
                    clientId: {
                        type: 'string',
                    },
                }
            },
            Workshop: {
                type: 'object',
                required: ['title', 'ownerId', 'location', 'category'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    ownerId: {
                        type: 'string',
                        format: 'uuid',
                    },
                    title: {
                        type: 'string',
                    },
                    photo_url: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    }
                }
            },
            Client: {
                type: 'object',
                required: ['fullName', 'dni', 'address', 'city', 'phone', 'email'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    fullName: {
                        type: 'string',
                    },
                    dni: {
                        type: 'number',
                        uniqueItems: true,
                    },
                    address: {
                        type: 'string',
                    },
                    city: {
                        type: 'string',
                    }
                }
            },
            Reparation: {
                type: 'object',
                required: ['workshop', 'client', 'description'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    workshop: {
                        type: 'string',
                    },
                    client: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    }
                }
            },
            Product: {
                type: 'object',
                required: ['ot_number', 'product_name', 'product_category', 'brand', 'workshop'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    ot_number: {
                        type: 'number',
                    },
                    product_name: {
                        type: 'string',
                    },
                    product_category: {
                        type: 'string',
                    },
                    brand: {
                        type: 'string',
                    },
                }
            },
            Profile: {
                type: 'object',
                required: ['user', 'workshop', 'profile'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    user: {
                        type: 'string',
                    },
                    workshop: {
                        type: 'string',
                    },
                    profile: {
                        type: 'string',
                    },
                }
            },
            Review: {
                type: 'object',
                required: ['workshop_id', 'mechanic_id', 'comment'],
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                    },
                    workshop_id: {
                        type: 'string',
                    },
                    mechanic_id: {
                        type: 'string',
                    },
                    comment: {
                        type: 'string',
                    }
                }
            },
        },
    },
};

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec
