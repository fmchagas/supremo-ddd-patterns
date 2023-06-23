import { Sequelize } from "sequelize-typescript"


import CustomerRepository from "./CustomerRepository"
import CustomerModel from "./CustomerModel"
import Customer from "../../../../domain/customer/entity/Customer"
import Address from "../../../../domain/customer/entity/Address"



describe("Customer repository tests", () => { 
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


    it("should create customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Jataí")
        customer.address = addres

        customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "11" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.getId,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: addres.street,
            number: addres.number,
            zip: addres.zip,
            city: addres.city
        })
    })

    it("should update customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres

        customerRepository.create(customer)

        customer.changeName("Fernando")
        customer.addRewardPoints(2)
        customer.activate()
        const newAddres = new Address("Av. Sonho", "1", "75804000", "Paralelo2")
        customer.changeAddress(newAddres)
        
        customerRepository.update(customer)
        const customerModelUpdated = await CustomerModel.findOne({ where: { id: "11" } })

        expect(customerModelUpdated.toJSON()).toStrictEqual({
            id: customer.getId,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: newAddres.street,
            number: newAddres.number,
            zip: newAddres.zip,
            city: newAddres.city
        })
    })

    it("should find a customer activated", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres
        customer.activate()

        customerRepository.create(customer)

        const expectedCustomer = await customerRepository.find(customer.getId)

        expect(customer).toStrictEqual(expectedCustomer)
        expect(customer.isActive).toBe(true)
    })

    it("should find a customer deactivate", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "26", "75804360", "Paralelo")
        customer.address = addres

        customerRepository.create(customer)

        const expectedCustomer = await customerRepository.find(customer.getId)

        expect(customer).toStrictEqual(expectedCustomer)
        expect(customer.isActive).toBe(false)
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository()
        
        const customer = new Customer("11", "Fer")
        const addres = new Address("Rua Fantasia", "1", "75804000", "Paralelo")
        customer.address = addres
        customer.activate()
        customer.addRewardPoints(0.03)
        customerRepository.create(customer)

        const customer2 = new Customer("12", "Lid")
        const addres2 = new Address("Rua Fantasia", "2", "75804000", "Paralelo")
        customer2.address = addres2
        customerRepository.create(customer2)


        const expectedCustomers = await customerRepository.findAll()

        expect(expectedCustomers).toHaveLength(2)
        expect(expectedCustomers).toContainEqual(customer)
        expect(expectedCustomers).toContainEqual(customer2)
    })

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository()

        expect(async () => {
            await customerRepository.find("1AB")
        }).rejects.toThrow("Customer not found")

    })
})