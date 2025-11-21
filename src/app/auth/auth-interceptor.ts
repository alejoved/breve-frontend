// src/app/services/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Determinar qué token usar según la ruta
    const isB2B = req.url.includes('/api/business') || req.url.includes('/api/subscription');
    const token = isB2B 
      ? sessionStorage.getItem('b2b_token')
      : sessionStorage.getItem('b2c_token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expirado o inválido
          sessionStorage.clear();
          this.router.navigate([isB2B ? '/login' : '/portal']);
        }
        return throwError(() => error);
      })
    );
  }
}