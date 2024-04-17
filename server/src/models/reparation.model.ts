import { AllowNull, BeforeValidate, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, IsArray, IsDate, IsUUID, Model, Table, Unique, UpdatedAt } from "sequelize-typescript"
import { User } from "./user.models"
import { Client } from "./client.model"
import { Product } from "./product.model"

export enum reparationState {
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

    @HasMany(() => Product)
    products!: Product[]

    @AllowNull(false)
    @ForeignKey(() => Client)
    @Column({ type: DataType.STRING })
    client_id!: string

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

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
    })
    diagnostic!: string

    @Column({
        type: DataType.DATE,
        defaultValue: new Date(Date.now())
    })
    entry_date!: Date

    @Column({
        type: DataType.DATE,
    })
    exit_date!: Date

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING })
    assigned_user!: string

    @BelongsTo(() => User)
    user!: User

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

    @BeforeValidate
    static async setCustomId(instance: Reparation) {
        if (!instance.ot_number) {
            instance.ot_number = await generateCustomId();
        }
    }
}

// Define a function to generate the custom ID based on the count of records
async function generateCustomId(): Promise<string> {
    // Count the number of records in the model
    const count = await Reparation.count();

    // Increment the count by 1 to get the next available ID
    const nextId = count + 1;

    // Format the ID with leading zeros
    const formattedId = nextId.toString().padStart(8, '0');

    return formattedId;
}

