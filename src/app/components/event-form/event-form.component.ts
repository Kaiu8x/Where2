import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../services/events.service";
import { FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Event } from "../../classes/event";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm;
  categories;

  userId;

  constructor(private eventsService: EventsService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      name: '',
      description: '',
      address: '',
      category: '',
      photoUrls: new FormArray([]),
    });
  }


  addPhoto() {
    const form = new FormControl("");
    this.eventForm.controls["photoUrls"].push(form);
  }

  ngOnInit() {
    this.userId = this.userService.getId()
    this.categories = this.eventsService.getCategories();
  }

  onSubmit(event: Event) {
    console.log("Submitting", event);
    event.owner_id = this.userId;
    event.invited_status = [{ "status": 0, "user_id": this.userId }];
    this.eventsService.addEvent(event).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
    this.eventForm.reset();
  }

}
