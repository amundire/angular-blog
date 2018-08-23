import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { ArticleModel } from './models/article.model';
import { CreateArticleModel } from './models/article-create.model';
import { AuthService } from '../authentication/auth.service';

const createUrl = 'https://baas.kinvey.com/appdata/kid_Hkpo26FI7/article'; // POST
const detailsUrl = 'https://baas.kinvey.com/appdata/kid_Hkpo26FI7/article/'; // GET by ID
const allUrl = 'https://baas.kinvey.com/appdata/kid_Hkpo26FI7/article'; // GET all
const deleteUrl = 'https://baas.kinvey.com/appdata/kid_Hkpo26FI7/article/'; // DELETE by ID
const editUrl = 'https://baas.kinvey.com/appdata/kid_Hkpo26FI7/article/'; // PUT by ID

const kinveyAppKey = 'kid_Hkpo26FI7';
const kinveyAppSecret = 'f2961c4dfdea4ee69199861386809c14';
const kinveyMasterSecret = '23081be9e1f54d31bf485311c4715c2a';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  makeAuth(type: string): HttpHeaders {
    if (type === 'basic') {
      return new HttpHeaders({Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)});
    } else if (type === 'delete') {
      return new HttpHeaders({Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret)});
    } else {
      return new HttpHeaders({Authorization: 'Kinvey ' + this.authService.token});
    }
  }

  createArticle(body: CreateArticleModel, auth) {
    return this.http.post(createUrl, body, {headers: this.makeAuth(auth)});
  }

  getAllArticles(auth) {
    return this.http.get<ArticleModel[]>(allUrl, {headers: this.makeAuth(auth)});
  }

  getArticleDetails(id: string, auth) {
    return this.http.get<ArticleModel>(detailsUrl + id, {headers: this.makeAuth(auth)});
  }

  deleteArticle(id: string, auth) {
    return this.http.delete<ArticleModel>(deleteUrl + id, {headers: this.makeAuth(auth)});
  }

  getArticleById(id: string, auth) {
    return this.http.get<ArticleModel>(detailsUrl + id, {headers: this.makeAuth(auth)});
  }

  editArticle(id: string, body: ArticleModel, auth) {
    return this.http.put(editUrl + id, body, {headers: this.makeAuth(auth)});
  }

  createdBeforeDays(createdOnString) {
    function pluralize(value) {
      if (value !== 1) {
        return 's';
      } else {
        return '';
      }
    }

    let diff = new Date().getTime() - new Date(createdOnString).getTime();
    diff = Math.floor(diff / 60000);
    if (diff < 1) {
      return 'less than a minute';
    }
    if (diff < 60) {
      return diff + ' minute' + pluralize(diff);
    }
    diff = Math.floor(diff / 60);
    if (diff < 24) {
      return diff + ' hour' + pluralize(diff);
    }
    diff = Math.floor(diff / 24);
    if (diff < 30) {
      return diff + ' day' + pluralize(diff);
    }
    diff = Math.floor(diff / 30);
    if (diff < 12) {
      return diff + ' month' + pluralize(diff);
    }
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
  }
}
