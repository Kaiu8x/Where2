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
  inviteStatus;
  ownerId;
  userId;
  users = {};

  constructor(private eventsService: EventsService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private  route: ActivatedRoute) {
    this.messageForm = this.formBuilder.group({messageText: ''});
  }

  ngOnInit() {
    this.getEvent();
    this.userId = this.userService.getId();
    this.categories = this.eventsService.getCategories();
    this.eventsService.getInviteStatus().subscribe(data => {
      this.inviteStatus = data.map(e => e.es);
    });
  }

  getEvent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventsService.getEvent(id, this.loadingError).subscribe(data => {
      this.event = data;
      console.log("Data")
      console.log(data);
      console.log(this.event);
      this.getUsers();
    });
    console.log(this.event);
  }

  edit() {
    this.router.navigate(['/events/edit', this.event.id]);
  }

  getUsers() {
    for (const message of this.event.messages) {
      this.getUser(message.user_id);
    }
    for (const invited of this.event.invited_status) {
      this.getUser(invited.user_id);
    }
  }


  getUser(id) {
    if (!(id in this.users)) {
      this.userService.getUser(id).subscribe(data => {
        this.users[data.id] = data;
      });
    }
  }

  submitMessage(message) {
    const fullMesage = {
      user_id: this.userId,
      text: message.messageText
    };
    console.log("Sending message", message);
    console.log("To", this.event);
    this.event.messages.push(fullMesage);
    this.eventsService.updateEvent(this.event).subscribe(data => {
      this.getEvent();
    });
    this.messageForm.reset();
  }

}
