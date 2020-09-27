import { Component, OnInit } from '@angular/core';
import { ServicesService } from '@app/shared/services.service';
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

  constructor(private salaryService: SalaryService, private servicesService: ServicesService) {
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
      this.salaryService.delete(item).subscribe((response: any) => {
        this.raise_success(`structure with code ${item.code} has been successfully deleted`);
        this.salaryStructureRequest();
      });
    } else {
      this.raise_error(`Some issue occured while deleting code of ${item.code}. PLease try again.`);
    }
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
