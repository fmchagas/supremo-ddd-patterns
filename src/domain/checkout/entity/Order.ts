import OrderItem from "./OrderItem"


export default class Order{ // é agreado Root
    private _id: string
    private _customerId: string // Relação com agregado de cliente
    private _items: OrderItem[] // Relação com classe OrderItem, pois pertence ao mesmo agregado da ordem(Order agregado root + OrderItem)
    private _total: number

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id
        this._customerId = customerId
        this._items = items
        this._total = this.total()
        this.validate()
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.ordemItemTotal(), 0)
    }

    get getTotal(): number {
        return this._total
    }

    get id(): string {
        return this._id
    }

    get customerId(): string {
        return this._customerId
    }

    get items(): OrderItem[] {
        return this._items
    }

    validate(): boolean {
        if(this._id.length === 0) {
            throw new Error("Id is required")
        }

        if(this._customerId.length === 0) {
            throw new Error("CustomerId is required")
        }

        if(this._items.length === 0) {
            throw new Error("Item quantity must be greater than zero")
        }

        return true
    }
}