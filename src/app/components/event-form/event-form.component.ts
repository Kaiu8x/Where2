import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Event} from "../../classes/event";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm;
  categories;

  constructor(private eventsService: EventsService,
              private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      name: '',
      description: '',
      address: '',
      category: '',
      photoUrls: this.formBuilder.array([])
    });
  }

  get photoUrls() {
    return this.eventForm.get('photoUrls') as FormArray;
  }

  addPhoto() {
    this.photoUrls.push(this.formBuilder.control(''));
  }

  ngOnInit() {
    this.categories = this.eventsService.getCategories();
  }

  onSubmit(event: Event) {
    console.log("Submitting", event);
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
