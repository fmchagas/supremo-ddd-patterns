import ValidatorInterface from "../../@shared/validator/ValidatorInterface";
import Customer from "../entity/Customer";
//import CustomerValidator from "../validator/CustomerValidator";
import CustomerYupValidator from "../validator/CustomerYupValidator";

export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<Customer> {
        //return new CustomerValidator()
        return new CustomerYupValidator()
    }
}