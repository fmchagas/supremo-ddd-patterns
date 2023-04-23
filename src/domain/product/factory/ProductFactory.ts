import Product from "../entity/Product";
import ProductInterface from "../entity/ProductInterface";
import { v4 as uuid } from 'uuid'
import ProductWithDoublePrice from "../entity/ProductWithDoublePrice";

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        switch(type){
            case "a":
                return new Product(uuid(), name, price)
            case "b":
                return new ProductWithDoublePrice(uuid(), name, price)
            default:
                throw new Error("Product type not suported")
        }
    }
}