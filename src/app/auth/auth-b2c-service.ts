// src/app/services/auth-b2c.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthB2CService {
  constructor(private http: HttpClient, private router: Router) {}

  // Enviar código OTP por email o SMS
  async sendOTP(documentNumber: string): Promise<{ success: boolean; message: string }> {
    return firstValueFrom(
      this.http.post<any>(`${environment.host}/api/auth/b2c/send-otp`, { documentNumber })
    );
  }

  // Verificar código OTP
  async verifyOTP(documentNumber: string, code: string): Promise<{ token: string; customer: any }> {
    const response = await firstValueFrom(
      this.http.post<any>(`${environment.host}/api/auth/b2c/verify-otp`, { documentNumber, code })
    );
    
    if (response.token) {
      sessionStorage.setItem('b2c_token', response.token);
      sessionStorage.setItem('customer', JSON.stringify(response.customer));
    }
    
    return response;
  }

  logout() {
    sessionStorage.removeItem('b2c_token');
    sessionStorage.removeItem('customer');
    this.router.navigate(['/portal']);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('b2c_token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('b2c_token');
  }
}