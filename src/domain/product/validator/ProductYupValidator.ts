import * as yup from "yup"
import Product from "../entity/Product";
import ValidatorInterface from "../../@shared/validator/ValidatorInterface";

export default class ProductYupValidator
  implements ValidatorInterface<Product> {
    
    validate(entity: Product): void {
        try {
          yup
            .object()
            .shape({
              id: yup.string().required("Id is required"),
              name: yup.string().required("Name is required"),
              price: yup.number()
                .positive("Price must be greater than zero")
                .min(0, "Price must be greater than zero or equals 0")
            })
            .validateSync(
              {
                id: entity.id,
                name: entity.name,
                price: entity.price
              },
              {
                abortEarly: false
              }
            )

        } catch(errors){
          const e = errors as yup.ValidationError
          e.errors.forEach(_message => {
            entity.notification.addError({
              context: "product",
              message: _message
            })
          });
        }
    }
}