import EventHandlerInterface from "../../@shared/EventHandlerInterface";
import ProductCreatedEvent from "../ProductCreatedEvent";

export default class SendEmailWhenProductIsCreateHandler
 implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(
            `Send email to ...`
        )
    }
}