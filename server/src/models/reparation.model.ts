import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, IsArray, IsDate, Model, Table, Unique, UpdatedAt } from "sequelize-typescript"
import { User } from "./user.models"
import { Client } from "./client.model"
import { Product } from "./product.model"

export enum reparationState{
    PENDING = 'Pendiente',
    IN_PROGRESS = 'En Progreso',
    REPAIRED = 'Reparado',
    DONE = 'Finalizado'
}

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

    @Unique(true)
    @Column({
        type: DataType.STRING
    })
    ot_number!: string

    @HasMany( () => Product )
    products!: [Product]

	@BelongsTo(() => Client)
    client!: Client

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    issue_detail!: string

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    note!: string

    @ForeignKey(() => Client)
    @Column({
        field:'clientId',
        type:DataType.UUID
    })
    clientId!:string

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
    })
    diagnostic!: string

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
    assigned_user!: User

    @Column({
        type: DataType.STRING,
        defaultValue: reparationState.PENDING
    })
    state!: reparationState

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_paid!: boolean

    @AllowNull(true)
    @Column({
        type: DataType.DOUBLE,
        defaultValue: 0.0
    })
    total_cost!: number

    @AllowNull(true)
    @Column({
        type: DataType.DOUBLE,
        defaultValue: 0.0
    })
    revision_cost!: number

    @AllowNull(true)
    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
        defaultValue: 0.0
    })
    reparation_cost!: number

    @IsDate
    @AllowNull(true)
    @Column({
        type: DataType.DATEONLY
    })
    warranty_date!: Date

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    warranty_invoice_number!: string
}