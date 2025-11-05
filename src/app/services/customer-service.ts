import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { options } from '../../constants';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  async crear(customer: Customer): Promise<Customer> {
    const observable = this.http.post(environment.host + "/api/customer", customer, options).pipe(
      map(response => response as Customer));
    return await firstValueFrom(observable);
  }

  async update(customer: Customer): Promise<Customer> {
    const observable = this.http.patch(environment.host + "/api/customer", customer, options).pipe(
      map(response => response as Customer));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Customer[]> {
    const observable = this.http.get(environment.host + "/api/customer", options).pipe(
      map(response => response as Customer[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Customer> {
    const observable = this.http.get(environment.host + "/api/customer/" + id, options).pipe(
      map(response => response as Customer));
    return await firstValueFrom(observable);
  }
}