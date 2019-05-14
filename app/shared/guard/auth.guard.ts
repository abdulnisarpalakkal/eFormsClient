import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private token: TokenStorage,private router: Router) {}

    canActivate() {
        if (this.token.getToken() != null) {
            return true;
        }
            

        this.token.signOut();
        return false;
    }
}
