import { Component, OnInit } from '@angular/core';
import { CreateArticleModel } from '../models/article-create.model';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  bindingModel: CreateArticleModel;
  constructor(private articleService: ArticleService,
              private router: Router,
              private authService: AuthService) {
    this.bindingModel = new CreateArticleModel('', '', '');
  }

  ngOnInit() {
  }

  create() {
    this.bindingModel.author = this.authService.user;
    this.articleService.createArticle(this.bindingModel, 'kinvey')
      .subscribe(() => {
        this.router.navigate(['article/all']);
      });
  }

}
