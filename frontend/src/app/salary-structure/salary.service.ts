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
    const baseUrl = `${environment.apiUrl}/salary/list/`;
    if (params) {

      if ('page' in params) {
        extraParams = '?page=' + params.page;
      }

    }
    return this.http.get<SalaryStructure>(baseUrl + extraParams);
  }

  getStructureDetails(params: { search_key: string; }) {
    let baseUrl = `${environment.apiUrl}/salary/list/`;
    if (params) {

      if ('search_key' in params) {
        baseUrl = baseUrl + params.search_key;
      }
    }
    return this.http.get<any>(baseUrl);
  }

  delete(item: { code: any; }) {
    let searchKey: string;
    if ('code' in item) {
      searchKey = item.code;
    }
    return this.http.delete(`${environment.apiUrl}/salary/delete/` + searchKey);
  }

  create(params: { getRawValue: () => any; }) {
    return this.http.post<any>(`${environment.apiUrl}/salary/add/`, (params.getRawValue()));
  }

  update(params: { search_key?: string; data?: any; getRawValue?: any; }) {
    let baseUrl = `${environment.apiUrl}/salary/edit/`;
    baseUrl += params.search_key;


    return this.http.put(baseUrl, ((params.data).getRawValue()));
  }
}
