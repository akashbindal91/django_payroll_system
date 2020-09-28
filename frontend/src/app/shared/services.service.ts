import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  private subject = new Subject<any>();

  sendClickEvent(param) {
    this.subject.next(param);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
