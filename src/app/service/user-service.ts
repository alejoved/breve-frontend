import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { User } from '../model/user';
import { options } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /*async crear(user: User): Promise<User> {
    const observable = this.http.post(environment.host + "/api/user", options).pipe(
      map(response => response as User));
    return await firstValueFrom(observable);
  }*/
}