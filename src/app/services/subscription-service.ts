import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { optionsAuth, optionsBasic } from '../../constants';
import { environment } from '../../environments/environment';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  async create(subscription: Subscription): Promise<Subscription> {
    const observable = this.http.post(environment.host + "/api/subscription", subscription, optionsBasic).pipe(
      map(response => response as Subscription));
    return await firstValueFrom(observable);
  }

  async update(subscription: Subscription): Promise<Subscription> {
    const observable = this.http.patch(environment.host + "/api/subscription", subscription, optionsBasic).pipe(
      map(response => response as Subscription));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription", optionsBasic).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Subscription> {
    const observable = this.http.get(environment.host + "/api/subscription/" + id, optionsBasic).pipe(
      map(response => response as Subscription));
    return await firstValueFrom(observable);
  }
  async filterByCustomer(customerId: string): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCustomer/" + customerId, optionsBasic).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterByBusiness(businessId: string): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusiness/" + businessId, optionsBasic).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterByCustomerAndRenewal(customerId: string): Promise<Subscription[]> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByCustomerAndRenewal/" + customerId, optionsAuth).pipe(
      map(response => response as Subscription[]));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndMonthlyRevenue(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndMonthlyRevenue/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndRetentionRate(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndRetentionRate/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndNewSubscriptions(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndNewSubscriptions/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndCancellations(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndCancellations/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndRenewals(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndRenewals/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndTodayRevenue(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndTodayRevenue/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndTotalRevenue(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndTotalRevenue/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }

  async filterByBusinessAndAverage(businessId: string): Promise<number> {
    const observable = this.http.get(environment.host + "/api/subscription/filterByBusinessAndAverage/" + businessId, optionsAuth).pipe(
      map(response => response as number));
    return await firstValueFrom(observable);
  }
}