import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { AuthService } from '../../authentication/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  model: Object;
  _id: string;

  constructor(public articleService: ArticleService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private titleService: Title) {
    this._id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.articleService.getArticleDetails(this._id, 'kinvey').subscribe((res) => {
        console.log(res);
        this.model = res;
        this.titleService.setTitle(`${res.title}`);
      }
    );
  }

  banUser(username) {
    this.authService.getByUsername({username}).then((res) => {
      const userId = res[0]._id;
      this.authService.deleteUser(userId);
    });
  }

  deleteArticle(id): void {
    this.articleService.deleteArticle(id, 'kinvey')
      .subscribe(() => {
        this.router.navigate(['article/all']);
      });
  }
}
