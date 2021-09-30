import { ThrowStmt } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private subject = new Subject<any>();
  private images!: any[];
  sendImages(source: any[]) {
      this.subject.next({ source: source});
  }

  clearImages() {
      this.subject.next();
  }

  getImages(): Observable<any> {
      return this.subject.asObservable();
  }


}
