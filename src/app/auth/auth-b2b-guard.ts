// src/app/guards/auth-b2b.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthB2BService } from './auth-b2b-service';

@Injectable({ providedIn: 'root' })
export class AuthB2BGuard implements CanActivate {
  constructor(private authB2B: AuthB2BService, private router: Router) {}

  canActivate(): boolean {
    if (this.authB2B.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}