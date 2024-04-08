import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, IsArray, Model, Table, UpdatedAt } from "sequelize-typescript"
import { User } from "./user.models"
import { string } from "zod"

@Table({
    timestamps: false,
    tableName: 'reparation',
})

export class Reparation extends Model {
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

    @HasMany( () => Product )
    products!: [Product]

	@BelongsTo(() => Client)
    client!: Client

    @Column({
        type: DataType.STRING,
    })
    diagnostic!: string

    @Column({
        type: DataType.DOUBLE,
    })
    amount!: number

    @CreatedAt
    @Column
    entry_date!: Date

    @UpdatedAt
    @Column
    exit_date!: Date

	//@HasOne (() => User)
    @Column({
        type: DataType.STRING,
    })
    register_by!: User
}