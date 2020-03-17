import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    let authenticatedRequest: HttpRequest<any> = req

    // If the request already provided an authorization header we just pass the
    // request on without tinkering with it.
    if (req.headers.get('Authorization') == null) {

      let accessToken = this.auth.getAccessToken()
      if (accessToken !== null)
        authenticatedRequest = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
    }

    return next.handle(authenticatedRequest).pipe(
      catchError(err => this.handleError(err))
    )
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl('/login')
      return of(err.message)
    }

    return throwError(err)
  }
}