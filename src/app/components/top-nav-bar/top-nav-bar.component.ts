import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  public language = 'en';
  
  constructor( private translate: TranslateService ) {
    this.translate.setDefaultLang(this.language);
  }

  ngOnInit() {
  }

  public cambiarLenguaje(lang){
    this.language = lang;
    this.translate.use(lang);
  }
  
}
