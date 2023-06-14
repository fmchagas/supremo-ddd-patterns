import ProductRepostoryInterface from "../../../domain/product/repository/ProductRepostoryInterface";
import { OutputListProductDto } from "./ListProductDto";

export default class ListProductUseCase {
    private repository: ProductRepostoryInterface

    constructor(repository: ProductRepostoryInterface){
        this.repository = repository
    }

    async execute(): Promise<OutputListProductDto> {

        const products = await this.repository.findAll()

        return {
            products : products.map(product => (
                {
                    id: product.id,
                    name: product.name,
                    price:product.price
                }
            ))
        }
    }

}