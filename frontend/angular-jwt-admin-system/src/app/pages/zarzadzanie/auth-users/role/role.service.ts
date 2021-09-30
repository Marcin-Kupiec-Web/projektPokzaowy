import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from 'src/model/role';
import { iphost } from 'src/app/global-viable';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = iphost+'/systemApp/restControllerAppRole';
  }

  public findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + '/getRoles');
  }

  public addRola(rola: Role): Observable<any> {
    return this.http.post(this.usersUrl + '/addRoles', rola);
  }

  public updateRola(rola: Role): Observable<any> {
    return this.http.put(this.usersUrl + '/updateRoles', rola);
  }

  public removeRola(rola: Role): Observable<any> {
    return this.http.delete(this.usersUrl + '/deleteRoles' + '/' + rola.id);
  }

}
