import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rejestry } from '../model/rejestry';

@Injectable({
  providedIn: 'root'
})
export class RejestryService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/systemApp/restControllerAppRejestry';
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
