import {Component, OnInit, NgModule} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@NgModule({})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lenguaje = 'en';

  constructor(private translate: TranslateService, private userService:UserService) {
    this.translate.setDefaultLang(this.lenguaje);
  }


  ngOnInit() {
    this.userService.setId().subscribe(data => {
      console.log("Setting Id")
      console.log(data)
      this.userService.currentId = data["id"];
    })
  }

  public cambiarLenguaje(lang) {
    this.lenguaje = lang;
    this.translate.use(lang);
  }

}
