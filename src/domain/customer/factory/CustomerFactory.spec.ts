import Address from "../entity/Address"
import CustomerFactory from "./CustomerFactory"

describe("Product factory unit tests", function() {

    it("should create a customer", function() {
        const customer = CustomerFactory.create("Tanjiro")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Tanjiro")
        expect(customer.address).toBeUndefined()
        expect(customer.isActive).toBe(false)
    })

    it("should create a customer with an address", function() {
        const address = new Address("Street", "n123", "75801360", "Jataí")
        const customer = CustomerFactory.createWithAddress("Tanjiro", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Tanjiro")
        expect(customer.address).toBe(address)
        expect(customer.isActive).toBe(false)
    })

    it("should create a customer with an address and active", function() {
        const address = new Address("Street", "n123", "75801360", "Jataí")
        const customer = CustomerFactory.createWithAddressAndActive("Tanjiro", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("Tanjiro")
        expect(customer.address).toBe(address)
        expect(customer.isActive).toBe(true)
    })

})