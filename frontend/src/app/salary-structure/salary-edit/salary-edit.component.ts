import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SalaryService } from '../salary.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salary-edit',
  templateUrl: './salary-edit.component.html',
  styleUrls: ['./salary-edit.component.css']
})
export class SalaryEditComponent implements OnInit {
  searchCode: string;
  myform: any;
  code: FormControl;
  basic: FormControl;
  hra: FormControl;
  pa: FormControl;
  ea: FormControl;
  da: FormControl;
  total: FormControl;
  formDetails: any;


  constructor(private route: ActivatedRoute, private router: Router, private salaryService: SalaryService) {
    this.searchCode = this.route.snapshot.paramMap.get('code');
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.getStructureDetails();
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

  getStructureDetails() {
    this.salaryService.getStructureDetails({ search_key: this.searchCode })
      .subscribe(response => {
        this.myform.setValue({
          code: response.code,
          basic: response.basic,
          hra: response.hra,
          pa: response.pa,
          ea: response.ea,
          da: response.da,
          total: response.total,
        });
      });
  }

  onSubmit() {
    console.log(this.myform);
    if (this.myform.valid) {

      console.log('Form Submitted!');

      this.salaryService.update( {search_key : this.searchCode  , data : this.myform})
        .subscribe(response => {
          console.log(response);
        });

    } else {
      console.log('Form not Submitted!');
    }
  }

  autoAddTotal() {
    // tslint:disable-next-line: max-line-length
    let totalVal = (parseFloat(this.basic.value) + parseFloat(this.hra.value) + parseFloat(this.pa.value) + parseFloat(this.ea.value) + parseFloat(this.da.value)).toFixed(2);

    this.total.value = isNaN(parseFloat(totalVal)) ? 0.00 : totalVal ;
    // tslint:disable-next-line: max-line-length
  }



}
