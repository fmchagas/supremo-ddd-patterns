import EventHandlerInterface from "../../../@shared/event/EventHandlerInterface";
import ProductCreatedEvent from "../ProductCreatedEvent";

export default class SendRabbitWhenProductIsCreateHandler
 implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(
            `Publis message: ${event.eventData.name}, ${event.eventData.description}, ${event.eventData.price}`
        )
    }
}