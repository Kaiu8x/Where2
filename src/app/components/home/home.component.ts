import { Component, OnInit, NgModule, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Event } from "../../classes/event";

@NgModule({})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lenguaje = 'en';
  promoted: Event[]; 

  constructor(private translate: TranslateService , private eventService: EventsService, private userService: UserService, private router: Router) {
    this.translate.setDefaultLang(this.lenguaje);
  }


  ngOnInit() {
    this.userService.setId().subscribe(data => {
      console.log("Setting Id")
      console.log(data)
      this.userService.currentId = data["id"];
    })
    this.eventService.getPromoted().subscribe(data => {
      console.log("Got")
      console.log(data[0])
      this.promoted = data; 
    })
  }

  public cambiarLenguaje(lang) {
    console.log("Cambiando lenguaje")
    this.eventService.language = lang;
    this.lenguaje = lang;
    this.translate.use(lang);
  }

  eventsCreate() {
    this.router.navigate(['events/create']);
  }

  eventDetail(route) {
    this.router.navigate(['events/'+route]);
  }

}
