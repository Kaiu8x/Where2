import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
  	trigger('fadeInOut', [
	  state('none, void', style({
	    opacity: 0
	  })),
	  state('visible', style({
	    opacity: 100
	  })),
	  transition('none <=> visible', animate('380000ms')),
	]),
  ]
})
export class CardComponent implements OnInit, AfterViewInit {
  state:string = 'none';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  	this.state = 'visible';
  }

}
