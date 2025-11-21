import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { options } from '../../constants';
import { Contact } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  async create(contact: Contact): Promise<Contact> {
    const observable = this.http.post(environment.host + "/api/contact", contact, options).pipe(
      map(response => response as Contact));
    return await firstValueFrom(observable);
  }

  async update(contact: Contact): Promise<Contact> {
    const observable = this.http.patch(environment.host + "/api/contact", contact, options).pipe(
      map(response => response as Contact));
    return await firstValueFrom(observable);
  }

  async getAll(): Promise<Contact[]> {
    const observable = this.http.get(environment.host + "/api/contact", options).pipe(
      map(response => response as Contact[]));
    return await firstValueFrom(observable);
  }

  async filterById(id: string): Promise<Contact> {
    const observable = this.http.get(environment.host + "/api/contact/" + id, options).pipe(
      map(response => response as Contact));
    return await firstValueFrom(observable);
  }
}