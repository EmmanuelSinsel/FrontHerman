
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    // const token_admin: string | null = localStorage.getItem('token_admin');
    // const token_alumn: string | null = localStorage.getItem('token_alumn');
    // let request = req;

    // if (token_admin != null) {
    //   request = req.clone({
    //     setHeaders: {
    //       token_admin: `${ token_admin }`,
    //       token_alumn: ``
    //     }
    //   });
    // }
    // else if( token_alumn != null) {
    //   request = req.clone({
    //     setHeaders: {
    //       token_admin: ``,
    //       token_alumn: `${ token_admin }`
          
    //     }
    //   });
    // }

    return next.handle(req)
  }
}
