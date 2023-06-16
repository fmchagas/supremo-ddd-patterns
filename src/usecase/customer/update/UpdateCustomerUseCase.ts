import Address from "../../../domain/customer/entity/Address"
import Customer from "../../../domain/customer/entity/Customer"
import CustomerRepostoryInterface from "../../../domain/customer/repository/CustomerRepostoryInterface"
import { InputUpdateCutomerDto } from "./UpdateCustomerDto"


export default class UpdateCustomerUseCase {
    private repository: CustomerRepostoryInterface

    constructor(repository: CustomerRepostoryInterface) {
        this.repository = repository
    }

    async execute(input: InputUpdateCutomerDto): Promise<void> {
        const customerToUpdate: Customer = await this.repository.find(input.id)
        const addrres = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
        customerToUpdate.changeAddress(addrres)
        customerToUpdate.changeName(input.name)

        if(input.active){
            customerToUpdate.activate()
        }else{
            customerToUpdate.deactivate()
        }
        
        await this.repository.update(customerToUpdate)
    }
}