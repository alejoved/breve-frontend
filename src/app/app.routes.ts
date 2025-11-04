import { Routes } from '@angular/router';
import { ContactData } from './contact-data/contact-data';
import { PlanSelection } from './plan-selection/plan-selection';
import { AdditionalInformation } from './additional-information/additional-information';
import { Contract } from './contract/contract';
import { Summary } from './summary/summary';
import { Pay } from './pay/pay';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'contact-data', component: ContactData },
    { path: 'plan-selection', component: PlanSelection },
    { path: 'additional-information', component: AdditionalInformation },
    { path: 'contract', component: Contract },
    { path: 'summary', component: Summary },
    { path: 'pay', component: Pay },

];
