import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { MyToken } from 'src/app/intefaces/token';
import { AuthenticationService } from 'src/services/auth.service';

export class UserToken {
  token!: MyToken;
}

export class Permiss {
  private grandAuthor: any = {};
  constructor(){
    // url: {grupa, role[], uprawnienia}
    this.grandAuthor = {
      users: {grupa: null, role: ['ADMIN'], uprawnienia: null},
      roles: {grupa: null, role: ['ADMIN'], uprawnienia: null},
      privileges: {grupa: null, role: ['ADMIN'], uprawnienia: null},
      groups: {grupa: null, role: ['ADMIN'], uprawnienia: null},
      rejestry: {grupa: null, role: ['ADMIN'], uprawnienia: null}
    };

  }

  canActivate(user: UserToken, id: string, url: string): boolean {

  if (user.token) {
      const rola = user.token.role;

      const uprawnienia = user.token.privileges;
      if (rola != null) {
         if (this.grandAuthor[url] && this.grandAuthor[url].role !== null) {
          if (uprawnienia != null) {
            if (this.grandAuthor[url] && this.grandAuthor[url].uprawnienia !== null) {
              return rola.some(val => this.grandAuthor[url].role.includes(val)) &&
              uprawnienia.some(val => this.grandAuthor[url].uprawnienia.includes(val));
            }
            else {
              return rola.some(val => this.grandAuthor[url].role.includes(val));
            }
          }
         }
       }
    }
    else if (this.grandAuthor[url]){
      return false;
    }
  return true;
  }
}

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private permissions: Permiss, private currentUser: UserToken, private authenticationService: AuthenticationService) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const tokenDecode = this.authenticationService.getDecodeToken();
    this.currentUser.token = tokenDecode;

    return this.permissions.canActivate(this.currentUser, route.params.id, route.url.toString());
  }
}
