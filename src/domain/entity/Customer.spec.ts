import Address from "./Address"
import Customer from "./Customer"

describe("Customer unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() =>{
            new Customer("", "Fer")
            
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() =>{
            new Customer("id1", "")

        }).toThrowError("Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("id1", "Fer")

        customer.changeName("Fernando")

        expect(customer.name).toBe("Fernando")
    })

    it("should activate customer", () => {
        const customer = new Customer("id1", "Fer")
        const address = new Address("Street", "n123", "75801360", "Jataí")
        customer.address = address
        
        customer.activate()
        
        expect(customer.isActive).toBe(true)
    })

    it("should deactivate customer", () => {
        const customer = new Customer("id1", "Fer")
        
        customer.deactivate()
        
        expect(customer.isActive).toBe(false)
    })

    it("should throw error when activate customer and address is undefined", () => {
        expect(() => {
            const customer = new Customer("id1", "Fer")
            customer.activate()

        }).toThrowError("Address is mandatory to activate a customer")
    })

    it("should add reward points", () => {
        const customer = new Customer("id1", "Fer")
        
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(0.01)
        expect(customer.rewardPoints).toBe(0.01)

        customer.addRewardPoints(0.02)
        expect(customer.rewardPoints).toBe(0.03)
    })

    it("should create customer with address", () => {
        const customer = new Customer("1", "Fer")
        const address = new Address("Street", "n123", "75801360", "Jataí")
        customer.address = address

        expect(customer.id).toBe("1")
        expect(customer.name).toBe("Fer")

        expect(customer.address).toMatchObject(address)
    })
})