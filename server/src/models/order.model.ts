import {
	AllowNull,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Client, Product, User } from '../models'

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

	// @ForeignKey(() => User)
	// @Column({
	// 	type: DataType.UUID,
	// })
	// userId!: string

	@AllowNull(false)
	@ForeignKey(() => Product)
	@Column({
		type: DataType.UUID,
	})
	productId?: string

	@AllowNull(false)
	@BelongsTo(() => Product)
	product?: Product

	// @Column({
	// 	type: DataType.UUID,
	// })
	// product_id!: string

	// @Column({
	// 	type: DataType.INTEGER,
	// })
	// unit_price!: number

	// @Column({
	// 	type: DataType.STRING,
	// })
	// product_name!: string

	@AllowNull(false)
	@Column({
		type: DataType.STRING,
	})
	uriMercadoPago?: string

	// @Column({
	// 	type: DataType.STRING,
	// })
	// description!: string | null

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('pending', 'closed'),
	})
	status!: 'pending'
}
