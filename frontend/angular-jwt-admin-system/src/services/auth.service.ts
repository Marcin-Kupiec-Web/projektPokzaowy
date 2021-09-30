import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { MyToken } from 'src/app/intefaces/token';
import { RejestryService } from 'src/app/pages/zarzadzanie/rejestry/rejestry.service';
import { RejestrySave } from 'src/app/pages/zarzadzanie/rejestry/rejestry-save';
import { iphost } from 'src/app/global-viable';
import { UsersService } from 'src/app/pages/zarzadzanie/auth-users/users/users.service';
import { noUndefined } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8081'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_PASS_SESSION_ATTRIBUTE_NAME = 'authenticatedPass';
  public decodedToken!: any;
  private grandAuthor: any = {};
  private rejestrySave!: RejestrySave;

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UsersService,
              private rejestryService: RejestryService
              ) {
                this.grandAuthor = {
                  '/users': {grupa: null, role: ['ADMIN'], uprawnienia: null},
                  '/roles': {grupa: null, role: ['ADMIN'], uprawnienia: null},
                  '/privileges': {grupa: null, role: ['ADMIN'], uprawnienia: null},
                  '/groups': {grupa: null, role: ['ADMIN'], uprawnienia: null},
                  '/rejestry': {grupa: null, role: ['ADMIN'], uprawnienia: null}
                };
                this.decodedToken = this.getDecodeToken();
                this.rejestrySave = new RejestrySave(this, this.rejestryService);
              }

  // this.crypt.encryptUsingAES256( password)
  authenticationService(username: string, password: string): Observable<boolean> {

    return this.http.post<{token: string}>(iphost+'/systemApp/authenticate',
    // tslint:disable-next-line:object-literal-shorthand
    {username: username, password: password})
      .pipe(
        map(result => {
          sessionStorage.setItem('access_token', result.token);
          const token = result.token;
          this.decodedToken = jwt_decode<MyToken>(token);
          this.rejestrySave.logRejestr('logowanie', this.getDecodeToken().sub, null);
          return true;
        })
      );
  }

  logout(): void {
     if (this.loggedIn){
     this.rejestrySave.logRejestr('wylogowanie', this.getDecodeToken().sub, null);
     sessionStorage.removeItem('access_token');

     sessionStorage.clear();
     this.decodedToken = null;
     }
  }

  public get loggedIn(): boolean {
    return (sessionStorage.getItem('access_token') !== null);
  }

// privileges

hasRole(role: string[]): boolean {
  if (this.decodedToken != null) {
    for (const i of role){
       if (this.decodedToken.role.find((rol: string) => rol === i) != null) {
         return true;
       }
      }
    }
  return false;
}

hasPrivilege(privileges: string[]): boolean {
  if (this.decodedToken != null) {
    for (const i of privileges){
       if (this.decodedToken.privileges.find((priv: string) => priv === i) != null) {
         return true;
       }
      }
    }
  return false;
}

levelPrivilege(roles: any[], gt: any, lt: any): boolean {
if(gt)
  return roles.some((val: { poziomUprawnien: number; }) => val.poziomUprawnien > gt);
if(lt)
  return roles.some((val: { poziomUprawnien: number; }) => val.poziomUprawnien < lt);

  return false
}

redirectIfforbidenPage(): void {
  if (this.grandAuthor[this.router.url] !== undefined && this.decodedToken === null) {
    this.router.navigate(['/login']);
}
}

  getDecodeToken(): any {
      const token = sessionStorage.getItem('access_token');
      const tokenDecode = token !== null ? jwt_decode<MyToken>(token) : null;
      return tokenDecode;
    }

    getUserAuthentic(): Observable<any[]> {

      return this.userService.findAuthenticUserByName(this.decodedToken.sub);

    }

}
