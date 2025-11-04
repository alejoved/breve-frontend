import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { Suscription } from '../model/suscription';
import { Company } from '../model/company';
import { Customer } from '../model/customer';
import { Plan } from '../model/plan';
import { CompanyService } from '../service/company-service';
import { CustomerService } from '../service/customer-service';
import { PlanService } from '../service/plan-service';
import Swal from 'sweetalert2';
import { error_swal } from '../../constants';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-summary',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {
  companyId: string | undefined;
  customerId: string | undefined;
  planId: string | undefined;
  suscription: Suscription| undefined;
  company: Company | undefined;
  customer: Customer | undefined
  plan: Plan | undefined;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private companyService: CompanyService, private customerService: CustomerService, private planService: PlanService ){
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

  ngOnInit() {
    this.companyFilterById();
    this.customerFilterById();
    this.planFilterById();
  }
  async companyFilterById(){
    try {
      this.company = await this.companyService.filterById(this.companyId!);
      this.cdr.detectChanges();
    } catch (ex: any) {
      Swal.fire({ icon: error_swal, title: ex.name, text: ex.error, footer: ex.error.codigo });
    }
  }
  async customerFilterById(){
    try {
      this.customer = await this.customerService.filterById(this.customerId!);
      console.log(this.customer);
      this.cdr.detectChanges();
    } catch (ex: any) {
      Swal.fire({ icon: error_swal, title: ex.name, text: ex.error, footer: ex.error.codigo });
    }
  }
  async planFilterById(){
    try {
      this.plan = await this.planService.filterById(this.planId!);
      this.cdr.detectChanges();
    } catch (ex: any) {
      Swal.fire({ icon: error_swal, title: ex.name, text: ex.error, footer: ex.error.codigo });
    }
  }

  pay(){

  }
}
