import EventDispatcher from "../@shared/EventDispatcher"
import CustomerCreatedEvent from "./CustomerCreatedEvent"
import SendConsoleLog1WhenCustomerIsCreatedHandler from "./handler/SendConsoleLog1WhenCustomerIsCreatedHandler"
import SendConsoleLog2WhenCustomerIsCreatedHandler  from "./handler/SendConsoleLog2WhenCustomerIsCreatedHandler"

describe("Domain events customer created tests", function() {

    it("should notify all event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandlerCustomerCreated1 = new SendConsoleLog1WhenCustomerIsCreatedHandler()
        const eventHandlerCustomerCreated2 = new SendConsoleLog2WhenCustomerIsCreatedHandler()
        const spyEventHandler = jest.spyOn(eventHandlerCustomerCreated1, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandlerCustomerCreated2, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerCreated1)
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerCreated2)

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerCustomerCreated1)
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerCustomerCreated2)

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "customer-id-1",
            name: "Customer 1",
            active: false
        })

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })
})