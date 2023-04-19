import ProductCreatedEvent from "../product/ProductCreatedEvent"
import SendEmailWhenProductIsCreateHandler from "../product/handler/SendEmailWhenProductIsCreateHandler"
import SendRabbitWhenProductIsCreateHandler from "../product/handler/SendRabbitWhenProductIsCreateHandler"
import EventDispatcher from "./EventDispatcher"

describe("Domain events tests", function() {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    })


    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
    })

    it("should return without error when unregistering does not contain an event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
        expect(eventDispatcher.getEventHandlers).toEqual({})
    })


    it("should unregister all event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined()
        expect(eventDispatcher.getEventHandlers).toEqual({})
    })

    it("should notify all event handler", () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreateHandler()
        const eventHandlerRabbit = new SendRabbitWhenProductIsCreateHandler()
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandlerRabbit, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler)
        eventDispatcher.register("ProductCreatedEvent", eventHandlerRabbit)
        
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 0.03
        })


        /*
         Quando o notify for executado o SendEmailWhenProductIsCreateHandler.handle(),
         SendRabbitWhenProductIsCreateHandler.handle() deve ser chamado
        */
        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })
    
})