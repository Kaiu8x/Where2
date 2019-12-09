import { Component, HostBinding } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './classes';


import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	currentUser: User;
	title = 'Where2';

	constructor(
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
}
