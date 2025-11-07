import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { options } from '../../constants';
import { environment } from '../../environments/environment';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  async create(plan: Plan): Promise<Plan> {
    const observable = this.http.post(environment.host + "/api/plan", plan, options).pipe(
      map(response => response as Plan));
    return await firstValueFrom(observable);
  }

  async update(plan: Plan): Promise<Plan> {
    const observable = this.http.patch(environment.host + "/api/plan", plan, options).pipe(
      map(response => response as Plan));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Plan[]> {
    const observable = this.http.get(environment.host + "/api/plan", options).pipe(
      map(response => response as Plan[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Plan> {
    const observable = this.http.get(environment.host + "/api/plan/" + id, options).pipe(
      map(response => response as Plan));
    return await firstValueFrom(observable);
  }

  async filterByCompany(companyId: string): Promise<Plan[]> {
    const observable = this.http.get(environment.host + "/api/plan/filterByCompany/" + companyId, options).pipe(
      map(response => response as Plan[]));
    return await firstValueFrom(observable);
  }
}