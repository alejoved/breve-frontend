import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Business } from '../models/business';
import { optionsAuth, optionsBasic } from '../../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  async create(business: Business): Promise<Business> {
    const observable = this.http.post(environment.host + "/api/business", business, optionsAuth).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async update(business: Business): Promise<Business> {
    const observable = this.http.patch(environment.host + "/api/business", business, optionsAuth).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Business[]> {
    const observable = this.http.get(environment.host + "/api/business", optionsAuth).pipe(
      map(response => response as Business[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Business> {
    const observable = this.http.get(environment.host + "/api/business/" + id, optionsAuth).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async filterByName(name: string): Promise<Business> {
    const observable = this.http.get(environment.host + "/api/business/filterByName/" + name, optionsAuth).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }

  async filterByNick(nick: string): Promise<Business> {
    const observable = this.http.get(environment.host + "/api/business/filterByNick/" + nick, optionsAuth).pipe(
      map(response => response as Business));
    return await firstValueFrom(observable);
  }
}