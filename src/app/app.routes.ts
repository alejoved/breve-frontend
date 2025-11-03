import { Routes } from '@angular/router';
import { ContactData } from './contact-data/contact-data';
import { Plan } from './plan/plan';
import { AdditionalInformation } from './additional-information/additional-information';
import { Contract } from './contract/contract';
import { Summary } from './summary/summary';
import { Pay } from './pay/pay';

export const routes: Routes = [
    { path: 'contact-data', component: ContactData },
    { path: 'plan', component: Plan },
    { path: 'additional-information', component: AdditionalInformation },
    { path: 'contract', component: Contract },
    { path: 'summary', component: Summary },
    { path: 'pay', component: Pay },

];
