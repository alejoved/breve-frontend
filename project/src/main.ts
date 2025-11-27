import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { BankAccountViewComponent } from './app/dashboard/bank-account-view/bank-account-view.component';
import { BusinessInfoViewComponent } from './app/dashboard/business-info-view/business-info-view.component';
import { WithdrawalsViewComponent } from './app/dashboard/withdrawals-view/withdrawals-view.component';
import { authGuard } from './app/services/auth.guard';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterOutlet]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'bank-account', component: BankAccountViewComponent, canActivate: [authGuard] },
      { path: 'business-info', component: BusinessInfoViewComponent, canActivate: [authGuard] },
      { path: 'withdrawals', component: WithdrawalsViewComponent, canActivate: [authGuard] }
    ])
  ]
});
