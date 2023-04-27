import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infra/customer/repository/sequelize/CustomerModel"
import CustomerRepository from "../../../infra/customer/repository/sequelize/CustomerRepository"
import Customer from "../../../domain/customer/entity/Customer"
import Address from "../../../domain/customer/entity/Address"
import FindCustomerUseCase from "./FindCustomerUseCase"

describe("Integration test find customer use case", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find customer", async () => {
        const customerRepository = new CustomerRepository()
        const usecase = new FindCustomerUseCase(customerRepository)

        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Jataí")
        customer.address = addres

        customerRepository.create(customer)

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

        expect(expectedOutput).toEqual(result)
    })
})