import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { APP_KEY, APP_SECRET } from 'src/app/kinvey.tokens';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        const headers: { Authorization?: string } = { };

        if (!req.headers.has('Authorization')) {
    
          if (this.authService.isAuthenticated()) {
            headers.Authorization = 'Kinvey ' + this.authService.token;
          } else {
            headers.Authorization = 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET);
          }
        }
    
        const newReq = req.clone({ setHeaders: headers });
   
        return next.handle(newReq)
        .pipe(
            tap((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse && req.url.endsWith('login')) {
                    this.authService.saveUserInfo(event.body);
                }
            })
        );
    }  
}