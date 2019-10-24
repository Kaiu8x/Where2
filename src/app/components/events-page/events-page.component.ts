import { Component, OnInit } from "@angular/core";

import { Event } from "../../classes/event";
import { EventsService } from "../../services/events.service";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  events: Event[];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events = this.eventsService.getEvents();
    console.log("This are the events:");
    console.log(this.events);
  }
}
