import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {Subject} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event;
  test;
  messageForm;
  loadingError = new Subject<boolean>();
  categories;

  constructor(private eventsService: EventsService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private  route: ActivatedRoute) {
    this.messageForm = this.formBuilder.group({text: ''});
  }

  ngOnInit() {
    this.getEvent();
    this.categories = this.eventsService.getCategories();
  }

  getEvent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventsService.getEvent(id, this.loadingError).subscribe(data => {
      this.event = data;
      console.log(data);
    });
    console.log(this.event);
  }


  getUser(id) {
  }

  submitMessage(message) {
    const fullMesage = {
      ubser_id: 0,
      text: message
    };
    console.log("Sending message", message);
    console.log("To", this.event);
    this.event.messages.push(fullMesage);
    this.eventsService.updateEvent(this.event);
    this.messageForm.reset();
  }

}
