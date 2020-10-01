import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SalaryService } from '../salary.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '@app/shared/services.service';

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


  constructor(private route: ActivatedRoute,
    private router: Router,
    private salaryService: SalaryService,
    private servicesService: ServicesService) {
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
        this.myform.patchValue({
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
    if (this.myform.valid) {
      this.salaryService.update({ search_key: this.searchCode, data: this.myform })
        .subscribe(response => {
          this.raise_success(`${this.searchCode} has been successfully updated`);
          this.router.navigate(['/']);

        }, (error: any) => {
          if ('error' in error && 'code' in (error.error)) {
            return this.raise_error(error.error.code[0]);
          } else if ('error' in error) {
            for (const key in error.error) { return this.raise_error('for ' + key.toUpperCase() + ' : ' + error.error[key][0]); }
          } else {
            return this.raise_warning('Either Data is not available or there is some issue from server. Try after some time..');
          }
        });

    } else {
      this.raise_warning(`some issue regarding submission of structure code ${this.searchCode}`);
    }
  }

  autoAddTotal() {
    // tslint:disable-next-line: max-line-length
    const totalVal = (parseFloat(this.basic.value) + parseFloat(this.hra.value) + parseFloat(this.pa.value) + parseFloat(this.ea.value) + parseFloat(this.da.value)).toFixed(2);

    this.myform.patchValue({
      total: isNaN(parseFloat(totalVal)) ? 0.00 : totalVal
    });
    // (this.total).value = isNaN(parseFloat(totalVal)) ? 0.00 : totalVal ;
    // tslint:disable-next-line: max-line-length
  }

  raise_error(message: any) {
    this.servicesService.sendClickEvent({ type: 'danger', msg: message, time: 5000 });
  }
  raise_success(message: string) {
    this.servicesService.sendClickEvent({ type: 'success', msg: message, time: 2000 });
  }
  raise_warning(message: string) {
    this.servicesService.sendClickEvent({ type: 'warning', msg: message, time: 3000 });
  }



}
