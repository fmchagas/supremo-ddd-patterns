import { Sequelize } from "sequelize-typescript"
import ListProductUseCase from "./ListProductUseCase"
import ProductModel from "../../../infra/product/repository/sequelize/ProductModel"
import ProductRepository from "../../../infra/product/repository/sequelize/ProductRepository"
import Product from "../../../domain/product/entity/Product"

describe("Integration test list product use case", () => {

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
    
    it("should list product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new ListProductUseCase(productRepository)

        const product = new Product("321","Produto 321", 99.23)

        productRepository.create(product)

        const result = await usecase.execute()
        
        expect(result.products.length).toBe(1)
        
        expect(result.products[0].id).toBe(product.id)
        expect(result.products[0].name).toBe(product.name)
        expect(result.products[0].price).toBe(product.price)
    })
})