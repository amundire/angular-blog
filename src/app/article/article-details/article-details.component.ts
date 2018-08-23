import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/index';
import { ArticleModel } from '../models/article.model';
import { ArticleService } from '../article.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  model: Observable<ArticleModel>;
  _id: string;
  constructor(public articleService: ArticleService, private route: ActivatedRoute, private authService: AuthService) {
    this._id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.model = this.articleService.getArticleDetails(this._id, 'kinvey');
  }

  banUser(username) {
    this.authService.getByUsername({username}).then((res) => {
      const userId = res[0]._id;
      this.authService.deleteUser(userId);
    });
  }
}
