import Customer from "../../../domain/customer/entity/Customer"
import Address from "../../../domain/customer/entity/Address"
import CreateCustomerUseCase from "./CreateCustomerUseCase"

const customer = new Customer("11", "Fer")
const addres = new Address("Rua Fantasia", "26", "75804360", "Jataí")
customer.address = addres

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {
    
    it("should create customer", async () => {
        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        const input = {
            name: "Fer",
            active: true,
            address: {
                street: "Rua Fantasia",
                number: "26",
                zip: "75804360",
                city: "Jataí"
            }
        }
        
        await expect(usecase.execute(input)).resolves.not.toThrow()
    })


    it("should throw error when name is missing", async () => {
        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        const name = ""

        const input = {
            name: name,
            active: true,
            address: {
                street: "Rua Fantasia",
                number: "26",
                zip: "75804360",
                city: "Jataí"
            }
        }

        expect(usecase.execute(input)).rejects.toThrowError("customer: Name is required")
    })

})