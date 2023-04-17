import EventInterface from "../@shared/EventInterface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date()
        this.eventData = eventData
    }
}