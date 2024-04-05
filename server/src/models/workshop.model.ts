import { Column, DataType, Model, Table } from 'sequelize-typescript'

export enum workshopCategory{
    Electronica= 'electronica',
    Mecanica= 'mecanica',
    Varios= 'varios'
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
    })
    id!: string

    @Column({
        type: DataType.STRING,
    })
    owner!: string

    @Column({
        type: DataType.STRING,
    })
    title!: string

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

    @Column({
        type: DataType.ENUM(...Object.values(workshopCategory)),
    })
    category!: workshopCategory

}
