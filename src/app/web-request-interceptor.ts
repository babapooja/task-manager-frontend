import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  refreshingAccessToken: boolean = false;
  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // handle the request
    request = this.addAuthHeader(request);
    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // unauthorized user
          // redirect to login page
          // refresh the access-token
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            }),
            catchError((err) => {
              console.log('err', err);
              this.authService.logout();
              return empty();
            })
          );
        }
        return throwError(err);
      })
    );
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          //this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;

      // we want to call a method in auth service to send a request to refresh access token
      return this.authService.getNewAccessToken().pipe(
        // tap observes the response and not execute the observable
        tap(() => {
          this.refreshingAccessToken = false;
          console.log('Access token refreshed');
        })
      );
    }
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
    }
    return request;
  }
}
