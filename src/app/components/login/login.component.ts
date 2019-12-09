import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    email;
    password;


     constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { }

    user = {
        email: "",
        password: ""
    };

     ngOnInit() {
         this.authenticationService.logout();
         this.returnUrl = '/home';
        /*this.userService.getusers().subscribe(res => {
          console.log(res);
        });*/
    }

    signIn() {
        console.log(this.user);
        this.userService.login(this.user).subscribe(res => {
          console.log(res);
          localStorage.setItem("currentUserToken", res["token"]);
        });

        this.submitted = true;
        this.loading = true;
        console.log(""+this.user["email"]+" " +this.user["password"]);
        this.authenticationService.login(this.user["email"], this.user["password"])
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

 

	/*loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    user;
    password;

    constructor(
     
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


   
    onSubmit() {
        this.submitted = true;
        this.loading = true;
        console.log(""+this.user+" " +this.password);
        this.authenticationService.login(this.user, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }*/

}