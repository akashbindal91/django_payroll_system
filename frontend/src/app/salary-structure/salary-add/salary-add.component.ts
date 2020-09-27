import { SalaryService } from './../salary.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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

  constructor(private salaryService: SalaryService) {

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

      console.log("Form Submitted!");

      this.salaryService.create(this.myform)
        .subscribe(response => {
          console.log(response);
        });

    } else {
      console.log("Form not Submitted!");
    }
  }

  autoAddTotal() {
    // tslint:disable-next-line: max-line-length
    var totalVal = (parseFloat(this.basic.value) + parseFloat(this.hra.value) + parseFloat(this.pa.value) + parseFloat(this.ea.value) + parseFloat(this.da.value)).toFixed(2);

    this.total.value = isNaN(parseFloat(totalVal)) ? 0.00 : totalVal ;
    // tslint:disable-next-line: max-line-length
  }

}
