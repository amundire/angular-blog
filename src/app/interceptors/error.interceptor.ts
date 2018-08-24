import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err) => {
        let message = '';
        switch (err.status) {
          case 401:
            this.toastr.error(err.error.description, 'Error');
            break;
          case 400:
            message = Object.keys(err.error.errors).map(e => err.error.errors[e]).join('\n');
            this.toastr.error(message, 'Error');
            break;
          case 409:
            message = err.error.description;
            console.log(typeof err);
            this.toastr.error(message, 'Error');
            break;
        }
        return throwError(err);
      }));
  }
}
