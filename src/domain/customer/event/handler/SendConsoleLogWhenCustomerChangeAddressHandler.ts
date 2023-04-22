import EventHandlerInterface from "../../../@shared/event/EventHandlerInterface";
import CustomerChangeAddressEvent from "../CustomerChangeAddressEvent";

export default class SendConsoleLogWhenCustomerChangeAddressHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent> {
    handle(event: CustomerChangeAddressEvent): void {
        console.log(
            `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.zip}, ${event.eventData.address.city}`
        )
    }
}