import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contract',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contract.html',
  styleUrl: './contract.css',
})
export class Contract {
  contract: boolean;
  companyId: string | undefined;
  customerId: string | undefined;
  planId: string | undefined;

  constructor(private router: Router){
    this.contract = false;
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
      this.customerId = state['customer'].id;
      this.planId = state['plan'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
  }

  contractAccept(){
    this.contract = true;
  }

  continue(){
    this.router.navigate(['/summary'], { state: { company: { id: this.companyId }, customer: {id: this.customerId }, plan: {id: this.planId}}});
  }

}
