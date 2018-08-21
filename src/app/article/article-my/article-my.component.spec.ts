import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMyComponent } from './article-my.component';

describe('ArticleMyComponent', () => {
  let component: ArticleMyComponent;
  let fixture: ComponentFixture<ArticleMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
