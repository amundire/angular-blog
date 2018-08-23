import { Component, OnInit } from '@angular/core';
import { CreateArticleModel } from '../models/article-create.model';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  bindingModel: CreateArticleModel;
  constructor(private articleService: ArticleService,
              private router: Router,
              private authService: AuthService,
              private titleService: Title) {
    this.bindingModel = new CreateArticleModel('', '', '');
  }

  ngOnInit() {
    this.titleService.setTitle( `Create Article` );
    if (!this.authService.user || JSON.parse(localStorage.getItem('currentUser')).username === 'anonymous') {
      this.router.navigate(['signin']);
    }
  }

  create() {
    this.bindingModel.author = this.authService.user;
    this.articleService.createArticle(this.bindingModel, 'kinvey')
      .subscribe(() => {
        this.router.navigate(['article/all']);
      });
  }

}
