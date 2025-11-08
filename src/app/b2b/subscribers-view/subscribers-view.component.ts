import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-subscribers-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers-view.component.html',
  styleUrls: ['./subscribers-view.component.css']
})
export class SubscribersViewComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';
  filterStatus: 'all' | 'active' | 'cancelled' | 'pending' = 'all';
  loading = true;

  constructor() {}

  async ngOnInit() {
    await this.loadCustomers();
  }

  async loadCustomers() {
    this.loading = true;
    this.customers = [];
    this.applyFilters();
    this.loading = false;
  }

  applyFilters() {
    this.filteredCustomers = this.customers.filter(customer => {
      const matchesSearch = customer.firstName!.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           customer.email!.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all';
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

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    return this.customers.filter(c => c.status === 'active').length;
  }

  getPendingCount(): number {
    return this.customers.filter(c => c.status === 'pending').length;
  }

  getCancelledCount(): number {
    return this.customers.filter(c => c.status === 'cancelled').length;
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
