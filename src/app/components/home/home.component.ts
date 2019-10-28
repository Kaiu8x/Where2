import { Component, OnInit, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
   
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lenguaje = 'en';
    
  constructor( private translate: TranslateService ) {
    this.translate.setDefaultLang(this.lenguaje);
  }

  

  ngOnInit() {

  }

  public cambiarLenguaje(lang){
    this.lenguaje = lang;
    this.translate.use(lang);
  }

}
