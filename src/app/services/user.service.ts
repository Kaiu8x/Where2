import { Injectable } from '@angular/core';
import { timeout } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { User } from "../classes/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = 'http://localhost:3000';
  currentId = '5ded4beae949d6820a46cbeb';
  SERVER_URL: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}
  
  setId(id: string) {
    this.currentId = id;
  }

  getId(): string {
    return this.currentId;
  }

  public getusers() {
    return this.httpClient.get(this.SERVER_URL + 'users');
  }

  getUser(id): Observable<User> {
    const url = `${this.endpoint}/users/${id}`;
    return this.http.get<User>(url).pipe(
      timeout(5000));
  }
  
  public postusers(users) {
    return this.httpClient.post(`${this.SERVER_URL + 'users'}`, users);
  }

  public login(users) {
    return this.httpClient.post(`${this.SERVER_URL + 'users/login'}`, users);
  }

  public deleteusers(id) {
    return this.httpClient.delete(`${this.SERVER_URL + 'users'}/${id}`);
  }
  public updateusers(users) {
    return this.httpClient.patch(`${this.SERVER_URL + 'users'}/${users.id}`, users );
  }
}
