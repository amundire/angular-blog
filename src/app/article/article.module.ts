import { NgModule } from '@angular/core';
import { ArticleComponents } from './index';
import { FormsModule } from '@angular/forms';
import { ArticleService } from './article.service';
import { RouterModule } from '@angular/router';
import { ArticleRoutingModule } from './article-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ...ArticleComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ArticleRoutingModule,
  ],
  providers: [
    ArticleService
  ],
  exports: [
    CommonModule
  ]
})

export class ArticleModule { }
