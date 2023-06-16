import CustomerRepostoryInterface from "../../../domain/customer/repository/CustomerRepostoryInterface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./FindCustomerDto";

export default class FindCustomerUseCase {
    private repository: CustomerRepostoryInterface

    constructor(repository: CustomerRepostoryInterface) {
        this.repository = repository
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        
        const customer = await this.repository.find(input.id)
        
        return {
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
        }
    }
}