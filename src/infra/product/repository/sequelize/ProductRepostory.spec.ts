import { Sequelize } from "sequelize-typescript"
import ProductRepository from "./ProductRepository"
import ProductModel from "./ProductModel"
import Product from "../../../../domain/product/entity/Product"


describe("Product repository tests", () => {

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
        const product = new Product("1", "product-1", 1.00)

        productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })

    it("should update product", async () => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.00)

        productRepository.create(product)

        product.changeName("product-22")
        product.changePrice(2.00)
        
        productRepository.update(product)

        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    })


    it("should find a product", async () => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.00)

        productRepository.create(product)
        const productModel = await ProductModel.findOne({ where: { id: "1" } })

        const foundProduct = await productRepository.find("1")

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    })

    it("should find all product", async () => {
        const productRepository = new ProductRepository()
        const product = new Product("1", "product-1", 1.00)
        const product2 = new Product("2", "product-2", 2.00)

        productRepository.create(product)
        productRepository.create(product2)

        const foundProducts = await productRepository.findAll()
        const products = [product, product2]

        expect(products).toEqual(foundProducts)
    })

})