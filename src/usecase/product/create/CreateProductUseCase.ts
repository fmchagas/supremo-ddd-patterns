import Product from "../../../domain/product/entity/Product";
import ProductRepostoryInterface from "../../../domain/product/repository/ProductRepostoryInterface";
import { InputCreateProductDto, OutputCreateProductDto } from "./CreateProductDto";
import {v4 as uuid } from "uuid"

export default class CreateProductUseCase {
    private productRepository: ProductRepostoryInterface

    constructor(productRepository: ProductRepostoryInterface){
        this.productRepository = productRepository
    }
    
    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        
        const newProduct = new Product(uuid(), input.name, input.price)
        
        await this.productRepository.create(newProduct)

        return { id: newProduct.id }
    }
}