export interface InputCreateCustomerDto {
    name: string
    active: boolean,
    address: {
        street: string
        number: string
        zip: string
        city: string
    }
}