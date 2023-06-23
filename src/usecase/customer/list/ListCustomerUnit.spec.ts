import Address from "../../../domain/customer/entity/Address"
import ListCustomerUseCase from "./ListCustomerUseCase"
import CustomerFactory from "../../../domain/customer/factory/CustomerFactory"

const customer = CustomerFactory.createWithAddress(
    "Fer",
    new Address("Rua Fantasia", "26", "75804360", "Jataí")
)

const customer2 = CustomerFactory.createWithAddressAndActive(
    "Lidy",
    new Address("Rua A", "79", "75801130", "City")
)
customer2.addRewardPoints(10)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list customers use case", () => {
    
    it("should list customers", async () => {
        const customerRepository = MockRepository()
        const usecase = new ListCustomerUseCase(customerRepository)

        
        const output = await usecase.execute()

        expect(output.customers.length).toBe(2)
        
        expect(output.customers[0].id).toBe(customer.getId)
        expect(output.customers[0].name).toBe(customer.name)
        expect(output.customers[0].active).toBe(customer.isActive)
        expect(output.customers[0].rewardPoints).toBe(customer.rewardPoints)
        expect(output.customers[0].address.street).toEqual(customer.address.street)
        expect(output.customers[0].address.number).toEqual(customer.address.number)
        expect(output.customers[0].address.zip).toEqual(customer.address.zip)
        expect(output.customers[0].address.city).toEqual(customer.address.city)

        expect(output.customers[1].id).toBe(customer2.getId)
        expect(output.customers[1].name).toBe(customer2.name)
        expect(output.customers[1].active).toBe(customer2.isActive)
        expect(output.customers[1].rewardPoints).toBe(customer2.rewardPoints)
        expect(output.customers[1].address.street).toEqual(customer2.address.street)
        expect(output.customers[1].address.number).toEqual(customer2.address.number)
        expect(output.customers[1].address.zip).toEqual(customer2.address.zip)
        expect(output.customers[1].address.city).toEqual(customer2.address.city)
    })


    it("should retur empty list when not a customer", async () => {
        const customerRepository = MockRepository()
        customerRepository.findAll.mockReturnValue(Promise.resolve([]))

        const output = await new ListCustomerUseCase(customerRepository).execute()

        expect(output.customers.length).toBe(0)
    })
})