import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription-service';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';
import { AuthB2BService } from '../../auth/auth-b2b-service';
import { PayService } from '../../services/pay-service';

@Component({
  selector: 'app-income-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income-view.component.html',
  styleUrls: ['./income-view.component.css']
})
export class IncomeViewComponent implements OnInit {
  totalRevenue = 0;
  monthlyRevenue = 0;
  average = 0;
  loading = true;
  business: Business | null = null;

  constructor(private subscriptionService: SubscriptionService, private payService: PayService, private businessService: BusinessService, private authB2B: AuthB2BService) {}

  async ngOnInit() {
    const businessId = this.authB2B.getBusinessId();
    this.business = await this.businessService.filterById(businessId!);
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.monthlyRevenue = await this.payService.filterByBusinessAndMonthlyRevenue(this.business?.id!);
      this.totalRevenue = await this.payService.filterByBusinessAndTotalRevenue(this.business?.id!);
      this.average = await this.payService.filterByBusinessAndAverage(this.business?.id!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
    } finally {
      this.loading = false;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
