import { Injectable } from "@angular/core";

import { Event } from "../classes/event";
import { EVENTS } from "../mock-events";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  constructor() {}

  getEvents(): Event[] {
    console.log("EVENTS:");
    console.log(EVENTS);
    return EVENTS;
  }
}
