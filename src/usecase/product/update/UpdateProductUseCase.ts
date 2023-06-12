import Product from "../../../domain/product/entity/Product";
import ProductRepostoryInterface from "../../../domain/product/repository/ProductRepostoryInterface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./UpdateProductDto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepostoryInterface

    constructor(productRepository: ProductRepostoryInterface){
        this.productRepository = productRepository
    }
    
    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        
        const productToUpdate = new Product(input.id, input.name, input.price)
        
        await this.productRepository.update(productToUpdate)

        return { id: productToUpdate.id }
    }
}