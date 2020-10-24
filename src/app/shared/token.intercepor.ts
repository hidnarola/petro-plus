import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
        );
    }
    // userDetail: any;
    // constructor(router: Router, activatedRoute: ActivatedRoute) {

    // }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     this.userDetail = JSON.parse(localStorage.getItem('userData'));

    //     if (localStorage.getItem('userData')) {
    //         if (this.userDetail.TokenID._text !== '') {
    //             console.log('here : token function=======>', this.userDetail.TokenID._text);

    //             req = req.clone({
    //                 setHeaders: {
    //                     StrToken: this.userDetail.TokenID._text
    //                 }
    //             });
    //         } else {

    //             // this.router.navigate([' ']);
    //             localStorage.removeItem('userData');

    //         }
    //     }





    //     return next.handle(req);
    // }
}
