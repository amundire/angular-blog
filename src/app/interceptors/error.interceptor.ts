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
        switch (err.status) {
          case 401:
            this.toastr.error(err.message, 'Warning!');
            break;
          case 400:
            const message = Object.keys(err.error.errors).map(e => err.error.errors[e]).join('\n');
            this.toastr.error(message, 'Error');
            break;
        }
        return throwError(err);
      }));
  }
}
