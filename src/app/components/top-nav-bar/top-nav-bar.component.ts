import { Component, OnInit, Input} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

import {User} from '../../classes/user';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  public language = 'en';
  @Input() currentUser:User;
  usuario;

  constructor( private translate: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
        ) {
        this.translate.setDefaultLang(this.language);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log(this.currentUser);
  }

  public cambiarLenguaje(lang){
    this.language = lang;
    this.translate.use(lang);
  }

  logout() {
        console.log("Logout");
        this.authenticationService.logout();
        this.router.navigate(['/login']);
  }
  
}
