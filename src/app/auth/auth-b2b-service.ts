import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { optionsBasic } from '../../constants';
import { BusinessService } from '../services/business-service';

interface LoginResponse {
  token: string;
  businessId: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthB2BService {
  constructor(private http: HttpClient, private businessService: BusinessService) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await firstValueFrom(
      this.http.get<LoginResponse>(environment.host + "/api/business/login/" + email + "/" + password, optionsBasic)
    );
    if (response.token) {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('businessId', response.businessId);
      sessionStorage.setItem('token_expiry', String(Date.now() + response.expiresIn * 1000));
    }
    return response;
  }

  logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('businessId');
      sessionStorage.removeItem('token_expiry');
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    const expiry = sessionStorage.getItem('token_expiry');
    
    if (!token || !expiry) return false;
    
    // Verificar si el token expiró
    if (Date.now() > Number(expiry)) {
      this.logout();
      return false;
    }
    
    return true;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getBusinessId(): string | null {
    return sessionStorage.getItem('businessId');
  }
}