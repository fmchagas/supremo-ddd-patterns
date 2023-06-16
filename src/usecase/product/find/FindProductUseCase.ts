import ProductRepostoryInterface from "../../../domain/product/repository/ProductRepostoryInterface";
import { InputFindProductDto, OutputFindProductDto } from "./FindProductDto";


export default class FindProductUseCase {
    private repository: ProductRepostoryInterface

    constructor(repository: ProductRepostoryInterface) {
        this.repository = repository
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.repository.find(input.id)

        return {
            id: product.id,
            name: product.name,
            price:product.price
        }
    }
}