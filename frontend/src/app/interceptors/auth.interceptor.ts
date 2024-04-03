import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { RegisterService } from '../services/register.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    refresh = false;

  constructor(private authService: RegisterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.authService.accessToken}`
        }
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        // Unauthenticated
        if (err.status === 500 && !this.refresh){
            this.refresh = true;

            return this.authService.refresh().pipe(
                switchMap((res: any) => {
                    this.authService.accessToken = res.token;
                    // Create a new request with new access token
                    return next.handle(request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${this.authService.accessToken}`
                        }
                    }))
                })
            )
        }
        
        this.refresh = false;
        return throwError(() => err);
    }))

  }
}
