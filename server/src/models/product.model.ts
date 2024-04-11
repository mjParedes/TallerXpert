import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasOne, Model, Table, UpdatedAt } from "sequelize-typescript"
import { User } from '../models/user.models'

@Table({
    timestamps: false,
    tableName: 'products', // nombre de la tabla en la base de datos
})

export class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string

    @Column({
        type: DataType.STRING,
        unique: true
    })
    ot_number!: string

    @Column({
        type: DataType.STRING,
    })
    product_name!: string

    @Column({
        type: DataType.STRING,
    })
    product_category!: string

    @Column({
        type: DataType.STRING,
    })
    brand!: string

    @Column({
        type: DataType.STRING,
    })
    model!: string

    @Column({
        type: DataType.STRING,
    })
    serial_number!: string

    @Column({
        type: DataType.STRING,
    })
    detail!: string

    @Column({
        type: DataType.STRING,
    })
    workshop!: string

    @CreatedAt
    @Column
    entry_date!: Date

    @UpdatedAt
    @Column
    exit_date!: Date

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
    })
    register_by!: string

    @BelongsTo(() => User)
    user!: User
}
