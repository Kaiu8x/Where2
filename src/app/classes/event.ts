import {Message} from './message';
export class Event {
    title: string;
    description: string;
    location: [number, number];
    owner_id: number;
    invited_id: number[];
    thread: Message[];
    constructor(){
    }
}
