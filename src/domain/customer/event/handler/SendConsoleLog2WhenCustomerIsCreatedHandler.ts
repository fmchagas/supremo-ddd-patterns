import EventHandlerInterface from "../../../@shared/event/EventHandlerInterface";
import CustomerCreatedEvent from "../CustomerCreatedEvent";

export default class SendConsoleLog2WhenCustomerIsCreatedHandler 
  implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        const eventName = event.constructor.name
        console.log(
            `Esse é o segundo console.log do evento: ${eventName}`
        )
    }
}