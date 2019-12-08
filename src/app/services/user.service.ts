import {Injectable} from '@angular/core';
import {timeout} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {User} from "../classes/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = 'http://localhost:3000';
  currentId = '0';

  constructor(private http: HttpClient) {
  }

  setId(id) {
    this.currentId = id;
  }

  getId(): string {
    return this.currentId;
  }


  getUser(id): Observable<User> {
    const url = `${this.endpoint}/users/${id}`;
    return this.http.get<User>(url).pipe(
      timeout(5000));
  }
}
