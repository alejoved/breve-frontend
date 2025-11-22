import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './app/flow/welcome/welcome.component';
import { ContactComponent } from './app/flow/contact/contact.component';
import { PlansComponent } from './app/flow/plans/plans.component';
import { AdditionalInfoComponent } from './app/flow/additional-info/additional-info.component';
import { ContractComponent } from './app/flow/contract/contract.component';
import { SummaryComponent } from './app/flow/summary/summary.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './app/b2b/dashboard/dashboard.component';
import { BankAccountViewComponent } from './app/b2b/bank-account-view/bank-account-view.component';
import { BusinessInfoViewComponent } from './app/b2b/business-info-view/business-info-view.component';
import { LoginComponent } from './app/b2b/login/login.component';
import { ClarityComponent } from './app/flow/clarity/clarity.component';
import { WithdrawalsViewComponent } from './app/b2b/withdrawals-view/withdrawals-view.component';
import { PortalComponent } from './app/b2c/portal/portal.component';
import { ModifyPlanComponent } from './app/b2c/modify-plan/modify-plan.component';
import { PaymentComponent } from './app/b2c/payment/payment.component';
import { LandingPageComponent } from './app/web/landing/landing-page.component';
import { AuthInterceptor } from './app/auth/auth-interceptor';
import { AuthB2BGuard } from './app/auth/auth-b2b-guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class App {}

const routes = [
  { path: '', component: LandingPageComponent },
  { path: 'subscription/:businessName', component: WelcomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'additional-info', component: AdditionalInfoComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'clarity', component: ClarityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthB2BGuard] },
  { path: 'bank-account', component: BankAccountViewComponent, canActivate: [AuthB2BGuard] },
  { path: 'business-info', component: BusinessInfoViewComponent, canActivate: [AuthB2BGuard] },
  { path: 'withdrawals', component: WithdrawalsViewComponent, canActivate: [AuthB2BGuard] },
  { path: 'portal', component: PortalComponent },
  { path: 'modify-plan', component: ModifyPlanComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
});
