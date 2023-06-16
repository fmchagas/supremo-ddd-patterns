import ProductFactory from "../../../domain/product/factory/ProductFactory"
import FindProductUseCase from "./FindProductUseCase"

const product = ProductFactory.create("a", "Produto 2", 120.23)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find product use case", () => {
    
    it("should find product", async () => {
        const productRepository = MockRepository()
        const usecase = new FindProductUseCase(productRepository)

        const input = { id: product.id }

        const result = await usecase.execute(input)

        expect(result.id).toBe(input.id)
        expect(result.name).toBe(product.name)
        expect(result.price).toBe(product.price)
    })

    it("should not find a product", async () => {
        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })

        const input = { id: "42" }

        expect(() => {
            return new FindProductUseCase(productRepository).execute(input)
        }).rejects.toThrow("Product not found")
    })
})