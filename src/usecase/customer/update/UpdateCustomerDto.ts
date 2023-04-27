export interface InputUpdateCutomerDto {
    id: string
    name: string
    active: boolean,
    address: {
        street: string
        number: string
        zip: string
        city: string
    }
}