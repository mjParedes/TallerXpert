import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Client } from '.';

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

  @AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	email!: string

  @AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	password!: string

  @AllowNull(false)
	@ForeignKey(() => Client)
	@Column({ type: DataType.UUID })
	clientId!: string

  @BelongsTo(() => Client)
  client!: Client
}
