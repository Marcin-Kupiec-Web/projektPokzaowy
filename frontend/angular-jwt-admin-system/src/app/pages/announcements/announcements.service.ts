import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcements } from 'src/model/announcements';
import { iphost } from 'src/app/global-viable';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private Url: string;
  constructor(private http: HttpClient) {
     this.Url = iphost+'/systemApp/restControllerAppAnnouncements';
  }
  public findAll(): Observable<Announcements[]> {
    return this.http.get<Announcements[]>(this.Url + '/getAnnouncements');
  }
  public findById(id: number): Observable<Announcements> {
    return this.http.get<Announcements>(this.Url + '/getAnnouncementById/'+id);
  }
  public findByWord(word: any): Observable<Announcements[]> {
    return this.http.get<Announcements[]>(this.Url + '/getAnnouncementByWord/'+word);
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
