import Address from "../../../domain/customer/entity/Address"
import CustomerFactory from "../../../domain/customer/factory/CustomerFactory"
import CustomerRepostoryInterface from "../../../domain/customer/repository/CustomerRepostoryInterface"
import { InputCreateCustomerDto } from "./CreateCustomerDto"


export default class CreateCustomerUseCase {
    private repository: CustomerRepostoryInterface

    constructor(repository: CustomerRepostoryInterface) {
        this.repository = repository
    }

    async execute(input: InputCreateCustomerDto): Promise<void> {
        const addrres = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        const customer = CustomerFactory.createWithAddress(input.name, addrres)

        if(input.active){
            customer.activate()
        }
        
        await this.repository.create(customer)
    }
}