import {Component, OnInit} from "@angular/core";

import {Event} from "../../classes/event";
import {EventsService} from "../../services/events.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  events: Observable<Event[]>;

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events = this.eventsService.getEvents();
    console.log(this.events);
  }
}
