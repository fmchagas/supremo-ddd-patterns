import ValidatorInterface from "../../@shared/validator/ValidatorInterface";
import Product from "../entity/Product";
import ProductYupValidator from "../validator/ProductYupValidator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        //return new ProductValidator()
        return new ProductYupValidator()
    }
}