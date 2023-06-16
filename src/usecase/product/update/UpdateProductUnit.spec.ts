import UpdateProductUseCase from "./UpdateProductUseCase"

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update product use case", () => {
    
    it("should update product", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const input = { 
            id: "1",
            name: "Produto 1",
            price: 5.00
        }

        const result = await usecase.execute(input)

        expect(result.id).toBe(input.id)
    })
})