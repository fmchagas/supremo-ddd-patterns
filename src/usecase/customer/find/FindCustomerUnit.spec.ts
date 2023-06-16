import Customer from "../../../domain/customer/entity/Customer"
import Address from "../../../domain/customer/entity/Address"
import FindCustomerUseCase from "./FindCustomerUseCase"

const customer = new Customer("11", "Fer")
const addres = new Address("Rua Fantasia", "26", "75804360", "Jataí")
customer.address = addres

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find customer use case", () => {
    
    it("should find customer", async () => {
        const customerRepository = MockRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = { id: "11" }

        const expectedOutput = {
            id: "11",
            name: "Fer",
            active: false,
            rewardPoints: 0,
            address: {
                street: "Rua Fantasia",
                number: "26",
                zip: "75804360",
                city: "Jataí"
            }
        }

        const result = await usecase.execute(input)

        expect(expectedOutput).toStrictEqual(result)
    })


    it("should not find a customer", async () => {
        const customerRepository = MockRepository()
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })

        const input = { id: "111" }

        expect(() => {
            return new FindCustomerUseCase(customerRepository).execute(input)
        }).rejects.toThrow("Customer not found")
    })
})