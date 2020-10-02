import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('request=>', request);

        return next.handle(request).pipe();

        // this.userDetail = this.commonservice.getLoggedUserDetail();

        // const token = localStorage.getItem('id_token');

        // if (token) {
        //     if (this.userDetail !== '') {
        //         if (new Date().getTime() < (this.userDetail.exp * 1000)) {
        //             req = req.clone({
        //                 setHeaders: {
        //                     Authorization: token
        //                 }
        //             });
        //         } else {
        //             localStorage.removeItem('access_token');
        //             localStorage.removeItem('id_token');
        //             this.commonservice.refreshToken(localStorage.getItem('username'), { refresh_token: localStorage.getItem('refresh_token') }).subscribe((token: any) => {
        //                 localStorage.setItem('access_token', token.access_token);
        //                 localStorage.setItem('id_token', token.id_token);
        //             }, err => {
        //                 // this.route.navigate(['/']);
        //             });
        //         }

        //     }

        // }
        // return next.handle(req);
    }
}
