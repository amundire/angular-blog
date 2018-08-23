import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ArticleModel } from '../models/article.model';
import { Observable } from 'rxjs/index';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-my',
  templateUrl: './article-my.component.html',
  styleUrls: ['./article-my.component.css']
})
export class ArticleMyComponent implements OnInit {
  articles: Observable<ArticleModel[]>;

  constructor(private articleService: ArticleService,
              public authService: AuthService,
              private router: Router,
              private titleService: Title) { }

  ngOnInit(): void {
    this.articles = this.articleService.getAllArticles('kinvey');
    this.titleService.setTitle( `My Articles` );
  }

  deleteArticle(id) {
    this.articleService.deleteArticle(id, 'kinvey')
      .subscribe(() => {
        this.articles = this.articleService.getAllArticles('kinvey');
      });
  }

  // getMyArticles() {
  // return this.articles.map(articles => articles.filter(a => a.author === this.authService.user));
  // }
}
