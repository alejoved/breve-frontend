import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer';
import { SubscriptionService } from '../../services/subscription-service';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';
import { Subscription } from '../../models/subscription';

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
  filterStatus: 'all' | 'active' | 'cancelled' | 'pending' = 'all';
  loading = true;

  constructor(private subscriptionService: SubscriptionService, private businessService: BusinessService) {}

  async ngOnInit() {
    this.business = this.businessService.getSession();
    await this.loadCustomers();
  }

  async loadCustomers() {
    this.loading = true;
    this.subscriptions = await this.subscriptionService.filterByBusiness(this.business?.id!);
    console.log(this.subscriptions);
    this.applyFilters();
    this.loading = false;
  }

  applyFilters() {
    this.filteredSubscriptions = this.subscriptions.filter(subscription => {
      const matchesSearch = subscription.customer!.firstName!.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           subscription.customer!.email!.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all' || subscription.customer?.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  setStatusFilter(status: 'all' | 'active' | 'cancelled' | 'pending') {
    this.filterStatus = status;
    this.applyFilters();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'cancelled': return 'status-cancelled';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'cancelled': return 'Cancelado';
      case 'pending': return 'Pendiente';
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
    return this.subscriptions.filter(c => c.status).length;
  }

  getPendingCount(): number {
    return 0
  }

  getCancelledCount(): number {
    return this.subscriptions.filter(c => !c.status).length;
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

  async changeStatus(customer: Customer, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as 'active' | 'cancelled' | 'pending';

    const updated = new Customer();

    if (updated) {
      customer.status = newStatus;
      this.applyFilters();
    }
  }
}
