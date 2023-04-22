import Order from "./Order"
import OrderItem from "./OrderItem"

describe("Order unit tests", () => {
    
    it("should calculate total when one item", () => {
        
        const produto1Preto = new OrderItem("order-item-1", "produto 1, Preto", 1500.00, 1)
        const order = new Order("order-1", "customer-1", [produto1Preto])
        
        expect(order.getTotal).toBe(1500.00)
    })

    it("should calculate total when two item", () => {
        
        const produto1Preto = new OrderItem("order-item-1", "produto 1, Preto", 100.00, 1)
        const produto1Branco = new OrderItem("order-item-1", "produto 1, Branco", 50.00, 2)
        const order = new Order("order-1", "customer-1", [produto1Branco, produto1Preto])
        
        expect(order.getTotal).toBe(200.00)
    })

    it("should calculate total when two item with cents", () => {
        
        const produto1Preto = new OrderItem("order-item-1", "produto 1, Preto", 0.01, 1)
        const produto1Branco = new OrderItem("order-item-1", "produto 1, Branco", 0.02, 1)
        const order = new Order("order-1", "customer-1", [produto1Branco, produto1Preto])
        
        expect(order.getTotal).toBe(0.03)
    })

    it("should thow error when quantity is zero", () => {
        
        expect(() => {
            const produtQtdZero = new OrderItem("order-item-id-1", "produto 1", 1.00, 0)
            new Order("order-id-1", "customer-1", [produtQtdZero])

        }).toThrowError("Quantity must be greater than zero")
    })

    it("should thow error when quantity is negative", () => {

        expect(() => {
            const produtQtdNegative = new OrderItem("order-item-id-1", "produto 1", 1.00, -1)
            new Order("order-id-1", "customer-1", [produtQtdNegative])

        }).toThrowError("Quantity must be greater than zero")
    })

    it("should thow error when id is emprty", () => {
        expect(()=>{
           new Order("", "c-id-1", [])

        }).toThrowError("Id is required")
    })

    it("should thow error when customerId is emprty", () => {
        expect(()=>{
            new Order("order-id-1", "", [])

        }).toThrowError("CustomerId is required")
    })

    it("should thow error when item is emprty", () => {
        expect(()=>{
            new Order("order-id-1", "c-id-1", [])
            
        }).toThrowError("Item quantity must be greater than zero")
    })
})