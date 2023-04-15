import OrderItem from "./OrderItem"

describe("Order item unit tests", function(){
    it("should calculate total when the quantity is one", function(){
        const orderItem = new OrderItem("order-item-id-1", "produto 1", 0.03, 1)

        expect(orderItem.quantity).toBe(1)
        expect(orderItem.price).toBe(0.03)
        expect(orderItem.ordemItemTotal()).toBe(0.03)
    })

    it("should calculate total when the quantity is greater then one", function(){
        const orderItem = new OrderItem("order-item-id-1", "produto 1", 0.50, 2)

        expect(orderItem.quantity).toBe(2)
        expect(orderItem.ordemItemTotal()).toBe(1.00)
    })


    it("should throw erro when quntity is zero", function(){

        expect(function(){

            new OrderItem("order-item-id-1", "produto 1", 0.1, 0)

        }).toThrowError("Quantity must be greater than zero")
    })

    it("should throw erro when price is zero", function(){

        expect(function(){

            new OrderItem("order-item-id-1", "produto 1", 0.0, 1)

        }).toThrowError("Price must be greater than zero")
    })
})