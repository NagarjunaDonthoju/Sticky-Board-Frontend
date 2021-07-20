import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";



@Injectable()
export class HeaderInterceptor implements HttpInterceptor{

    constructor(
        private authService : AuthService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return this.authService.getIdToken().pipe(
            mergeMap(token =>{
                if(token){
                    
                    req = req.clone({
                        setHeaders : {
                            Authorization : `Bearer ${token}`
                        }
                    })
                }
                return next.handle(req);
            })
        );

    }
    
}