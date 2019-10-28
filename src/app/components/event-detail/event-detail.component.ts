import {Component, OnDestroy, OnInit} from '@angular/core';
import {Event} from '../../classes/event';

import {EventsService} from '../../services/events.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event: Event;
  id: number;
  private sub: any;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) {
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params.id; // (+) converts string 'id' to a number
      this.getEvent(id);
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  getEvent(id: number) {
    this.eventsService.getEventById(id).subscribe(((data: any) => {
      console.log('This are the event:');
      this.event = data;
    }));
  }
}
