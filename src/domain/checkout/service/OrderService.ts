import Customer from "../../customer/entity/Customer"
import Order from "../entity/Order"
import OrderItem from "../entity/OrderItem"
import {v4 as uuid} from 'uuid'

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.getTotal, 0)
    }


    static placeOrder(customer: Customer, items : OrderItem[]): Order {

        if(items.length === 0) {
            throw new Error("Order must have at least one item")
        }

        const order = new Order(uuid(), customer.getId, items)

        let rewardPoints = order.getTotal / 2

        customer.addRewardPoints(rewardPoints)

        return order
    }
}