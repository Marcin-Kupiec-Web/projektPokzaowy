import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Privilege } from 'src/model/privilege';
import { iphost } from 'src/app/global-viable';
@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = iphost+'/systemApp/restControllerAppPrivileges';
  }

  public findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + '/getPrivileges');
  }

  public updatePrivilege(privilege: Privilege): Observable<any> {
    return this.http.put(this.usersUrl + '/updatePrivileges', privilege);
  }

  public addPrivilege(privilege: Privilege): Observable<any> {
    return this.http.post(this.usersUrl + '/addPrivileges', privilege);
  }
  public removePrivlege(privilege: Privilege): Observable<any> {
    return this.http.delete(this.usersUrl + '/deletePrivileges' + '/' + privilege.id);
  }
}
