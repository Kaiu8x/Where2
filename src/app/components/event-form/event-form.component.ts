import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Event } from "../../classes/event";
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular'; 
import { MapsAPILoader } from "@agm/core";
import { } from "googlemaps";

declare var google;

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm;
  categories;

  userId;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public label: string;
  public address: string;
  public userLocationMarkerAnimation: string;
  previous;

  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: google.maps.Map;

  public options = {
    types: ["establishment"],
    componentRestrictions: {
      country: ["MX"]
    }
  };

  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  markerOver(marker) {
    this.userLocationMarkerAnimation = 'BOUNCE';
  }

  markerOut(marker) {
    this.userLocationMarkerAnimation = '';
  }

  @ViewChild("searchEvent", { static: false })
  public searchElementRef: ElementRef;


  constructor(private eventsService: EventsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.eventForm = this.formBuilder.group({
      name: '',
      description: '',
      address: '',
      category: '',
      photoUrls: new FormArray([]),
    });
  }

  async presentAlert() { 
    const alert = await this.alertController.create({ 
      header: 'Event created', 
      message: 'The event was created successfully!', 
      buttons: ['OK']
    });  
    await alert.present(); 
  } 

  addPhoto() {
    const form = new FormControl("");
    this.eventForm.controls["photoUrls"].push(form);
  }

  ngOnInit() {
    this.userId = this.userService.getId()
    this.categories = this.eventsService.getCategories();

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 19.2864807;
    this.longitude = -99.1384592;
    this.label = "You are here!";

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        this.options
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.label = place.name;
          this.address = place.formatted_address;

        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  async addToEvent() {
    // Here the db must be updated

    // Place Name
    console.log(this.label);

    // Place Address
    console.log(this.address);

    // Place Latitude
    console.log(this.latitude);

    // Place Longitude
    console.log(this.longitude);

    document.getElementById("address").innerHTML = ""+this.latitude+","+this.longitude+"";

    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'The map was succesfully added!',
      buttons: ['OK']
    });

    await alert.present();
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
