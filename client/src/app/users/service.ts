import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './model';

const USERS_URL = '/api/users/';

@Injectable()
export class UserService {
  constructor(private httpSrvc: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.httpSrvc.get<User>(USERS_URL + id);
  }

  getUsers(): Observable<User[]> {
    return this.httpSrvc.get<User[]>(USERS_URL);
  }

  createUser(user: User): Observable<User> {
    return this.httpSrvc.post<User>(USERS_URL, user);
  }

  updateUser(userData: any): Observable<User> {
    return this.httpSrvc.put<User>(USERS_URL + userData.userId, userData);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.httpSrvc.delete<boolean>(USERS_URL + id);
  }
}
