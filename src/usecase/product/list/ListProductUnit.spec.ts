import ProductFactory from "../../../domain/product/factory/ProductFactory"
import ListProductUseCase from "./ListProductUseCase"

const product1 = ProductFactory.create("a", "Produto 1", 120.23)
const product2 = ProductFactory.create("a", "Produto 2", 230.23)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test list product use case", () => {
    
    it("should list product", async () => {
        const productRepository = MockRepository()
        const usecase = new ListProductUseCase(productRepository)

        const result = await usecase.execute()

        expect(result.products.length).toBe(2)
        
        expect(result.products[0].id).toBe(product1.id)
        expect(result.products[0].name).toBe(product1.name)
        expect(result.products[0].price).toBe(product1.price)

        expect(result.products[1].id).toBe(product2.id)
        expect(result.products[1].name).toBe(product2.name)
        expect(result.products[1].price).toBe(product2.price)
    })

    it("should retur empty list when not a product", async () => {
        const productRepository = MockRepository()
        productRepository.findAll.mockReturnValue(Promise.resolve([]))

        const result = await new ListProductUseCase(productRepository).execute()

        expect(result.products.length).toBe(0)
    })
})