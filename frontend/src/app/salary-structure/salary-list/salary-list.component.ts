import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../salary.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {

  salaryStructure: any;
  config: any;
  pagenumber: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;

  constructor(private salaryService: SalaryService) {
    this.pagenumber = 1;
    this.itemsPerPage = undefined;
    this.totalPages = 3;
    this.salaryStructure = { data: [] };
    this.salaryStructureRequest();
  }

  ngOnInit(): void {
  }

  pageChanged() {
    this.salaryStructureRequest();
  }

  salaryStructureRequest() {
    this.salaryService.getAll({ page: this.pagenumber }).subscribe(response => {
      if ('results' in response) {
        this.salaryStructure.data = response.results;
      }

      if ('count' in response) {
        this.itemsPerPage = this.itemsPerPage ? this.itemsPerPage : (this.salaryStructure.data).length;
        this.totalItems = response.count;
        this.totalPages = this.totalItems / this.itemsPerPage;
      }
    });
  }

  deleteStructure(item: any) {
    if ('code' in item) {
      this.salaryService.delete(item)
        .subscribe((response: any) => {
          console.log(response);
        });
    } else {
      return false;
    }
  }
}
