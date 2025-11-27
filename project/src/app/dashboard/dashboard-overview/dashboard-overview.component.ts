import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService, DashboardStats } from '../../services/business.service';

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

  stats: DashboardStats = {
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

  constructor(private businessService: BusinessService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    await this.businessService.initializeBusiness();

    this.stats = await this.businessService.getDashboardStats();
    this.todayActivity = await this.businessService.getTodayActivity();
    this.recentActivity = await this.businessService.getRecentActivity();

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
}
