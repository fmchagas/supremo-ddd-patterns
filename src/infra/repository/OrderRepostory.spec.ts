import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/CustomerModel"
import ProductModel from "../db/sequelize/model/ProductModel"
import  OrderItemModel from "../db/sequelize/model/OrderItemModel"
import  OrderModel from "../db/sequelize/model/OrderModel"
import CustomerRepository from "./CustomerRepository"
import Customer from "../../domain/entity/Customer"
import Address from "../../domain/entity/Address"
import ProductRepository from "./ProductRepository"
import Product from "../../domain/entity/Product"
import Order from "../../domain/entity/Order"
import OrderItem from "../../domain/entity/OrderItem"
import OrderRepository from "./OrderRepository"


describe("Order repository tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })


    it("should create order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres
        customer.activate()
        customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.25)
        productRepository.create(product)

        const orderItem = new OrderItem("1", product.id, product.price, 3)

        const order = new Order("123", customer.id, [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        })
        
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: 3.75,
            items: [{
                id: orderItem.id,
                product_id: product.id,
                order_id: order.id,
                price: orderItem.price,
                quantity: orderItem.quantity
            }]
        })
    })



    it("should find an order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres
        customer.activate()
        customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.25)
        productRepository.create(product)

        const orderItem = new OrderItem("1", product.id, product.price, 3)

        const order = new Order("123", customer.id, [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)
        
        const expectedOrder = await orderRepository.find(order.id)
        
        expect(order).toStrictEqual(expectedOrder)
    })
        

    it("should find all order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres
        customer.activate()
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.25)
        await productRepository.create(product)

        const orderItem = new OrderItem("1", product.id, product.price, 3)

        const order = new Order("123", customer.id, [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderItem2 = new OrderItem("2", product.id, product.price, 1)
        const order2 = new Order("321", customer.id, [orderItem2])
        await orderRepository.create(order2)

        const expectedOrders = await orderRepository.findAll()

        expect(expectedOrders).toHaveLength(2)
        expect(expectedOrders).toContainEqual(order)
        expect(expectedOrders).toContainEqual(order2)
    })
})