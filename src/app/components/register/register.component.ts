import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 	loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    firstName;
    lastName;
    email;
    password;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { }

  user = {
  		photoUrl: "",
  		firstName: "",
  		lastName: "",
        email: "",
        password: "",
        phone: ""
    };

     ngOnInit() {
         this.authenticationService.logout();
         this.returnUrl = '/login';
        /*this.userService.getusers().subscribe(res => {
          console.log(res);
        });*/
    }

    signIn() {
        console.log(this.user);
        this.userService.postusers(this.user).subscribe(res => {
          console.log(res);
          //localStorage.setItem("currentUserToken", res["token"]);
          this.router.navigate([this.returnUrl]);
        });
        
    }

}
