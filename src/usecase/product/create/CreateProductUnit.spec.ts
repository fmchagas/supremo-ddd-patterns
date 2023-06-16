import CreateProductUseCase from "./CreateProductUseCase"

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product use case", () => {
    
    it("should create product", async () => {
        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = { 
            name: "Produto 1",
            price: 12.00
        }

        const result = await usecase.execute(input)

        expect(result.id).toBeDefined()
    })
})