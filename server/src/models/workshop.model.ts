import {
	AllowNull,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	IsUrl,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from './user.models'

export enum workshopCategory {
	Electronica = 'electronica',
	Mecanica = 'mecanica',
	Varios = 'varios',
}

@Table({
	timestamps: false,
	tableName: 'workshop',
})

export class Workshop extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
	})
	id!: string

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column({ type: DataType.UUID })
	ownerId!: string

	@BelongsTo(() => User)
	owner!: User

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title!: string

	@IsUrl
	@Column({
		type: DataType.STRING,
	})
	photo_url!: string

	@Column({
		type: DataType.STRING,
	})
	description!: string

	@Column({
		type: DataType.STRING,
	})
	location!: string

	@AllowNull(false)
	@Column({
		type: DataType.ENUM(...Object.values(workshopCategory)),
	})
	category!: workshopCategory
}
