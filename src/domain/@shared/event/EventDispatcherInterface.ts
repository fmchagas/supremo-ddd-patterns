import EventHandlerInterface from "./EventHandlerInterface";
import EventInterface from "./EventInterface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void
    register(eventName: string, eventHadle: EventHandlerInterface): void
    unregister(eventName: string, eventHadle: EventHandlerInterface): void
    unregisterAll(): void
}