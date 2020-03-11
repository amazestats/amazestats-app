import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  private url = 'http://localhost:80/api'

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      url: `${this.url}${req.url}`
    }))
  }
}
