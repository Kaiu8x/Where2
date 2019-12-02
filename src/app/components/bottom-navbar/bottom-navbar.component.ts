import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss']
})
export class BottomNavbarComponent implements OnInit {
  public lenguaje = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.lenguaje);
  }

  ngOnInit() {
  }

  public cambiarLenguaje(lang) {
    this.lenguaje = lang;
    this.translate.use(lang);
  }
}
