import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { } from "googlemaps";
import { AlertController } from '@ionic/angular';

declare var google;

@Component({
  selector: "app-discover",
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.scss"]
})
export class DiscoverComponent implements OnInit {
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

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private alertController: AlertController) { }

  ngOnInit() {
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


    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'The map was succesfully added!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
