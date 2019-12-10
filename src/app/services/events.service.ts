import { Injectable } from '@angular/core';

import {Event} from '../classes/event';
import {Observable, of, Subject, throwError} from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import {catchError, timeout} from 'rxjs/operators';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';

import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventsService{
  endpoint = 'http://localhost:3000';
  language = 'en';
  returnUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
  }
  getLanguage(){
    return this.language;
  }

  // Get
  getEvents(loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events`;
    return this.http.get(url, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000),
      catchError((err) => {
        if(err["statusCode"] == 401 || err["statusCode"] == '401') {
          this.router.navigate(['login']);
        }
        loadingError.next(true);
        return of();
      })
    );
  }
  getUserEvents(userId: string, loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events?filter={"where":{"invited_status.user_id":{"inq":["${userId}"]}}}`;
    return this.http.get(url, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000),
      catchError((err) => {
        if(err["statusCode"] == 401 || err["statusCode"] == '401') {
          this.router.navigate(['login']);
        }
        loadingError.next(true);
        return of();
      })
    );
  }
  //?filter={"where":{"invited_status.user_id":{"inq":["5ded4beae949d6820a46cbeb"]}}}


  // Get
  getEvent(id, loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events/${id}`;
    return this.http.get(url, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000),
      catchError((err) => {
        if(err["statusCode"] == 401 || err["statusCode"] == '401') {
          this.router.navigate(['login']);
        }
        loadingError.next(true);
        return of();
      })
    );
  }

  // Add
  addEvent(event: Event): Observable<Event> {
    const url = `${this.endpoint}/events`;
    event.id = null;
    return this.http.post<Event>(url, event, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000),
      catchError((err) => {
        console.log(err);

        if(err["statusCode"] == 401 || err["statusCode"] == '401') {
          this.router.navigate(['login']);
        }
        return throwError(err);
      })
    );
  }


  // Delete
  deleteEvent(event: any): Observable<Event> {
    const url = `${this.endpoint}/events/${event.id}`;
    event.id = null;
    return this.http.delete<Event>(url, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000),
      catchError((err) => {
        if(err["statusCode"] == 401 || err["statusCode"] == '401') {
          this.router.navigate(['login']);
        }
        return throwError(err);
      })
    );
  }

  // Update
  updateEvent(event: Event): Observable<Event> {
    console.log("Updating", event);
    const url = `${this.endpoint}/events/${event.id}`;
    return this.http.put<Event>(url, event, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000)
    );
  }

  getInviteStatus(): Observable<any[]> {
    const url = `${this.endpoint}/invite-statuses?filter[fields][es]=false`;
    return this.http.get<any[]>(url, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}}).pipe(
      timeout(5000)
    );
  }
  
  
  getCategories(): Observable<string[]> {
    const url = `${this.endpoint}/event-categories?filter[fields][${this.language}]=false`;
    return this.http.get<string[]>(url, {headers:{'Authorization': 'Bearer ' +localStorage.getItem('currentUserToken')}});
  }
  
  getPromoted(): Observable<any[]> {
    const url = `${this.endpoint}/events?filter={"where":{"owner_id":"-1"}}`;
    return this.http.get<any[]>(url);
  }

}
