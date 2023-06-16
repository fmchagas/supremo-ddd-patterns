import { Sequelize } from "sequelize-typescript"
import CreateProductUseCase from "./CreateProductUseCase"
import ProductModel from "../../../infra/product/repository/sequelize/ProductModel"
import ProductRepository from "../../../infra/product/repository/sequelize/ProductRepository"

describe("Integration test create product use case", () => {

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
    
    it("should create product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = { 
            name: "Produto 1",
            price: 12.00
        }

        const result = await usecase.execute(input)

        expect(result.id).toBeDefined()

        const productSaved = await productRepository.find(result.id)
        
        expect(productSaved.id).toBe(result.id)
        expect(productSaved.name).toBe(input.name)
        expect(productSaved.price).toBe(input.price)
    })
})