import { Column, ForeignKey, Model, PrimaryKey, Table, BelongsTo, HasMany } from "sequelize-typescript"
import OrderItemModel from "./OrderItemModel"
import CustomerModel from "../../../customer/repository/sequelize/CustomerModel"

@Table({
    tableName: "orders",
    timestamps: false
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string
    
    @ForeignKey(()=> CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string

    @BelongsTo(()=> CustomerModel)
    declare customer: CustomerModel

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[]
    
    @Column({allowNull: false})
    declare total: number
}