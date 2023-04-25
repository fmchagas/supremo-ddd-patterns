import Customer from '../../customer/entity/Customer'
import Order from '../entity/Order'
import OrderItem from '../entity/OrderItem'
import OrderService from './OrderService'


describe("Order service init test", function(){

    it("should get total when have one item and one order", function(){

        const item1 = new OrderItem("order-item-id-1", "produto-1", 2.00, 1)

        const order = new Order("order-id-1", "customer-1", [item1])

        const orders = [order]

        const totalOrders = OrderService.total(orders)

       
        expect(totalOrders).toBe(2.00)
    })

    it("should get total when have many itens and one order", function(){

        const item1 = new OrderItem("order-item-id-1", "produto-1", 2.00, 1)
        const item2 = new OrderItem("order-item-id-2", "produto-2", 3.00, 2)

        const order = new Order("order-id-1", "customer-1", [item1, item2])

        const orders = [order]

        const totalOrders = OrderService.total(orders)

       
        expect(totalOrders).toBe(8.00)
    })

    it("should get total when have many itens and many orders", function(){

        const item1 = new OrderItem("order-item-id-1", "produto-1", 2.00, 1)
        const item2 = new OrderItem("order-item-id-2", "produto-2", 3.00, 2)
        const order = new Order("order-id-1", "customer-1", [item1, item2])

        const item3 = new OrderItem("order-item-id-3", "produto-1", 1.00, 3)
        const order2 = new Order("order-id-2", "customer-1", [item3])

        const orders = [order, order2]

        const totalOrders = OrderService.total(orders)

       
        expect(totalOrders).toBe(11.00)
    })

    it("should place an order", function(){

        const customer = new Customer("id-1", "Fer")
        const item = new OrderItem("order-item-id-1", "produto-1", 5.00, 2)
        
        const order = OrderService.placeOrder(customer, [item])

        expect(customer.rewardPoints).toBe(5)
        expect(order.getTotal).toBe(10.00)
    })


    it("should  throw error when place an order no item", function(){

        expect(()=> {
            const customer = new Customer("id-1", "Fer")
            OrderService.placeOrder(customer, [])
        }).toThrowError("Order must have at least one item")
    })

})