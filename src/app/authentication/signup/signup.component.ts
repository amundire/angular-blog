import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../models/signup.model';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: SignUpModel;

  constructor(private authService: AuthService,
              private router: Router,
              private titleService: Title) {
    this.model = new SignUpModel('', '', '');
  }

  ngOnInit() {
    this.titleService.setTitle( `Sign Up` );
  }

  signUp() {
    this.authService
      .register(this.model, 'basic')
      .subscribe();
  }
}
