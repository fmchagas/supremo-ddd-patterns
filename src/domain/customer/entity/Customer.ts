import Address from "./Address";

export default class Customer{ // é agreado existe sozinho
   private _id: string
   private _name: string;
   private _address!: Address // Relação com VO
   private _active: boolean = false
   private _rewardPoints: number = 0

    constructor(id: string, name:string) {
        this._id = id
        this._name = name
        this.validate()
    }

    get id(): string {
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
            throw new Error("Address is mandatory to activate a customer")
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
        if(this._id.length === 0){
            throw new Error("Id is required")
        }
        if(this._name.length === 0){
            throw new Error("Name is required")
        }
    }
}