import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { GetRoomsService } from './get-rooms.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',

                'X-Token': localStorage.getItem('XToken')
            }
        });
        return next.handle(request);
    }
}






