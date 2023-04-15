import Product from "../entity/Product";

export default class ProductService {

    static increasePrice(products: Product[], percenatage: number): void {
        products.forEach(product => {
            product.changePrice((product.price * percenatage) / 100 + product.price)
        })
    }
}