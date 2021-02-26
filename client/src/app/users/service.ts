import * as _ from 'lodash';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators';
import { User } from './model'

@Injectable()
export class UserService {
  constructor(private httpSrvc: HttpClient) {}

  getUser(userId: string): Observable<User> {
    let query = `
      query getUser($userId: ID!) {
        user(userId: $userId) {
          userId
          name
          email
        }
      }
    `
    return this
      ._postGLQuery(query, { userId })
      .pipe(
        map((data: any) => data.user)
      );
  }

  getUsers(): Observable<User[]> {
    let query = `
      query getUsers {
        users {
          userId
          name
          email
        }
      }
    `
    return this
      ._postGLQuery(query)
      .pipe(
        map((data: any) => data.users)
      )
  }

  createUser(userData: User): Observable<User> {
    let query = `
      mutation createUser($userInput: UserInput!) {
        createUser(input: $userInput) {
          userId
          name
          email
        }
      }
    `
    return this
      ._postGLQuery(query, { userInput: userData })
      .pipe(
        map((data: any) => data.users)
      )
  }

  updateUser(userData: User): Observable<User> {
    let query = `
      mutation updateUser($userId: ID!, $userInput: UserInput!) {
        updateUser(userId: $userId, input: $userInput) {
          userId
          name
          email
        }
      }
    `
    return this
      ._postGLQuery(query, {
        userId: userData.userId,
        userInput: _.pick(userData, ['name', 'email'])
      })
      .pipe(
        map((data: any) => data.users)
      )
  }

  deleteUser(userId: string): Observable<boolean> {
    let query = `
      mutation deleteUser($userId: ID!) {
        deleteUser(userId: $userId)
      }
    `
    return this
      ._postGLQuery(query, { userId })
      .pipe(
        map((data: any) => data.deleteUser)
      )
  }

  private _postGLQuery(query: string, variables?: any): Observable<any> {
    return this.httpSrvc
      .post<User>(
        '/graphql',
        {
          query,
          variables
        }
      )
      .pipe(
        map((res: any) => {
          if (res.errors) {
            throw new Error(res.errors[0].message);
          }
          return res.data;
        })
      )
  }
}
