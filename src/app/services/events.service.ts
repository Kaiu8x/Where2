import {Injectable} from '@angular/core';

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
  returnUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
  }

  // Get
  getEvents(loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events`;
    return this.http.get(url/*, {headers:{'Authorization': 'Bearer ' +localStorage.getItem(currentUserToken)}}*/).pipe(
      timeout(5000),
      catchError(() => {
        loadingError.next(true);
        return of();
      })
    );
  }

  // Get
  getCategories(): Observable<string[]> {
    const url = `${this.endpoint}/categories`;
    return this.http.get<string[]>(url);
  }

  // Get
  getEvent(id, loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events/${id}`;
    return this.http.get(url).pipe(
    timeout(5000),
      catchError(() => {
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
    return this.http.delete<Event>(url).pipe(
      timeout(5000),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  // Update
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.endpoint}/events/${event.id}`;
    event.id = null;
    return this.http.put<Event>(url, event).pipe(
      timeout(5000)
    );
  }
}
