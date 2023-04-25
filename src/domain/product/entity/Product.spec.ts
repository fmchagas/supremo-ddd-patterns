import Product from "./Product"

describe("Product unit tests", () => {
    
    it("should throw error when id is empty", () => {       
        expect(() => {
            new Product("", "product-name", 1)
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {       
        expect(() => {
            new Product("product-id-1", "", 1)
        }).toThrowError("Name is required")
    })

    it("should throw error when price is negative", () => {       
        expect(() => {
            new Product("product-id-1", "product-name", -1)
        }).toThrowError("Price must be greater than zero")
    })

    it("should change name", () => {    
        const product = new Product("product-id-1", "product-name", 1)
        product.changeName("new-name")

        expect(product.name).toBe("new-name")
    })

    it("should change price greater than zero", () => {    
        const product = new Product("product-id-1", "product-name", 0)
        const product2 = new Product("product-id-2", "product-name2", 0)
        product.changePrice(1.00)
        product2.changePrice(2.00)

        expect(product.id).toBe("product-id-1")
        expect(product.price).toBe(1.00)

        expect(product2.id).toBe("product-id-2")
        expect(product2.price).toBe(2.00)
    })

    it("should change price to zero", () => {    
        const product = new Product("product-id-1", "product-name", 1.00)
        product.changePrice(0.00)

        expect(product.price).toBe(0.00)
    })
})