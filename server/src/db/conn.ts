import { Sequelize } from 'sequelize-typescript'
import { User } from '../models'
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
  models: [User],
})
