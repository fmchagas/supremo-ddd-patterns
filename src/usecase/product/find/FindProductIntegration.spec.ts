import { Sequelize } from "sequelize-typescript"
import FindProductUseCase from "./FindProductUseCase"
import ProductModel from "../../../infra/product/repository/sequelize/ProductModel"
import ProductRepository from "../../../infra/product/repository/sequelize/ProductRepository"
import Product from "../../../domain/product/entity/Product"

describe("Integration test find product use case", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })
    
    it("should find product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new FindProductUseCase(productRepository)

        const product = new Product("123","Produto 123", 120.23)

        productRepository.create(product)

        const input = { id: product.id }

        const result = await usecase.execute(input)
        
        expect(result.id).toBe(product.id)
        expect(result.name).toBe(product.name)
        expect(result.price).toBe(product.price)
    })
})