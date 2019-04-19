import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

import { APP_KEY, APP_SECRET, USER_ID, MASTER_SECRET, ADMIN_ID } from 'src/app/kinvey.tokens';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = `https://baas.kinvey.com/user/${APP_KEY}`;
  userId: string;

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token');
  }

  signUp(body: Object) {
    return this.http.post(this.BASE_URL, body)
      .pipe(
        mergeMap((user) => {
          return this.assignRole(user['_id']);
        }, (user, role) => user)
      );
  }

  signIn(body: Object) {
    return this.http.post(`${this.BASE_URL}/login`, body);
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/_logout`, {});
  }

  isAuthenticated() {
    return this.token !== null;
  }

  userDiscovery(userId?: string) {
    let user = this.userId;
    if(userId) {
      user = userId;
    }

    return this.http.get(`${this.BASE_URL}/${user}`);
  }

  assignRole(userId: string) {
    return this.http.put(`${this.BASE_URL}/${userId}/roles/${USER_ID}`, {}, {
      headers: {
        'Authorization': `Basic ${btoa(`${APP_KEY}:${MASTER_SECRET}`)}`,
      }
    });
  }

  saveUserInfo(user: Object) {
    const isAdmin = user['_kmd']['roles'][0].roleId === ADMIN_ID;

    localStorage.setItem('isAdmin', isAdmin + "");
    localStorage.setItem('username', user['username']);
    localStorage.setItem('token', user['_kmd']['authtoken']);
    localStorage.setItem('userId', user['_id']);
  }

  isAdmin() {
    return localStorage.getItem('isAdmin') === "true";
  }
}
