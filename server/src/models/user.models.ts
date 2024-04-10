import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Client } from '.';
import { profile } from 'console'
import { Model, Column, Table, DataType, AllowNull, Unique, HasOne } from 'sequelize-typescript'

@Table({
	timestamps: false,
	tableName: 'user',
})
export class User extends Model<User> {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	id!: number

	@AllowNull(false)
	@Unique(true)
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

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('admin', 'trabajador'),
	})
	rol!: 'admin' | 'trabajador'

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
		field: 'is_active', // Esto especifica el nombre del campo en la tabla de la base de datos
	})
	is_active!: boolean

	// Relacion con la tabla Profile, falta terminarlo
	// @HasOne(() => Profile)
	// profile: Profile
}
