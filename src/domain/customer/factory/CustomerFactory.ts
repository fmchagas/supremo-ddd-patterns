import Address from "../entity/Address";
import Customer from "../entity/Customer";
import { v4 as uuid } from 'uuid'

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer(uuid(), name)
    }

    public static createWithAddress(name: string, address: Address): Customer {
        const customer = new Customer(uuid(), name)
        customer.changeAddress(address)
        return customer
    }

    public static createWithAddressAndActive(name: string, address: Address): Customer {
        const customer = new Customer(uuid(), name)
        customer.changeAddress(address)
        customer.activate()
        return customer
    }
}