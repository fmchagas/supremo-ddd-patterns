import EventDispatcherInterface from "./EventDispatcherInterface";
import EventInterface from "./EventInterface";
import EventHandlerInterface from "./EventHandlerInterface";

export default class EventDispatcher implements EventDispatcherInterface {
    
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}
   

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name

        if(this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event)
            })
        }
    }

    register(eventName: string, eventHadle: EventHandlerInterface<EventInterface>): void {
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = []
        }

        this.eventHandlers[eventName].push(eventHadle)
    }

    unregister(eventName: string, eventHadle: EventHandlerInterface<EventInterface>): void {
        const handlers = this.eventHandlers[eventName]
        if(!handlers){
            return
        }
        
        const index = handlers.indexOf(eventHadle)
        
        if (index !== -1){
            handlers.splice(index, 1)
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {}
    }
}