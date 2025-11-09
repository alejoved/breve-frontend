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
  async filterByBusiness(businessId: string): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusiness/" + businessId, options).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndMonthlyRevenue(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndMonthlyRevenue/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndRetentionRate(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndRetentionRate/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndNewSubscriptions(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndNewSubscriptions/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndCancellations(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndCancellations/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndRenewals(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndRenewals/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndTodayRevenue(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndTodayRevenue/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndTotalRevenue(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndTotalRevenue/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndAverage(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndAverage/" + businessId, options).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }
}