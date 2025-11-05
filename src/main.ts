import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './app/components/welcome/welcome.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { PlansComponent } from './app/components/plans/plans.component';
import { AdditionalInfoComponent } from './app/components/additional-info/additional-info.component';
import { ContractComponent } from './app/components/contract/contract.component';
import { SummaryComponent } from './app/components/summary/summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class App {}

const routes = [
  { path: '', component: WelcomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'additional-info', component: AdditionalInfoComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});
