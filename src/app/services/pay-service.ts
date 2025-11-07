import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { options } from '../../constants';
import { environment } from '../../environments/environment';
import { Pay } from '../models/pay';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient) { }

  async create(pay: Pay): Promise<Pay> {
    const observable = this.http.post(environment.host + "/api/pay", pay, options).pipe(
      map(response => response as Pay));
    return await firstValueFrom(observable);
  }

  async update(pay: Pay): Promise<Pay> {
    const observable = this.http.patch(environment.host + "/api/pay", pay, options).pipe(
      map(response => response as Pay));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Pay[]> {
    const observable = this.http.get(environment.host + "/api/pay", options).pipe(
      map(response => response as Pay[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Pay> {
    const observable = this.http.get(environment.host + "/api/pay/" + id, options).pipe(
      map(response => response as Pay));
    return await firstValueFrom(observable);
  }
}