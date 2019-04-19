import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

import { APP_KEY, APP_SECRET, USER_ID, MASTER_SECRET } from 'src/app/kinvey.tokens';


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

  saveUserInfo(res: Object) {
    localStorage.setItem('username', res['username']);
    localStorage.setItem('token', res['_kmd']['authtoken']);
    localStorage.setItem('userId', res['_id']);
  }
}
