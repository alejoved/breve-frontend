import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer';
import { SubscriptionService } from '../../services/subscription-service';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';
import { Subscription } from '../../models/subscription';
import { AuthB2BService } from '../../auth/auth-b2b-service';

@Component({
  selector: 'app-subscribers-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers-view.component.html',
  styleUrls: ['./subscribers-view.component.css']
})
export class SubscribersViewComponent implements OnInit {
  business: Business | null = null;
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  searchTerm = '';
  filterStatus: 'active' | 'renewal' | 'cancelled' = 'active';
  loading = true;

  constructor(private subscriptionService: SubscriptionService, private businessService: BusinessService, private authB2B: AuthB2BService) {}

  async ngOnInit() {
    const businessId = this.authB2B.getBusinessId();
    this.business = await this.businessService.filterById(businessId!);
    await this.loadCustomers();
  }

  async loadCustomers() {
    this.loading = true;
    this.subscriptions = await this.subscriptionService.filterByBusiness(this.business?.id!);
    this.setStatusFilter('active');
    this.applyFilters();
    this.loading = false;
  }

  applyFilters() {
    this.filteredSubscriptions = this.subscriptions.filter(subscription => {
      const matchesSearch = subscription.customer!.firstName!.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           subscription.customer!.email!.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = subscription?.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  setStatusFilter(status: 'active' | 'renewal' | 'cancelled') {
    this.filterStatus = status;
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'renewal': return 'status-renewal';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'renewal': return 'Renovación';
      case 'cancelled': return 'Cancelado';
      default: return status;
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

  getActiveCount(): number {
    return this.subscriptions.filter(c => c.status == "active").length;
  }

  getRenewalCount(): number {
    return this.subscriptions.filter(c => c.status == "renewal").length;
  }

  getCancelledCount(): number {
    return this.subscriptions.filter(c => c.status == "cancelled").length;
  }

  formatNextPayment(startDate: string): string {
    const start = new Date(startDate);
    const nextMonth = new Date(start);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return nextMonth.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  callPhone(customer: Customer) {
    const phone = customer.phone || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.location.href = `tel:${cleanPhone}`;
  }

  contactWhatsApp(customer: Customer) {
    const phone = customer.phone || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hola ${customer.firstName}, te contacto desde mi sistema de suscripciones.`);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
