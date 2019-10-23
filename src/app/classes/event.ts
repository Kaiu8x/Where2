import {Message} from './message';
export class Event {
    eventId: number;
    title: string;
    description: string;
    location: [number, number];
    ownerId: number;
    invitedId: number[];
    thread: Message[];
    image: string;
    constructor() {
    }
}
