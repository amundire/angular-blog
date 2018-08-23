import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleAllComponent } from './article-all/article-all.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleMyComponent } from './article-my/article-my.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleSearchComponent } from './article-search/article-search.component';

const articleRoutes: Routes = [
  {path: 'all', component: ArticleAllComponent },
  {path: 'create', component: ArticleCreateComponent},
  {path: 'my', component: ArticleMyComponent},
  {path: 'details/:id', component: ArticleDetailsComponent},
  {path: 'edit/:id', component: ArticleEditComponent},
  {path: 'search', component: ArticleSearchComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class ArticleRoutingModule { }
