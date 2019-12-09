import { Component, OnInit } from "@angular/core";

import { Event } from "../../classes/event";
import { EventsService } from "../../services/events.service";
import { Observable } from "rxjs";
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"]
})
export class EventsPageComponent implements OnInit {
  events: Observable<Event[]>;
  loadingError = new Subject<boolean>();
  userId;

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

  constructor(
    private eventsService: EventsService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.userId = this.userService.getId();
    this.getEvents();
  }

  getEvents(): void {
    this.events = this.eventsService.getUserEvents( this.userId,this.loadingError);
    console.log(this.events);
  }
}
