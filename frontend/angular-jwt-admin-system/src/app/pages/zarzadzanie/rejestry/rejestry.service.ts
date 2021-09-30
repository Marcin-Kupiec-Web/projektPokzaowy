import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rejestry } from 'src/model/rejestry';
import { iphost } from 'src/app/global-viable';
@Injectable({
  providedIn: 'root'
})
export class RejestryService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = iphost+'/systemApp/restControllerAppRejestry';
  }

  public findById(id: BigInteger): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/findRejestr/' + id);
  }

  public findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/getRejestrs');
  }

  public addRejestr(rejestr: Rejestry): Observable<any> {
    return this.http.post(this.url + '/saveRejestr', rejestr);
  }

}
