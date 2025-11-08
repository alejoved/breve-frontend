import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../services/subscription-service';
import { PlanService } from '../../services/plan-service';
import { CompanyService } from '../../services/company-service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  @Output() viewChange = new EventEmitter<string>();
  Math = Math;

  stats = {
    activeSubscribers: 0,
    activePlans: 0,
    monthlyRevenue: 0,
    retentionRate: 0,
    subscriberChange: 0,
    plansChange: 0,
    revenueChange: 0,
    retentionChange: 0
  };

  todayActivity = {
    newSubscriptions: 0,
    cancellations: 0,
    renewals: 0,
    revenue: 0
  };

  recentActivity: any[] = [];
  loading = true;
  company: Company | null = null;

  constructor(private companyService: CompanyService, private subscriptionService: SubscriptionService, private planService: PlanService) {}

  async ngOnInit() {
    this.loadData();
    this.company = this.companyService.getSesion();
    this.activeSubscriptions()
    this.activePlans();
    this.monthlyRevenue();
    this.retentionRate();
    this.newSubscriptions();
    this.cancellations();
    this.renewals();
    this.todayIncome();
  }

  loadData() {
    this.loading = true;
    this.stats = this.stats;
    this.todayActivity = this.todayActivity;
    this.recentActivity = this.recentActivity;
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

  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-CO').format(value);
  }

  getActivityDescription(activity: any): string {
    if (activity.status === 'active') {
      return `Nueva suscripción: ${activity.plan?.name || 'Plan'}`;
    } else if (activity.status === 'cancelled') {
      return `Cancelación: ${activity.plan?.name || 'Plan'}`;
    }
    return `Actividad: ${activity.plan?.name || 'Plan'}`;
  }

  getTimeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);

    if (diffInMins < 1) return 'Hace un momento';
    if (diffInMins < 60) return `Hace ${diffInMins} min`;

    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `Hace ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays}d`;
  }

  navigateToPlans() {
    this.viewChange.emit('planes:create');
  }

  navigateToSubscribers() {
    this.viewChange.emit('suscriptores');
  }

  async activeSubscriptions() {
    const subscriptions = await this.subscriptionService.filterByCompany(this.company!.id!);
    this.stats.activeSubscribers = subscriptions.length;
  }

  async activePlans() {
    const plans = await this.planService.filterByCompany(this.company!.id!);
    this.stats.activePlans = plans.length;
  }

  async monthlyRevenue() {
    const monthlyRevenue = await this.subscriptionService.filterByCompanyAndMonthlyRevenue(this.company!.id!);
    this.stats.monthlyRevenue = monthlyRevenue;
  }

  async retentionRate() {
    const retentionRate = await this.subscriptionService.filterByCompanyAndRetentionRate(this.company!.id!);
    this.stats.retentionRate = retentionRate;
  }

  async newSubscriptions() {
    const newSubscriptions = await this.subscriptionService.filterByCompanyAndNewSubscriptions(this.company!.id!);
    this.todayActivity.newSubscriptions = newSubscriptions;
  }

  async cancellations() {
    const cancellations = await this.subscriptionService.filterByCompanyAndCancellations(this.company!.id!);
    this.todayActivity.cancellations = cancellations;
  }

  async renewals() {
    const renewals = await this.subscriptionService.filterByCompanyAndRenewals(this.company!.id!);
    this.todayActivity.renewals = renewals;
  }

  todayIncome() {
    return 50000; // Placeholder value
  }
}
