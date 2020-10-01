import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ServicesService } from '@app/shared/services.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  type = 'success';
  duration = 0;
  clickEventsubscription: Subscription;


  constructor(private servicesService: ServicesService) {
    this.clickEventsubscription = this.servicesService.getClickEvent().subscribe((param) => {
      this.type = param.type;
      this.successMessage = param.msg;
      this.duration = param.time;
      this.alertMessage();
    });

  }


  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, this.duration);

    this._success.subscribe(message => {
      return this.successMessage = message;
    });

  }

  public alertMessage() {
    this._success.pipe(
      debounceTime(this.duration)
    ).subscribe(() => this.successMessage = '');
    this._success.next(this.successMessage);

  }

}
