import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../salary.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {

  constructor(private salaryService: SalaryService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.salaryService.getAll().subscribe(response => {
      console.log(response);
      // this.loading = false;
      // this.users = users;
    });
  }

}
