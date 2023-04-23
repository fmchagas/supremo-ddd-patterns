import ProductFactory from "./ProductFactory"

describe("Product factory unit tests", function() {

    it("should create a product type a", function(){
        const product = ProductFactory.create("a", "Product A", 1)
    
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product A")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })

    it("should create a product type b(double price)", function(){
        const productB = ProductFactory.create("b", "Product B(double price)", 1)
        
        expect(productB.id).toBeDefined()
        expect(productB.name).toBe("Product B(double price)")
        expect(productB.price).toBe(2)
        expect(productB.constructor.name).toBe("ProductWithDoublePrice")
    })

    it("should throw an error when product type is not supported", function(){
        const productB = ProductFactory.create("b", "Product B(double price)", 1)
        
        expect(function(){
            ProductFactory.create("c", "Product C", 1)
        }).toThrowError("Product type not suported")
    })
})