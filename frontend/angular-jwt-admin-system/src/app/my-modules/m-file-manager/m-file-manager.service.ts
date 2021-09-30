import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iphost } from '../../global-viable';
import { ImageDetailsSave } from './m-file-manager.component';

@Injectable({
  providedIn: 'root'
})
export class MFileManagerService {

  private Url: string;
  constructor(private http: HttpClient) {
     this.Url = iphost+'/systemApp/restControllerAppAnnouncements';
  }

  sendAnnouncementImage(image: FormData):  Observable<any> {
    return this.http.post(this.Url + '/files', image);
  }
  public removeAnnouncementImage(idImg: number): Observable<any> {
    return this.http.delete(this.Url + '/deleteAnnouncementsImage' + '/' + idImg);
  }
  public updateImgDetails(sendImgDetails: ImageDetailsSave): Observable<any> {
    return this.http.put(this.Url + '/updateImgDetails', sendImgDetails);
  }

  /*
    fetchAnnouncementImage(announcementId: number): Observable<Blob> {
    return this.http.get(this.Url+"/announcements/photo?id="+announcementId, { responseType: 'blob' });
  }
  */
}
