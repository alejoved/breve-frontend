// src/app/guards/auth-b2c.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthB2CService } from './auth-b2c-service';

@Injectable({ providedIn: 'root' })
export class AuthB2CGuard implements CanActivate {
  constructor(private authB2C: AuthB2CService, private router: Router) {}

  canActivate(): boolean {
    if (this.authB2C.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/portal']);
    return false;
  }
}