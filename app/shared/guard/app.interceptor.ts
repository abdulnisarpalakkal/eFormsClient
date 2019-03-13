import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpEvent, HttpErrorResponse, HttpUserEvent} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';
 import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {MessageService} from '../services';


// import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserMsg } from '../../model/user-msg.model';
// import { Observable, throwError } from 'rxjs';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {
  msgOb:UserMsg=new UserMsg();
  constructor(private token: TokenStorage, private router: Router, private messageService:MessageService) { }

 


  intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
    }
      
      return next.handle(authReq)
      
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          if(authReq.method!='GET')
            this.handleSuccess();
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            this.router.navigate(['/login']);
          }
         
        }
      })
      .pipe(catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        
        this.handleError(error);
        return of(error);
      }) as any);

    

    
  }
  private handleSuccess(){
    this.msgOb.success=true;
    this.msgOb.msg_class="success";
    this.msgOb.msg="Successfully completed"
    this.messageService.sendMessage(this.msgOb);
  }
  private handleError(err: HttpErrorResponse): Observable<any> {

    let errorMessage = '';
    if(err.error.message)
        errorMessage = `Error: ${err.error.message}`;
    else 
      errorMessage=`Error Code: ${err.status}\nMessage: ${err.message}`;

      this.msgOb.success=false;
      this.msgOb.msg_class="danger";
      this.msgOb.msg=errorMessage
      
    // if (err.error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage = `Error: ${err.error.message}`;
    // } else {
    //   // server-side error
    //   errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    // }

    this.messageService.sendMessage(this.msgOb);
    throw this.msgOb;
  }

}
