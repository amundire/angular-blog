import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleModel } from './models/article.model';
import { CreateArticleModel } from './models/article-create.model';

const createUrl = 'http://localhost:5000/furniture/create';
const myUrl = 'http://localhost:5000/furniture/mine';
const detailsUrl = 'http://localhost:5000/furniture/details/';
const allUrl = 'http://localhost:5000/furniture/all';
const deleteUrl = 'http://localhost:5000/furniture/delete/';
const furnitureById = 'http://localhost:5000/furniture/';
const editUrl = 'http://localhost:5000/furniture/edit/';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {

  }

  createArticle(body: CreateArticleModel) {
    return this.http.post(createUrl, body);
  }

  getAllArticle() {
    return this.http.get<ArticleModel[]>(allUrl);
  }

  getArticleDetails(id: string) {
    return this.http.get<ArticleModel>(detailsUrl + id);
  }

  getMyArticle() {
    return this.http.get<ArticleModel[]>(myUrl);
  }

  deleteArticle(id: string) {
    return this.http.delete<ArticleModel>(deleteUrl + id);
  }

  getArticleById(id: string) {
    return this.http.get<ArticleModel>(furnitureById + id);
  }

  editArticle(id: string, body: ArticleModel) {
    return this.http.put(editUrl + id, body);
  }
}
