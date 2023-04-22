import Product from '../entity/Product'
import ProductService from './ProductService'

describe("Product service unit tests", function() {

    it("should change the prices of all products", function(){

        const product1 = new Product("product-id-1", "product-name", 1)
        const product2 = new Product("product-id-1", "product-name", 2)
        const products = [product1, product2]

        // Tudo bem funciona, mas se eu tiver 1 milão de item não é saldavel fazer na aplicação. O melhor é rodar uma rotina na base de dados
        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(2)
        expect(product2.price).toBe(4)

    })

})