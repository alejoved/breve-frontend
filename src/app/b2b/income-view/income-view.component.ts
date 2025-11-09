import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription-service';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';

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

  constructor(private subscriptionService: SubscriptionService, private businessService: BusinessService) {}

  async ngOnInit() {
    this.business = this.businessService.getSession();
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.monthlyRevenue = await this.subscriptionService.filterByBusinessAndMonthlyRevenue(this.business?.id!);
    this.totalRevenue = await this.subscriptionService.filterByBusinessAndTotalRevenue(this.business?.id!);
    this.average = await this.subscriptionService.filterByBusinessAndAverage(this.business?.id!);
    this.loading = false;
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
