import { Sequelize } from "sequelize-typescript"

import OrderRepository from "./OrderRepository"
import CustomerModel from "../../../customer/repository/sequelize/CustomerModel"
import ProductModel from "../../../product/repository/sequelize/ProductModel"
import OrderModel from "./OrderModel"
import OrderItemModel from "./OrderItemModel"

import CustomerRepository from "../../../customer/repository/sequelize/CustomerRepository"
import Customer from "../../../../domain/customer/entity/Customer"
import Address from "../../../../domain/customer/entity/Address"
import ProductRepository from "../../../product/repository/sequelize/ProductRepository"
import Product from "../../../../domain/product/entity/Product"
import OrderItem from "../../../../domain/checkout/entity/OrderItem"
import Order from "../../../../domain/checkout/entity/Order"


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

    it("should update item in order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres
        customer.activate()
        customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.25)
        productRepository.create(product)

        const orderItem = new OrderItem("1", product.id, product.price, 300)

        const order = new Order("123", customer.id, [orderItem])

        const orderRepository = new OrderRepository(sequelize)
        await orderRepository.create(order)

        const orderItemToUpdate = new OrderItem("1", product.id, product.price, 3)
        const orderToUpdate = new Order("123", customer.id, [orderItemToUpdate])
        await orderRepository.update(orderToUpdate)

        const orderModel = await OrderModel.findOne({
            where: { id: orderToUpdate.id },
            include: ["items"],
        })
        
        expect(orderModel.items.length).toBe(1)

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: 3.75,
            items: [{
                id: orderItemToUpdate.id,
                product_id: product.id,
                order_id: orderToUpdate.id,
                price: orderItemToUpdate.price,
                quantity: orderItemToUpdate.quantity
            }]
        })
    })

    it("should update and add item in order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres
        customer.activate()
        customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.25)
        productRepository.create(product)

        const product2 = new Product("2", "product-2", 2.00)
        productRepository.create(product2)

        const orderItem = new OrderItem("1", product.id, product.price, 20)
        const order = new Order("321", customer.id, [orderItem])

        const orderRepository = new OrderRepository(sequelize)
        await orderRepository.create(order)


        const orderItemToUpdate = new OrderItem("1", product.id, product.price, 1)
        const orderItemToAdd = new OrderItem("2", product2.id, product2.price, 2)
        const orderToUpdate = new Order("321", customer.id, [orderItemToUpdate, orderItemToAdd])
        await orderRepository.update(orderToUpdate)

        const orderModel = await OrderModel.findOne({
            where: { id: orderToUpdate.id },
            include: ["items"],
        })
        
        expect(orderModel.items.length).toBe(2)
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: 5.25,
            items: [{
                id: orderItemToUpdate.id,
                product_id: product.id,
                order_id: orderToUpdate.id,
                price: orderItemToUpdate.price,
                quantity: orderItemToUpdate.quantity
            },
            {
                id: orderItemToAdd.id,
                product_id: product2.id,
                order_id: orderToUpdate.id,
                price: orderItemToAdd.price,
                quantity: orderItemToAdd.quantity
            }]
        })
    })
})