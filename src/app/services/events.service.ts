import { Injectable } from '@angular/core';

import { Event } from '../classes/event';
import { Observable, of, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  endpoint = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
  }

  // Get
  getEvents(loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events`;
    return this.http.get(url).pipe(
      timeout(5000),
      catchError(() => {
        loadingError.next(true);
        return of();
      })
    );
  }
  getUserEvents(userId: string, loadingError: Subject<boolean>): Observable<any> {
    const url = `${this.endpoint}/events?filter={"where":{"invited_status.user_id":{"inq":["${userId}"]}}}`;
    return this.http.get(url).pipe(
      timeout(5000),
      catchError(() => {
        loadingError.next(true);
        return of();
      })
    );
  }
  //?filter={"where":{"invited_status.user_id":{"inq":["5ded4beae949d6820a46cbeb"]}}}


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
    return this.http.post<Event>(url, event).pipe(
      timeout(5000),
      catchError((err) => {
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
    console.log("Updating", event);
    const url = `${this.endpoint}/events/${event.id}`;
    return this.http.put<Event>(url, event).pipe(
      timeout(5000)
    );
  }

  getInviteStatus(): Observable<any[]> {
    const url = `${this.endpoint}/invite-statuses?filter[fields][es]=false`;
    return this.http.get<any[]>(url).pipe(
      timeout(5000)
    );
  }


  // Get
  getCategories(): Observable<string[]> {
    const url = `${this.endpoint}/event-categories?filter[fields][es]=false`;
    return this.http.get<string[]>(url);
  }
}
