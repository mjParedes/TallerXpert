import { Sequelize } from 'sequelize-typescript'
import { Client, Profile, Reparation, User, Workshop, Product} from '../models'
import { DATABASE_URL } from '../constants'

export const sequelize = new Sequelize(DATABASE_URL, {
	dialect: 'mysql',
	logging: false,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	// models: [User, Workshop, Client],
	models: [User, Profile, Workshop, Client, Reparation, Product],
})
