import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { optionsBasic } from '../../constants';
import { environment } from '../../environments/environment';
import { Pay } from '../models/pay';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient) { }

  async create(pay: Pay): Promise<Pay> {
    const observable = this.http.post(environment.host + "/api/pay", pay, optionsBasic).pipe(
      map(response => response as Pay));
    return await firstValueFrom(observable);
  }

  async update(pay: Pay): Promise<Pay> {
    const observable = this.http.patch(environment.host + "/api/pay", pay, optionsBasic).pipe(
      map(response => response as Pay));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Pay[]> {
    const observable = this.http.get(environment.host + "/api/pay", optionsBasic).pipe(
      map(response => response as Pay[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Pay> {
    const observable = this.http.get(environment.host + "/api/pay/" + id, optionsBasic).pipe(
      map(response => response as Pay));
    return await firstValueFrom(observable);
  }

  async availableBalance(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/pay/availableBalance/" + businessId, optionsBasic).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async historicalPayments(businessId: string): Promise<Pay[]> {
    const observable = this.http.get(environment.host + "/api/pay/historicalPayments/" + businessId, optionsBasic).pipe(
      map(response => response as Pay[]));
    return await firstValueFrom(observable);
  }

  async historicalWithdrawals(businessId: string): Promise<Pay[]> {
    const observable = this.http.get(environment.host + "/api/pay/historicalWithdrawals/" + businessId, optionsBasic).pipe(
      map(response => response as Pay[]));
    return await firstValueFrom(observable);
  }
}