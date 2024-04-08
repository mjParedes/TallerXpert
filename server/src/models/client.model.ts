import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { User } from '.'

@Table({
	timestamps: false,
	tableName: 'client',
})
export class Client extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	id!: string

	@Column({
		type: DataType.STRING,
	})
	name!: string

	@Column({
		type: DataType.STRING,
	})
	lastName!: string

	@Column({
		type: DataType.STRING,
	})
	phone!: string

	@Column({
		type: DataType.STRING,
	})
	address!: string

  @HasMany(() => User)
  users!: User[];
}
