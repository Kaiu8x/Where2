import {Message} from './message';
export class Event {
    event_id: number;
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
