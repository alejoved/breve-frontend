import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Plan } from '../model/plan';
import { PlanService } from '../service/plan-service';
import { Router } from '@angular/router';
import { error_swal } from '../../constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-selection',
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './plan-selection.html',
  styleUrl: './plan-selection.css',
})
export class PlanSelection {
  plans: Plan[];
  planId: string;
  plan: Plan | undefined;
  companyId: string | undefined;
  customerId: string | undefined;

  constructor(private planService: PlanService, private router: Router, private cdr: ChangeDetectorRef){
    this.plans = [];
    this.planId = "";
    this.plan = undefined;
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
      this.customerId = state['customer'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.filterByCompany();
  }

  async filterByCompany(){
    try {
      this.plans = await this.planService.filterByCompany(this.companyId!);
      this.cdr.detectChanges(); 
    } catch (ex: any){
      Swal.fire({ icon: error_swal, title: ex.error.mensaje, text: ex.error.datos, footer: ex.error.codigo });
    }
  }

  planSelection(planId: string){
    this.planId = planId;
  }

  async confirmSelection(){
    this.plan = await this.planService.filterById(this.planId);
    this.router.navigate(['/additional-information'], { state: { company: { id: this.companyId }, customer: {id: this.customerId }, plan: {id: this.plan.id}}});
  }

}
