import EventDispatcher from "../@shared/EventDispatcher"
import CustomerChangeAddressEvent from "./CustomerChangeAddressEvent"
import SendConsoleLogWhenCustomerChangeAddressHandler from "./handler/SendConsoleLogWhenCustomerChangeAddressHandler"

describe("Domain events customer change address tests", function() {

    it("should notify all event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandlerCustomerChangeAddress = new SendConsoleLogWhenCustomerChangeAddressHandler()
        const spyEventHandler = jest.spyOn(eventHandlerCustomerChangeAddress, "handle")
        

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerCustomerChangeAddress)

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandlerCustomerChangeAddress)

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: "customer-id-1",
            name: "Tanjiro Kamado",
            address : {
                street: "E. Victoria St",
                number: "37",
                zip: "93101",
                city: "Santa Barbara"
            }
        })

        eventDispatcher.notify(customerChangeAddressEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})