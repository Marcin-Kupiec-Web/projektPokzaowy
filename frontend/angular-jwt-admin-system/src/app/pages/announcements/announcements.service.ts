import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcements } from 'src/model/announcements';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private Url: string;

  constructor(private http: HttpClient) {
     this.Url = 'http://localhost:8080/systemApp/restControllerAppAnnouncements';
  }
  public findAll(): Observable<Announcements[]> {
    return this.http.get<Announcements[]>(this.Url + '/getAnnouncements');
  }
  public addAnnouncement(anno: Announcements): Observable<any> {
    return this.http.post(this.Url + '/addAnnouncements', anno);
  }

  public updateAnnouncement(anno: Announcements): Observable<any> {
    return this.http.put(this.Url + '/updateAnnouncements', anno);
  }

  public removeAnnouncement(anno: Announcements): Observable<any> {
    return this.http.delete(this.Url + '/deleteAnnouncements' + '/' + anno.id);
  }
}
