import EventHandlerInterface from "../../../@shared/event/EventHandlerInterface";
import CustomerCreatedEvent from "../CustomerCreatedEvent";

export default class SendConsoleLog1WhenCustomerIsCreatedHandler 
  implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        const eventName = event.constructor.name
        console.log(
            `Esse é o primeiro console.log do evento: ${eventName}`
        )
    }
  }