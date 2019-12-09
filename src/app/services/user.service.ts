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
  currentId = '';
  SERVER_URL: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  setId(id: any) {
    this.currentId = id;
  }

  getId(): string {
    if (this.currentId === '') {
      this.httpClient.get(this.SERVER_URL + 'users/me').subscribe(data => {
        console.log("Setting Id");
        this.setId(data["id"]);
      });
    }
    return this.currentId;
  }

  public getusers() {
    return this.httpClient.get(this.SERVER_URL + 'users');
  }

  getUser(id): Observable<User> {
    const url = `${this.endpoint}/users/${id}`;
    return this.httpClient.get<User>(url).pipe(
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
    return this.httpClient.patch(`${this.SERVER_URL + 'users'}/${users.id}`, users);
  }
}
