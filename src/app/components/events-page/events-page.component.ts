import {Component, OnInit} from "@angular/core";

import {Event} from "../../classes/event";
import {EventsService} from "../../services/events.service";
import {Observable} from "rxjs";
import {Subject} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  events: Observable<Event[]>;
  loadingError = new Subject<boolean>();

  onDelete(event) {
    console.log(event);
    this.eventsService.deleteEvent(event).subscribe(data => {
      this.getEvents();
    });
  }

  onClick(event) {
    console.log(event);
    this.router.navigate(['/events', event.id]);
  }

  constructor(private eventsService: EventsService,
              private router: Router) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events = this.eventsService.getEvents(this.loadingError);
    console.log(this.events);
  }
}
