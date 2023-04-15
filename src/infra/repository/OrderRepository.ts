import Order from "../../domain/entity/Order";
import OrderItem from "../../domain/entity/OrderItem";
import OrderRepositoryInterface from "../../domain/repository/OrderRepositoryInterface";
import OrderItemModel from "../db/sequelize/model/OrderItemModel";
import OrderModel from "../db/sequelize/model/OrderModel";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order) : Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.getTotal,
                items: entity.items.map((item) => (
                    {
                        id: item.id,
                        product_id: item.productId,
                        price: item.price,
                        quantity: item.quantity
                    }
                ))
            },
            {
                include: [{ model: OrderItemModel }]
            }
        )
    }


    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id: id },
            include: ["items"]
        })

        const orderItems = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.product_id, item.price, item.quantity)
        })

        return new Order(orderModel.id, orderModel.customer_id, orderItems)
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: [OrderItemModel] })

        return orderModels.map((order) => {
            
            const orderItems = order.items.map((item) => {
                return new OrderItem(item.id, item.product_id, item.price, item.quantity)
            }) 
            
            return new Order(order.id, order.customer_id, orderItems)
        })
    }
}