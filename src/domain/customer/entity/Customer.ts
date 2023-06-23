import Entity from "../../@shared/entity/EntityAbstract";
import NotificationError from "../../@shared/notification/NotificationError";
import CustomerValidatorFactory from "../factory/CustomerValidatorFactory";
import Address from "./Address";

export default class Customer extends Entity{ // é agreado existe sozinho
   private _name: string;
   private _address!: Address // Relação com VO
   private _active: boolean = false
   private _rewardPoints: number = 0

    constructor(id: string, name:string) {
        super()
        this._id = id
        this._name = name
        this.validate()
    }

    get getId(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    get isActive(): boolean {
        return this._active
    }

    get address(): Address {
        return this._address
    }

    set address(address: Address) {
        this._address = address
    }

    changeAddress(address: Address) {
        this._address = address
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points
    }

    activate() {
        if(this._address === undefined){
            this.notification.addError({
                context: "customer",
                message: "Address is mandatory to activate a customer"
            })
            
            throw new NotificationError(this.notification.errors())
        }
        
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    changeName(name: string): void {
        this._name = name
        this.validate()
    }
    
    validate() {
        CustomerValidatorFactory.create().validate(this)

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors())
        }
    }
}