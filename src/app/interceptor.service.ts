import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true});
    return next.handle(request).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          this.router.navigate(['/sign-in']);
        }
        return throwError(err);
      })
    );
  }
}
