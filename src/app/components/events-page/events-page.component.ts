import { Component, OnInit } from '@angular/core';

import { Event } from '../../classes/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  events: Event[];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    console.log("Getting events");
    this.getEvents();
  }

  getEvents(): void {
    this.eventsService.getAllEvents().subscribe(((data: any[]) => {
      console.log('This are the events:');
      this.events = data;
    }));
  }
}
