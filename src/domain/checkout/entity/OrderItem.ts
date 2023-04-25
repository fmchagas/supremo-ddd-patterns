export default class OrderItem{ // Pertence ao agregado Order
    private _id: string
    private _productId: string // Relação com agregado de produto
    private _price: number
    private _quantity: number

    constructor(id: string, productId: string, price: number, quantity: number){
        this._id = id
        this._productId = productId
        this._price = price
        this._quantity = quantity
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get productId(): string {
        return this._productId
    }

    get price(): number {
        return this._price
    }

    get quantity(): number {
        return this._quantity
    }

    ordemItemTotal(): number {
        return this._price * this._quantity
    }

    validate() {
        if(this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero")
        }

        if(this._price <= 0) {
            throw new Error("Price must be greater than zero")
        }
    }
}