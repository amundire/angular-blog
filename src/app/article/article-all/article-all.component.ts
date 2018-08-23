import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../article.service';
import {ArticleModel} from '../models/article.model';
import {Observable} from 'rxjs/index';
import {AuthService} from '../../authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-all',
  templateUrl: './article-all.component.html',
  styleUrls: ['./article-all.component.css']
})
export class ArticleAllComponent implements OnInit {
  articles: Object;

  constructor(private articleService: ArticleService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authService.user) {
      const fakeName = 'anonymous';
      const fakePw = 'anonymous';
      const data = {username: fakeName, password: fakePw};
      this.authService.login(data, 'basic').subscribe((res) => {
          localStorage.setItem('authtoken', res._kmd.authtoken);
          setInterval(1500, this.articles = this.articleService.getAllArticles('kinvey'));
        }
      );
    }
    this.articles = this.articleService.getAllArticles('kinvey');

  }

  deleteArticle(id): void {
    this.articleService.deleteArticle(id, 'kinvey')
      .subscribe(() => {
        this.articles = this.articleService.getAllArticles('kinvey');
      });
  }
}
