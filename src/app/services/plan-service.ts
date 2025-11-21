import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { optionsBasic } from '../../constants';
import { environment } from '../../environments/environment';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  async create(plan: Plan): Promise<Plan> {
    const observable = this.http.post(environment.host + "/api/plan", plan, optionsBasic).pipe(
      map(response => response as Plan));
    return await firstValueFrom(observable);
  }

  async update(plan: Plan): Promise<Plan> {
    const observable = this.http.patch(environment.host + "/api/plan", plan, optionsBasic).pipe(
      map(response => response as Plan));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Plan[]> {
    const observable = this.http.get(environment.host + "/api/plan", optionsBasic).pipe(
      map(response => response as Plan[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Plan> {
    const observable = this.http.get(environment.host + "/api/plan/" + id, optionsBasic).pipe(
      map(response => response as Plan));
    return await firstValueFrom(observable);
  }

  async filterByBusiness(businessId: string): Promise<Plan[]> {
    const observable = this.http.get(environment.host + "/api/plan/filterByBusiness/" + businessId, optionsBasic).pipe(
      map(response => response as Plan[]));
    return await firstValueFrom(observable);
  }
}