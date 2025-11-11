import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { business_name } from '../../../constants';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProgressBarComponent],
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent {
  private router = inject(Router);
  businessId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.businessId = state['business'].id;
      this.customerId = state['customer'].id;
      this.planId = state['plan'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
  }

  businessName = business_name;
  termsAccepted = false;

  onContinue() {
    if (this.termsAccepted) {
      this.router.navigate(['/summary'], { state: { business: { id: this.businessId }, customer: {id: this.customerId }, plan: {id: this.planId } }});
    }
  }
}
