import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }

  private subject = new Subject<any>();

  sendClickEvent(param) {
    console.log('sendClickEvent', param);
    this.subject.next(param);
  }
  getClickEvent(): Observable<any> {
    console.log('getClickEvent');
    return this.subject.asObservable();
  }
}
