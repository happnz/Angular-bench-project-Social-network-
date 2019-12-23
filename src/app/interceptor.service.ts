import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorService} from './error/error.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true});
    return next.handle(request).pipe(
      catchError((err, caught) => {
        this.errorService.handleHttpError(err);
        return throwError(err);
      })
    );
  }
}
