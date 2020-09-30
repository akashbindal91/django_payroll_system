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
    this.itemsPerPage = 5;
    this.totalPages = 1;
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
      if ('count' in response) {
        if (response.count < 1) {
          this.salaryStructure.data = [];
          return this.raise_warning('No data is available. create one and then try again.');
        }
        this.itemsPerPage = this.itemsPerPage ? this.itemsPerPage : (this.salaryStructure.data).length;
        this.totalItems = response.count;
        this.totalPages = this.totalItems / this.itemsPerPage;
      }
      if ('results' in response) {
        this.salaryStructure.data = response.results;
      }
    }, (error: any) => {
      if ('error' in error && 'code' in (error.error)) {
        return this.raise_error(error.error.code[0]);
      } else {
        return this.raise_warning('Either Data is not available or there is some issue from server. Try after some time..');
      }
    });
  }

  deleteStructure(item: any) {
    if ('code' in item) {
      this.salaryService.delete(item).subscribe((response: any) => {
        this.raise_success(`structure with code ${item.code} has been successfully deleted`);
        this.salaryStructureRequest();
      }, (error: any) => {
        this.salaryStructureRequest();
        return this.raise_warning('Either Data is not available or there is some issue from server. Try after some time..');
      });
    } else {
      this.raise_error(`Some issue occured while deleting code of ${item.code}. PLease try again.`);
    }
  }

  raise_error(message: string) {
    this.servicesService.sendClickEvent({ type: 'danger', msg: message, time: 10000 });
  }
  raise_success(message: string) {
    this.servicesService.sendClickEvent({ type: 'success', msg: message, time: 2000 });
  }
  raise_warning(message: string) {
    this.servicesService.sendClickEvent({ type: 'warning', msg: message, time: 3000 });
  }
}
