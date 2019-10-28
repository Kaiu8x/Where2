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
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log('Getting event: ' + this.id);
    this.getEvent();
  }

  counter(i: number) {
    return new Array(i);
  }

  getEvent() {
    this.eventsService.getEventById(this.id).subscribe(((data: any) => {
      console.log('This are the events:');
      this.event = data;
    }));
  }
}
