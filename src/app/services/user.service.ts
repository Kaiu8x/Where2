import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  SERVER_URL: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}

  public getusers() {
    return this.httpClient.get(this.SERVER_URL + 'users');
  }

  public getuser(id) {
    return this.httpClient.get(`${this.SERVER_URL + 'users'}/${id}`);
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