import {Injectable} from '@angular/core';

import {Event} from '../classes/event';
import {EVENTS} from '../mock-events';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeout} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  endpoint = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  // Get
  getEvents(): Observable<Event[]> {
    const url = `${this.endpoint}/events`;
    return this.http.get<Event[]>(url).pipe(
      timeout(5000)
    );
  }
  // Get
  getEvent(event: Event): Observable<Event[]> {
    const url = `${this.endpoint}/events/${event.id}`;
    return this.http.get<Event[]>(url).pipe(
      timeout(5000)
    );
  }

  // Add
  addEvent(event: Event): Observable<Event>  {
    const url = `${this.endpoint}/events`;
    event.id = null;
    return this.http.post<Event>(url, event).pipe(
      timeout(5000)
    );
  }

  // Update
  updateEvent(event: Event): Observable<Event>  {
    const url = `${this.endpoint}/events/${event.id}`;
    event.id = null;
    return this.http.put<Event>(url, event).pipe(
      timeout(5000)
    );
  }
}
