import { Sequelize } from "sequelize-typescript"
import CreateProductUseCase from "../create/CreateProductUseCase"
import UpdateProductUseCase from "./UpdateProductUseCase"
import ProductModel from "../../../infra/product/repository/sequelize/ProductModel"
import ProductRepository from "../../../infra/product/repository/sequelize/ProductRepository"

describe("Integration test update product use case", () => {

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
    
    it("should update product", async () => {
        const productRepository = new ProductRepository()

        const newInput = {
            name: "Produto 1",
            price: 5.00
        }

        const result = await new CreateProductUseCase(productRepository).execute(newInput)

        expect(result.id).toBeDefined()

        const updateInput = {
            id: result.id,
            name: "Produto atualizado 1",
            price: 6.00
        }

        const resultUpdate = await new UpdateProductUseCase(productRepository).execute(updateInput)

        expect(resultUpdate.id).toBe(updateInput.id)

        const productSaved = await productRepository.find(updateInput.id)
        
        expect(productSaved.id).toBe(updateInput.id)
        expect(productSaved.name).toBe(updateInput.name)
        expect(productSaved.price).toBe(updateInput.price)
    })
})