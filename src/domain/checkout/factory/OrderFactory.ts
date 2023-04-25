import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";

interface OrderFactoryProps {
    id: string,
    customerId: string,
    items: {
        id: string,
        name: string,
        productId: string,
        price: number,
        quantity: number
    }[]
}

export default class OrderFactory {
    public static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map(item => {
            return new OrderItem(item.id, item.productId, item.price, item.quantity)
        })

        return new Order(orderProps.id, orderProps.customerId, items)
    }
}