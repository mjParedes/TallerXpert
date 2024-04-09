import express, { json } from 'express'
import morgan from 'morgan'
import { sequelize } from './db/conn'
import { NODE_ENV, PORT } from './constants'
import { corsMiddleware } from './middlewares'
import apiRoute from './routes/api.route'
import swaggerUI from 'swagger-ui-express'
import  { swaggerSpec }  from './config/swagger.config'

const app = express()

app.use(json())
app.use(morgan('dev'))
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/api', apiRoute)
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(PORT, async () => {
	console.log(`Server on port ${PORT}`)
	try {
		await sequelize.sync(
			// NODE_ENV === 'production' ? { alter: true } : { force: true },
			{ alter: true },
		)
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
})
