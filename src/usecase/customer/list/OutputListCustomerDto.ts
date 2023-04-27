

type Customer = {
    id: string
    name: string
    active: boolean,
    rewardPoints: number,
    address: {
        street: string
        number: string
        zip: string
        city: string
    }
}

export interface OutputListCustomerDto {
    customers: Customer[]
}