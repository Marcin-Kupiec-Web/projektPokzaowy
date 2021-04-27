import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // alert(this.authenticationService.getLoggedInUserName());

        const currentUser = localStorage.getItem('access_token');
       // const isApiUrl = request.url.startsWith(config.apiUrl);
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${currentUser}`
                }
              });
        }

        return next.handle(request);
    }
}
