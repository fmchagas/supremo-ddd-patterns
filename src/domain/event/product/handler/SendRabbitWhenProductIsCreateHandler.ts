import EventHandlerInterface from "../../@shared/EventHandlerInterface";
import ProductCreatedEvent from "../ProductCreatedEvent";

export default class SendRabbitWhenProductIsCreateHandler
 implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(
            `Publis message: name ${event.eventData.name}`
        )
    }
}