import { Injectable } from '@angular/core';
import { Message } from '../_models/message';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private authService: AuthService,
                private router: Router, private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
           return this.userService.getMessages(this.authService.decodedToken.nameid, 
                    this.pageNumber, this.pageSize, this.messageContainer).pipe(
               catchError(error => {
                   this.alertify.error('Problem retrieving data');
                   this.router.navigate(['/home']);
                   return of(null);
               })
           )
        }
}
