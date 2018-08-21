import { NgModule } from '@angular/core';
import { authComponents } from './index';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ...authComponents
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService
  ]
})

export class AuthModule { }
