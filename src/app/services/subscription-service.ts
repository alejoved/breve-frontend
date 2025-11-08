import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom, Subscription } from 'rxjs';
import { options } from '../../constants';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  async create(subscription: Subscription): Promise<Subscription> {
    const observable = this.http.post(environment.host + "/api/subscription", subscription, options).pipe(
      map(response => response as Subscription));
    return await firstValueFrom(observable);
  }

  async update(subscription: Subscription): Promise<Subscription> {
    const observable = this.http.patch(environment.host + "/api/subscription", subscription, options).pipe(
      map(response => response as Subscription));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription", options).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Subscription> {
    const observable = this.http.get(environment.host + "/api/subscription/" + id, options).pipe(
      map(response => response as Subscription));
    return await firstValueFrom(observable);
  }
  async filterByCompany(companyId: string): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCompany/" + companyId, options).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterByCompanyAndMonthlyRevenue(companyId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCompanyAndMonthlyRevenue/" + companyId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByCompanyAndRetentionRate(companyId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCompanyAndRetentionRate/" + companyId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByCompanyAndNewSubscriptions(companyId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCompanyAndNewSubscriptions/" + companyId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByCompanyAndCancellations(companyId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCompanyAndCancellations/" + companyId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByCompanyAndRenewals(companyId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCompanyAndRenewals/" + companyId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }
}