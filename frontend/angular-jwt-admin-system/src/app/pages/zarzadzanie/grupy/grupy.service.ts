import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupa } from 'src/model/grupa';
import { iphost } from 'src/app/global-viable';
@Injectable({
  providedIn: 'root'
})
export class GrupaService {
  private Url: string;
  constructor(private http: HttpClient) {
     this.Url = iphost+'/systemApp/restControllerAppGrupa';
  }

  public findAll(): Observable<Grupa[]> {
    return this.http.get<Grupa[]>(this.Url + '/getGrups');
  }
  public findById(id: number): Observable<Grupa[]> {
    return this.http.get<Grupa[]>(this.Url + '/getGroup' + '/' + id);
  }
  public addGrupa(grupa: Grupa): Observable<any> {
    return this.http.post(this.Url + '/addGrups', grupa);
  }

  public updateGrupa(grupa: Grupa): Observable<any> {
    return this.http.put(this.Url + '/updateGrups', grupa);
  }

  public removeGrupa(grupa: Grupa): Observable<any> {
    return this.http.delete(this.Url + '/deleteGrups' + '/' + grupa.id);
  }

}
