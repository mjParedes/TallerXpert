import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
	timestamps: false,
	tableName: 'user',
})
export class User extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4, // esto lo voy a cambiar y hago esto para crear la rama backend
	})
	id!: string

	@Column({
		type: DataType.STRING,
	})
	fullName!: string

	@Column({
		type: DataType.STRING,
	})
	email!: Date

	@Column({
		type: DataType.STRING,
	})
	password!: string
}
