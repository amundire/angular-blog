import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap((res: any) => {
        if (res instanceof HttpResponse && res.body._kmd.authtoken) {
          this.saveToken(res.body);
          this.toastr.success(res.body.message, 'Success');
          this.router.navigate(['/home//']);
        }

        if (res instanceof HttpResponse && res.body.success && res.url.endsWith('signup')) {
          this.toastr.success(res.body.message, 'Success');
          this.router.navigate(['/signin']);
        }

        // if (res instanceof HttpResponse && res.body.success && res.url.endsWith('create')) {
        //   this.toastr.success(res.body.message, 'Success');
        //   this.router.navigate(['/all']);
        // }
      }));
  }

  private saveToken(data): void {
    localStorage.setItem('currentUser', JSON.stringify({
      'username': data.username,
      'token': data._kmd.authtoken,
      'isAdmin': data.isAdmin
    }))
  }
}
