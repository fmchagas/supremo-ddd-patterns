import Entity from "../../@shared/entity/EntityAbstract";
import NotificationError from "../../@shared/notification/NotificationError";
import ProductValidatorFactory from "../factory/ProductValidatorFactory";
import ProductInterface from "./ProductInterface"

export default class Product extends Entity implements ProductInterface{ // é um agreado exite sozinho
    private _name: string
    private _price: number
  
    constructor(id: string, name: string, price: number) {
      super()
      this._id = id
      this._name = name
      this._price = price
      this.validate()
    }
    
    get name(): string {
      return this._name
    }
  
    get price(): number {
      return this._price
    }
  
    changeName(name: string): void {
      this._name = name
      this.validate()
    }
  
    changePrice(price: number): void {
      this._price = price
      this.validate()
    }
  
    validate(): boolean {
      ProductValidatorFactory.create().validate(this)

      if(this.notification.hasErrors()){
        throw new NotificationError(this.notification.errors())
      }

      return true
    }
  }