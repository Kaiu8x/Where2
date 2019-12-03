// import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import {} from "googlemaps";

// declare var google;
// let map: any;
// let infowindow: any;
// let options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };
// @Component({
//   selector: "app-discover",
//   templateUrl: "./discover.component.html",
//   styleUrls: ["./discover.component.scss"]
// })
// export class DiscoverComponent implements OnInit {
//   @ViewChild("map", { static: false }) mapElement: ElementRef;
//   map: google.maps.Map;
//   formattedAddress = "";

//   options = {
//     componentRestrictions: {
//       country: ["MX"]
//     }
//   };

//   constructor() {}

//   ngOnInit() {}

//   ngAfterViewInit() {
//     setTimeout(() => {
//       this.initMap2();
//     }, 1000);
//   }

//   public initMap() {
//     const mapProperties = {
//       center: new google.maps.LatLng(19.2864807, -99.1384592),
//       zoom: 15,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     this.map = new google.maps.Map(
//       this.mapElement.nativeElement,
//       mapProperties
//     );
//   }

//   initMap2() {
//     navigator.geolocation.getCurrentPosition(
//       location => {
//         console.log(location);
//         map = new google.maps.Map(this.mapElement.nativeElement, {
//           center: {
//             lat: location.coords.latitude,
//             lng: location.coords.longitude
//           },
//           zoom: 15
//         });

//         infowindow = new google.maps.InfoWindow();
//         var service = new google.maps.places.PlacesService(map);
//         service.nearbySearch(
//           {
//             location: {
//               lat: location.coords.latitude,
//               lng: location.coords.longitude
//             },
//             radius: 1000,
//             type: ["store"]
//           },
//           (results, status) => {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//               for (var i = 0; i < results.length; i++) {
//                 this.createMarker(results[i]);
//               }
//             }
//           }
//         );
//       },
//       error => {
//         console.log(error);
//       },
//       options
//     );
//     var myplace = { lat: -33.8665, lng: 151.1956 };
//   }
//   createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//       map: map,
//       position: placeLoc
//     });

//     google.maps.event.addListener(marker, "click", function() {
//       infowindow.setContent(place.name);
//       infowindow.open(map, this);
//     });
//   }

//   public handleAddressChange(address: any) {
//     this.formattedAddress = address.formatted_address;
//   }
// }

import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { } from "googlemaps";

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

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

  markerOver(m: marker) {
    m.animation = 'BOUNCE';
  }

  markerOut(m: marker) {
    m.animation = '';
  }

  markers: marker[] = [
    // {
    //   lat: 51.673858,
    //   lng: 7.815982,
    //   label: 'A',
    //   animation: 'DROP'
    // },
    // {
    //   lat: 51.373858,
    //   lng: 7.215982,
    //   label: 'B',
    //   animation: 'DROP'
    // },
    // {
    //   lat: 51.723858,
    //   lng: 7.895982,
    //   label: 'C',
    //   animation: 'DROP'
    // }
  ]

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 19.2864807;
    this.longitude = -99.1384592;

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
          this.zoom = 12;
        });
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }

  public initMap() {


    map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {
        lat: this.latitude,
        lng: this.longitude
      },
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: {
          lat: this.latitude,
          lng: this.longitude
        },
        radius: 1000,
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
        }
      }
    );
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  animation: 'DROP' | 'BOUNCE' | '';
}
