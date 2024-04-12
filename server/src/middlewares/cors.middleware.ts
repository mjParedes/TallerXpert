import { ACCEPTED_ORIGINS } from '../constants/data.constant'
import cors from 'cors'

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	cors({
		origin: (origin: any, callback: any) => {
			if (acceptedOrigins.includes(origin)) {
				return callback(null, true)
			}

			if (!origin) {
				return callback(null, true)
			}

			return callback(new Error('Not allowed by CORS'))
		},
	})
