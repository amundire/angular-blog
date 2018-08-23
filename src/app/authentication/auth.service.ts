import { Injectable } from '@angular/core';
import { SignInModel } from './models/signin.model';
import { SignUpModel } from './models/signup.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import $ from 'jquery';

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
      return new HttpHeaders({Authorization: 'Kinvey ' + localStorage.getItem('authtoken')});
    }
  }

  register(body: SignUpModel, auth) {
   return this.http.post(registerUrl, body, {headers: this.makeAuth(auth)});
  }

  login(body: SignInModel, auth) {
    localStorage.clear();
    return this.http.post(loginUrl, body, {headers: this.makeAuth(auth)});
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null && JSON.parse(localStorage.getItem('currentUser')).username !== 'anonymous';
  }

  isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.isAdmin;
  }

  get token() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  get user() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null) {
      return undefined;
    }
    return currentUser.username;
  }

  getByUsername(username) {

    // getByUsername: username =>
    // requester.get('user', '', 'kinvey', { username })
    // function get(module, endpoint, auth, query) {
    //   return $.ajax(makeRequest('GET', module, endpoint, auth, query));
    // }
    // function makeRequest(method, module, endpoint, auth, query) {
    //  let url = 'https://baas.kinvey.com/user/kid_Hkpo26FI7';
    //  if (query) {
    //    url += '?query=' + JSON.stringify(query);
    //  }
    //
    //  return {
    //    method,
    //    url: url,
    //    headers: {
    //      'Authorization': makeAuth(auth),
    //    }
    //  };
    // }
    return $.ajax({
      method: 'GET',
      url: `https://baas.kinvey.com/user/kid_Hkpo26FI7?query=${JSON.stringify(username)}`,
      headers: {Authorization: 'Kinvey ' + this.token}
    });
  }

  deleteUser(id) {
    return $.ajax({
      method: 'DELETE',
      url: `https://baas.kinvey.com/user/kid_Hkpo26FI7/${id}`,
      headers: {Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret)}
    });
  }
}
