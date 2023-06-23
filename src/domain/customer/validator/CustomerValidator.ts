import ValidatorInterface from "../../@shared/validator/ValidatorInterface";
import Customer from "../entity/Customer";

export default class CustomerValidator
  implements ValidatorInterface<Customer> {
    
    validate(entity: Customer): void {
      
      if(entity.id.length === 0){
        entity.notification.addError({
            context: "customer",
            message: "Id is required"
        })
      }
      
      if(entity.name.length === 0){
        entity.notification.addError({
              context: "customer",
              message: "Name is required"
        })
      }
      
    }
}