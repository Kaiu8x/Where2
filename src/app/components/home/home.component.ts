import { Component, OnInit, NgModule } from '@angular/core';
import {CarouselModule} from "angular2-carousel";

@NgModule({
    imports: [
       CarouselModule
    ] 
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
