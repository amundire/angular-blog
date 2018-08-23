import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { ArticleModel } from '../models/article.model';
import { Observable } from 'rxjs/index';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
  articles: Observable<ArticleModel[]>;
  searchParams: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private authService: AuthService) { }

  ngOnInit() {
    console.log(this.route.queryParams._value.search);
    this.articles = this.articleService.getAllArticles('kinvey');
    this.searchParams = this.route.queryParams._value.search;
  }

  deleteArticle(id) {
    this.articleService.deleteArticle(id, 'kinvey')
      .subscribe(() => {
        this.articles = this.articleService.getAllArticles('kinvey');
      });
  }
}
