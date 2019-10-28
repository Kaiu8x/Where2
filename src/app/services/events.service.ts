import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

import {Event} from '../classes/event';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  SERVER_URL = 'api/events';

  constructor(private httpClient: HttpClient) {
  }

  public getAllEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.SERVER_URL);
  }

  public getEventById(id: number): Observable<Event> {
    console.log("getting "+id);
    const url = `${this.SERVER_URL}/${id}`;
    return this.httpClient.get<Event>(url);
  }

  public addEvent(e: Event) {
    return this.httpClient.post(this.SERVER_URL + 'events', e);
  }

  public updateEvent(e: Event) {
    return this.httpClient.put(this.SERVER_URL + 'events' + '/' + e.id, e);
  }

  public deleteEvent(e: Event) {
    return this.httpClient.delete(this.SERVER_URL + 'events' + '/' + e.id);
  }

}
