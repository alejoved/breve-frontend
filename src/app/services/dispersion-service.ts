import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { optionsBasic } from '../../constants';
import { environment } from '../../environments/environment';
import { Dispersion } from '../models/dispersion';

@Injectable({
  providedIn: 'root'
})
export class DispersionService {

  constructor(private http: HttpClient) { }

  async create(businessId: string): Promise<Dispersion> {
    const observable = this.http.post(environment.host + "/api/dispersion", {business:{id: businessId}}, optionsBasic).pipe(
      map(response => response as Dispersion));
    return await firstValueFrom(observable);
  }

  async historical(businessId: string): Promise<Dispersion[]> {
    const observable = this.http.get(environment.host + "/api/dispersion/historical/" + businessId, optionsBasic).pipe(
      map(response => response as Dispersion[]));
    return await firstValueFrom(observable);
  }
}