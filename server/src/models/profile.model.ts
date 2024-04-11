import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { User } from '.'

@Table({
	timestamps: false,
	tableName: 'profile',
})
export class Profile extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4, // esto lo voy a cambiar y hago esto para crear la rama backend
	})
	id!: string

	@Column({
		primaryKey: true,
		type: DataType.UUID,
	})
	user_id!: string

	// @HasMany(() => User)
	// user!: User

	@Column({
		type: DataType.STRING,
	})
	fullName!: string

	@Column({
		type: DataType.STRING(20),
	})
	phone!: string

	@Column({
		type: DataType.STRING,
	})
	photo_url!: string
}
