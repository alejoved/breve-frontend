import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Business } from '../models/business';
import { options } from '../../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  async create(business: Business): Promise<Business> {
    const observable = this.http.post(environment.host + "/api/business", business, options).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async update(business: Business): Promise<Business> {
    const observable = this.http.patch(environment.host + "/api/business", business, options).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Business[]> {
    const observable = this.http.get(environment.host + "/api/business", options).pipe(
      map(response => response as Business[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Business> {
    const observable = this.http.get(environment.host + "/api/business/" + id, options).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async login(email: string, password: string): Promise<Business> {
    const observable = this.http.get(environment.host + "/api/business/login/" + email + "/" + password , options).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  setSession(business: Business) {
    sessionStorage.setItem('sesion', JSON.stringify(business));
  }

  getSession(): Business {
    const sesion = sessionStorage.getItem('sesion');
    return JSON.parse(sesion!);
  }

  closeSession(){
    sessionStorage.removeItem('sesion');
  }
}