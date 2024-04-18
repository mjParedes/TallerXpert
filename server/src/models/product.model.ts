import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasOne, Model, Table, UpdatedAt } from "sequelize-typescript"
import { User } from '../models/user.models'
import { Client } from "./client.model"
import { Reparation } from "./reparation.model"

export enum productState {
    PENDING = 'Pendiente',
    IN_PROGRESS = 'En Progreso',
    REPAIRED = 'Reparado',
    DONE = 'Finalizado',
    PAID = 'Pagado'
}

@Table({
    timestamps: true,
    tableName: 'product', // nombre de la tabla en la base de datos
})
export class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
    })
    product_name!: string;

    @Column({
        type: DataType.STRING,
    })
    product_category!: string;

    @Column({
        type: DataType.STRING,
    })
    brand!: string;

    @Column({
        type: DataType.STRING,
    })
    model!: string;

    @Column({
        type: DataType.STRING,
    })
    serial_number!: string;

    @Column({
        type: DataType.STRING,
    })
    detail!: string;

    @Column({
        type: DataType.STRING,
    })
    workshop!: string;

    @Column({
        type: DataType.STRING,
    })
    issue_detail!: string;

    @Column({
        type: DataType.STRING,
    })
    note!: string;

    @Column({
        type: DataType.STRING,
    })
    diagnostic!: string;

    @Column({
        type: DataType.ENUM(...Object.values(productState)),
    })
    state!: productState;

    @Column({
        type: DataType.BOOLEAN,
    })
    is_paid!: boolean;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    total_cost!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    revision_cost!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    reparation_cost!: number;

    @Column({
        type: DataType.DATE,
    })
    warranty_date!: Date;

    @Column({
        type: DataType.STRING,
    })
    warranty_invoice_number!: string;

    @CreatedAt
    @Column
    entry_date!: Date;

    @UpdatedAt
    @Column
    exit_date!: Date;

    /*@ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
    })
    register_by!: string;

    @BelongsTo(() => User)
    user!: User;*/

    @ForeignKey(() => Client)
    client_id!: Client

    @BelongsTo(() => Client)
    client!: Client

    @ForeignKey(() => Reparation)
    reparation_id!: string

    @BelongsTo( ()=> Reparation)
    reparation!: Reparation
}
