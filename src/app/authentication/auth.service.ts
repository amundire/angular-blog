import { Injectable } from '@angular/core';
import { SignInModel } from './models/signin.model';
import { SignUpModel } from './models/signup.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const registerUrl = 'https://baas.kinvey.com/user/kid_Hkpo26FI7';
const loginUrl = 'https://baas.kinvey.com/user/kid_Hkpo26FI7/login';

const kinveyAppKey = 'kid_Hkpo26FI7';
const kinveyAppSecret = 'f2961c4dfdea4ee69199861386809c14';
const kinveyMasterSecret = '23081be9e1f54d31bf485311c4715c2a';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {  }

  makeAuth(type: string): HttpHeaders {
    if (type === 'basic') {
      return new HttpHeaders({Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)});
    } else if (type === 'delete') {
      return new HttpHeaders({Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret)});
    } else {
      return new HttpHeaders({Authorization: 'Kinvey ' + sessionStorage.getItem('authtoken')});
    }
  }

  register(body: SignUpModel, auth) {
    console.log(registerUrl);
    console.log(body);
    console.log(this.makeAuth(auth));
   return this.http.post(registerUrl, body, {headers: this.makeAuth(auth)});
  }

  login(body: SignInModel, auth) {
    return this.http.post(loginUrl, body, {headers: this.makeAuth(auth)});
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  isAdmin(): boolean {
    if (this.user) {
      return this.user.isAdmin;
    }
    return false;
  }

  get user() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.username;
  }
}


