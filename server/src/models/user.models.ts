import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, IsEmail, Model, Table, Unique } from 'sequelize-typescript'
import { Client, Profile, Reparation } from '.';

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
	@Column({
		type: DataType.STRING,
	})
	fullName!: string

	@AllowNull(false)
	@IsEmail
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
	@HasOne(() => Profile)
	profile!: Profile

}
