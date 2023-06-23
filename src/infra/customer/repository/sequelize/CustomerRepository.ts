import Address from "../../../../domain/customer/entity/Address";
import Customer from "../../../../domain/customer/entity/Customer";
import CustomerRepostoryInterface from "../../../../domain/customer/repository/CustomerRepostoryInterface";
import CustomerModel from "./CustomerModel";

export default class CustomerRepository implements CustomerRepostoryInterface{
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.getId,
            name: entity.name,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                active: entity.isActive,
                rewardPoints: entity.rewardPoints,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city
            },
            {
                where: { id: entity.getId }
            }
        )
    }

    async find(id: string): Promise<Customer> {
        let customerModel

        try {
            customerModel = customerModel = await CustomerModel.findOne({
                 where: { id },
                 rejectOnEmpty: true
            })
        } catch (error) {
            throw new Error("Customer not found")
        }
        
        const customer = new Customer(customerModel.id, customerModel.name)
        customer.address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city
        )

        customer.addRewardPoints(customerModel.rewardPoints)

        if(customerModel.active){
            customer.activate()
        }

        return customer
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll()

        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name)
            customer.address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zip,
                customerModel.city
            )
    
            customer.addRewardPoints(customerModel.rewardPoints)
    
            if(customerModel.active){
                customer.activate()
            }

            return customer
        })
    }
}