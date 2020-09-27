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
    this.code = new FormControl('', Validators.required);
    this.basic = new FormControl('', [Validators.required]);
    this.hra = new FormControl('', Validators.required);
    this.pa = new FormControl('', Validators.required);
    this.ea = new FormControl('', Validators.required);
    this.da = new FormControl('', Validators.required);
    this.total = new FormControl('');
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
    console.log(this.myform);
    if (this.myform.valid) {

      console.log('Form Submitted!');

      this.salaryService.create(this.myform)
        .subscribe(response => {
          console.log(response);
          this.raise_success(`${this.code.value} has been successfully created`);
          this.router.navigate(['/']);
        });

    } else {
      this.raise_error(`some issue regarding submission of structure code ${this.code.value}`);
      console.log('Form not Submitted!');
    }
  }

  autoAddTotal() {
    // tslint:disable-next-line: max-line-length
    let totalVal = (parseFloat(this.basic.value) + parseFloat(this.hra.value) + parseFloat(this.pa.value) + parseFloat(this.ea.value) + parseFloat(this.da.value)).toFixed(2);

    this.myform.setValue({
      total: isNaN(parseFloat(totalVal)) ? 0.00 : totalVal
    });
  }

  raise_error(message) {
    this.servicesService.sendClickEvent({ type: 'danger', msg: message, time: 10000 });
  }
  raise_success(message) {
    this.servicesService.sendClickEvent({ type: 'success', msg: message, time: 3000 });
  }
  raise_warning(message) {
    this.servicesService.sendClickEvent({ type: 'warning', msg: message, time: 8000 });
  }

}
