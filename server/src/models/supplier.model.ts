import {
	AllowNull,
	Column,
	DataType,
	Model,
	Table,
	Unique,
} from 'sequelize-typescript'

@Table({
	timestamps: false,
	tableName: 'supplier',
})
export class Supplier extends Model {
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
	name!: string

	@AllowNull(false)
	@Unique(true)
	@Column({
		type: DataType.STRING,
	})
	cuit!: string

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
		type: DataType.STRING,
	})
	phone!: string

	@AllowNull(false)
	@Unique(true)
	@Column({
		type: DataType.STRING,
	})
	email!: string

	@AllowNull(false)
	@Unique(true)
	@Column({
		type: DataType.STRING,
	})
	seller_name!: string

	@AllowNull(false)
	@Column({
		type: DataType.JSON,
		defaultValue: [],
		get() {
			const rawValue = this.getDataValue('categories')
			return rawValue ? JSON.parse(rawValue) : []
		},
		set(value: string[]) {
			this.setDataValue('categories', JSON.stringify(value))
		},
	})
	categories!: JSON
}
