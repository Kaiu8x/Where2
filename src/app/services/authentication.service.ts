import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../classes';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>('http://localhost:3000/users/login/', { "email":email, "password":password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUserToken', JSON.stringify(user));
                    //localStorage.setItem('currentUser', JSON.stringify({ "email":email, "password":password }));
                    //localStorage.setItem('currentUserToken', user.token);
                    this.currentUserSubject.next(user);
                    //console.log(localStorage.getItem('currentUser'));
                    console.log(localStorage.getItem('currentUserToken'));

                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        console.log("erase localStorage");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        this.currentUserSubject.next(null);
    }
}