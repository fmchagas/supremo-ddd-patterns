import Customer from "../../../domain/customer/entity/Customer";
import CustomerRepostoryInterface from "../../../domain/customer/repository/CustomerRepostoryInterface";
import { OutputListCustomerDto } from "./OutputListCustomerDto";



export default class ListCustomerUseCase {
    private repository: CustomerRepostoryInterface

    constructor(repository: CustomerRepostoryInterface) {
        this.repository = repository
    }

    async execute(): Promise<OutputListCustomerDto> {
        
        const customers = await this.repository.findAll()
        
        /*return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                active: customer.isActive,
                rewardPoints: customer.rewardPoints,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city
                }
            }))
        }*/

        return OutputMapper.toOutput(customers)
    }
}


class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                active: customer.isActive,
                rewardPoints: customer.rewardPoints,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city
                }
            }))
        }
    }
}