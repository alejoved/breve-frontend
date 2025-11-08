import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Company } from '../models/company';
import { options } from '../../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  async create(company: Company): Promise<Company> {
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

  async filterById(id: string): Promise<Company> {
    const observable = this.http.get(environment.host + "/api/company/" + id, options).pipe(
      map(response => response as Company));
    return await firstValueFrom(observable);
  }

  async login(email: string, password: string): Promise<Company> {
    const observable = this.http.get(environment.host + "/api/company/login/" + email + "/" + password , options).pipe(
      map(response => response as Company));
    return await firstValueFrom(observable);
  }

  setSesion(company: Company) {
    sessionStorage.setItem('sesion', JSON.stringify(company));
  }

  getSesion(): Company {
    const sesion = sessionStorage.getItem('sesion');
    return JSON.parse(sesion!);
  }

  cerrarSesion(){
    sessionStorage.removeItem('sesion');
  }
}