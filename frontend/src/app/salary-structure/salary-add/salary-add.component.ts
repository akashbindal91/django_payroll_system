import { SalaryService } from './../salary.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '@app/shared/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-salary-add',
  templateUrl: './salary-add.component.html',
  styleUrls: ['./salary-add.component.css']
})
export class SalaryAddComponent implements OnInit {
  myform: any;
  code: FormControl;
  basic: FormControl;
  hra: FormControl;
  pa: FormControl;
  ea: FormControl;
  da: FormControl;
  total: FormControl;

  constructor(private salaryService: SalaryService, private servicesService: ServicesService, private router: Router) {

  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.code = new FormControl(null, Validators.required);
    this.basic = new FormControl(null, [Validators.required]);
    this.hra = new FormControl(null, Validators.required);
    this.pa = new FormControl(null, Validators.required);
    this.ea = new FormControl(null, Validators.required);
    this.da = new FormControl(null, Validators.required);
    this.total = new FormControl(null);
  }

  createForm() {
    this.myform = new FormGroup({
      code: this.code,
      basic: this.basic,
      hra: this.hra,
      pa: this.pa,
      ea: this.ea,
      da: this.da,
      total: this.total
    });
  }


  onSubmit() {
    if (this.myform.valid) {
      this.salaryService.create(this.myform)
        .subscribe(response => {
          this.raise_success(`${this.code.value} has been successfully created`);
          this.router.navigate(['/']);
        }, (error: any) => {
          if (('error' in error) && ('code' in (error.error))) {
            return this.raise_error(error.error.code[0]);
          } else if ('error' in error) {
            for (const key in error.error) { return this.raise_error('for ' + key.toUpperCase()  + ' : ' + error.error[key][0]); }
          } else {
            return this.raise_warning('Either Data is not available or there is some issue from server. Try after some time..');
          }
        });
    } else {
      this.raise_error(`There might be some missing values. submission of structure code \'${this.code.value}\'`);
    }
  }

  autoAddTotal() {
    // tslint:disable-next-line: max-line-length
    const totalVal = (parseFloat(this.basic.value) + parseFloat(this.hra.value) + parseFloat(this.pa.value) + parseFloat(this.ea.value) + parseFloat(this.da.value)).toFixed(2);

    this.myform.patchValue({
      total: isNaN(parseFloat(totalVal)) ? 0.00 : totalVal
    });
  }

  raise_error(message: string) {
    this.servicesService.sendClickEvent({ type: 'danger', msg: message, time: 5000 });
  }
  raise_success(message: string) {
    this.servicesService.sendClickEvent({ type: 'success', msg: message, time: 2000 });
  }
  raise_warning(message: string) {
    this.servicesService.sendClickEvent({ type: 'warning', msg: message, time: 3000 });
  }

}
