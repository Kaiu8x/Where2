import { Message } from "./message";
export class Event {
  id: number;
  title: string;
  description: string;
  location: [number, number];
  ownerId: number;
  invitedId: number[];
  interestedId: number[];
  acceptedId: number[];
  thread: Message[];
  date: Date;
  image: string;
  constructor() {}
}
