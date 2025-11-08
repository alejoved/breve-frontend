import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  averageSubscription = 0;
  loading = true;

  constructor() {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const stats = {
      monthlyRevenue: 100000,
      activeSubscribers: 50
    };
    this.monthlyRevenue = stats.monthlyRevenue;
    this.totalRevenue = stats.monthlyRevenue * 12;
    this.averageSubscription = stats.activeSubscribers > 0
      ? stats.monthlyRevenue / stats.activeSubscribers
      : 0;
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
