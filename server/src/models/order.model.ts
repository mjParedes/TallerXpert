import {
	AllowNull,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from '../models/user.models'

@Table({
	timestamps: false,
	tableName: 'order', // nombre de la tabla en la base de datos
})
export class Order extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	id!: string

	@Column({
		type: DataType.UUID,
	})
	user_id!: string

	// @HasMany(() => User)
	// user!: User
	@Column({
		type: DataType.UUID,
	})
	product_id!: string

	@Column({
		type: DataType.INTEGER,
	})
	unit_price!: number

	@Column({
		type: DataType.STRING,
	})
	product_name!: string

	@Column({
		type: DataType.STRING,
	})
	description!: string | null

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('pending', 'closed'),
	})
	status!: 'pending'
}
