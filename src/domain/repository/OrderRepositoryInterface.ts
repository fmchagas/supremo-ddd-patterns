import Order from "../entity/Order";

export default interface OrderRepositoryInterface {
    create(entity: Order): Promise<void>
    find(id: string): Promise<Order>
    findAll(): Promise<Order[]>
}