import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService, Subscriber } from '../../services/business.service';

@Component({
  selector: 'app-subscribers-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribers-view.component.html',
  styleUrls: ['./subscribers-view.component.css']
})
export class SubscribersViewComponent implements OnInit {
  subscribers: Subscriber[] = [];
  filteredSubscribers: Subscriber[] = [];
  searchTerm = '';
  filterStatus: 'all' | 'active' | 'cancelled' | 'pending' = 'all';
  loading = true;

  constructor(private businessService: BusinessService) {}

  async ngOnInit() {
    await this.loadSubscribers();
  }

  async loadSubscribers() {
    this.loading = true;
    this.subscribers = await this.businessService.getSubscribers();
    this.applyFilters();
    this.loading = false;
  }

  applyFilters() {
    this.filteredSubscribers = this.subscribers.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           sub.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.filterStatus === 'all' || sub.status === this.filterStatus;
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
    return this.subscribers.filter(s => s.status === 'active').length;
  }

  getPendingCount(): number {
    return this.subscribers.filter(s => s.status === 'pending').length;
  }

  getCancelledCount(): number {
    return this.subscribers.filter(s => s.status === 'cancelled').length;
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

  callPhone(subscriber: Subscriber) {
    const phone = subscriber.phone || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    window.location.href = `tel:${cleanPhone}`;
  }

  contactWhatsApp(subscriber: Subscriber) {
    const phone = subscriber.phone || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hola ${subscriber.name}, te contacto desde mi sistema de suscripciones.`);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  async changeStatus(subscriber: Subscriber, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as 'active' | 'cancelled' | 'pending';

    const updated = await this.businessService.updateSubscriber(subscriber.id, {
      status: newStatus
    });

    if (updated) {
      subscriber.status = newStatus;
      this.applyFilters();
    }
  }
}
