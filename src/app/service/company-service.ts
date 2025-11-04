import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Company } from '../model/company';
import { options } from '../../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  async crear(company: Company): Promise<Company> {
    const observable = this.http.post(environment.host + "/api/company", company, options).pipe(
      map(response => response as Company));
    return await firstValueFrom(observable);
  }

  async update(company: Company): Promise<Company> {
    const observable = this.http.patch(environment.host + "/api/company", company, options).pipe(
      map(response => response as Company));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Company[]> {
    const observable = this.http.get(environment.host + "/api/company", options).pipe(
      map(response => response as Company[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: number): Promise<Company> {
    const observable = this.http.get(environment.host + "/api/company/" + id, options).pipe(
      map(response => response as Company));
    return await firstValueFrom(observable);
  }
}