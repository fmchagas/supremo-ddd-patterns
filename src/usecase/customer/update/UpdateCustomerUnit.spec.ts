import Customer from "../../../domain/customer/entity/Customer"
import Address from "../../../domain/customer/entity/Address"
import UpdateCustomerUseCase from "./UpdateCustomerUseCase"

const customer = new Customer("2", "Fernando")
const addres = new Address("Rua Fantasia", "79", "75801360", "Jataí")
customer.address = addres

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update customer use case", () => {
    
    it("should update customer and active", async () => {
        const customerRepository = MockRepository()
        const usecase = new UpdateCustomerUseCase(customerRepository)

        const input = {
            id: customer.getId,
            name: "Fer",
            active: true,
            address: {
                street: "Rua Fantasia",
                number: "79",
                zip: "75801360",
                city: "Jataí"
            }
        }
        
        await expect(usecase.execute(input)).resolves.not.toThrow()
    })

    it("should update customer and deactive", async () => {
        const customerRepository = MockRepository()
        const usecase = new UpdateCustomerUseCase(customerRepository)

        const input = {
            id: customer.getId,
            name: "Fer",
            active: false,
            address: {
                street: "Rua Fantasia",
                number: "79",
                zip: "75801360",
                city: "Jataí"
            }
        }
        
        await expect(usecase.execute(input)).resolves.not.toThrow()
    })
})