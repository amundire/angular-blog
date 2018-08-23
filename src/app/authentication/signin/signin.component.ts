import { Component, OnInit } from '@angular/core';
import { SignInModel } from '../models/signin.model';
import { AuthService } from '../auth.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: SignInModel;

  constructor(private authService: AuthService,
              private titleService: Title) {
    this.model = new SignInModel('', '');
  }

  ngOnInit() {
    this.titleService.setTitle( `Sign In` );
  }

  signIn() {
    this.authService
      .login(this.model, 'basic')
      .subscribe();
  }

}
