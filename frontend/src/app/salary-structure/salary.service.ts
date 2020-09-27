import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { SalaryStructure } from './SalaryStructure'
@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }

  getAll(params: { page: any; }) {
    let extraParams = '';
    if (params) {
      if ('page' in params) {
        extraParams = '?page=' + params.page;
      }
    }
    return this.http.get<SalaryStructure>(`${environment.apiUrl}/salary/list/` + extraParams);
  }

  delete(item: { code: any; }) {
    let searchKey: string;
    if ('code' in item) {
      searchKey = item.code;
    }
    return this.http.delete(`${environment.apiUrl}/salary/delete/` + searchKey);
  }

  create(params: { getRawValue: () => any; }) {
    return this.http.post(`${environment.apiUrl}/salary/add/`, (params.getRawValue()));
  }

  update(params: { getRawValue: () => any; }) {
    return this.http.post(`${environment.apiUrl}/salary/add/`, (params.getRawValue()));
  }
}
