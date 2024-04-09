import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript'
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

  @AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	fullName!: string

  @AllowNull(false)
  @Unique(true)
	@Column({
		type: DataType.INTEGER,
	})
	dni!: number

  @AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	address!: string

  @AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	city!: string

  @AllowNull(false)
	@Column({
		type: DataType.INTEGER,
	})
	phone!: number

  @AllowNull(false)
  @Unique(true)
	@Column({
		type: DataType.STRING,
	})
	email!: string

	// falta cambiar la relacion de User por Workshop
	@HasMany(() => User)
	users!: User[]
}
