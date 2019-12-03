import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {Subject} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event;
  loadingError = new Subject<boolean>();

  constructor(private eventsService: EventsService,
              private router: Router,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.event = this.eventsService.getEvent(id, this.loadingError);
    console.log(this.event);
  }

  getUser(){

  }

}
