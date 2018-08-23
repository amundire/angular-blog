import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { ArticleModel } from '../models/article.model';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  bindingModel: ArticleModel;

  constructor(private route: ActivatedRoute,
            private articleService: ArticleService,
            private router: Router) { }

  ngOnInit() {
    this.articleService.getArticleById(
      this.route.snapshot.params['id'], 'kinvey')
      .subscribe(data => {
      this.bindingModel = data;
    });
  }

  edit() {
    this.articleService.editArticle(this.bindingModel._id, this.bindingModel, 'kinvey')
      .subscribe(data => {
        this.router.navigate(['article/all']);
      });
  }
}
