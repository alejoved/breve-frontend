import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';
import { PayService } from '../../services/pay-service';
import { Pay } from '../../models/pay';
import { AuthB2BService } from '../../auth/auth-b2b-service';
import { DispersionService } from '../../services/dispersion-service';
import Swal from 'sweetalert2';
import { Dispersion } from '../../models/dispersion';

@Component({
  selector: 'app-withdrawals-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './withdrawals-view.component.html',
  styleUrls: ['./withdrawals-view.component.css']
})
export class WithdrawalsViewComponent implements OnInit {
  availableBalance = 0;
  monthlyWithdrawals = 0;
  historicalWithdrawals: Dispersion[] = [];
  historicalPayments: Pay[] = [];
  loading = true;
  isProcessingWithdrawal = false;
  maxMonthlyWithdrawals = 1;
  showSuccessModal = false;
  showConfirmModal = false;
  withdrawalAmountToConfirm = 0;
  business: Business | null = null;

  constructor(private businessService: BusinessService, private payService: PayService, private dispersionService: DispersionService, private authB2B: AuthB2BService) {}

  async ngOnInit() {
    const businessId = this.authB2B.getBusinessId();
    this.business = await this.businessService.filterById(businessId!);
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    if (this.business) {
      await Promise.all([
        this.loadAvailableBalance(),
        this.loadHistoricalPayments(),
        this.loadHistoricalWithdrawals()
      ]);
    }

    this.loading = false;
  }

  async loadAvailableBalance() {
    try {
      this.availableBalance = await this.payService.availableBalance(this.business?.id!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
    }
  }

  async loadHistoricalPayments() {
    try {
      this.historicalPayments = await this.payService.historicalPayments(this.business?.id!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
    }
  }

  async loadHistoricalWithdrawals() {
    try {
      this.historicalWithdrawals = await this.dispersionService.historical(this.business?.id!);
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
    }
  }

  requestWithdrawal() {
    if (this.availableBalance <= 0) {
      alert('No tienes saldo disponible para retirar');
      return;
    }

    if (this.monthlyWithdrawals >= this.maxMonthlyWithdrawals) {
      alert(`Has alcanzado el límite de ${this.maxMonthlyWithdrawals} retiros por mes. Intenta nuevamente el próximo mes.`);
      return;
    }

    this.withdrawalAmountToConfirm = this.availableBalance;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  async confirmWithdrawal() {
    this.showConfirmModal = false;
    this.isProcessingWithdrawal = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (this.business) {
      try {
        await this.dispersionService.create(this.business.id!);
        this.showSuccessModal = true;
        await this.loadData();
      }catch(ex: any){
        Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
      }
    }
    this.isProcessingWithdrawal = false;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pending': 'Pendiente',
      'approved': 'Aprobado',
      'rejected': 'Rechazado'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  get canWithdraw(): boolean {
    return this.availableBalance > 0 && this.monthlyWithdrawals < this.maxMonthlyWithdrawals;
  }

  get withdrawalLimitMessage(): string {
    const remaining = this.maxMonthlyWithdrawals - this.monthlyWithdrawals;
    if (remaining === 0) {
      return 'Has alcanzado el límite de retiros este mes';
    }
    return `Te quedan ${remaining} retiro${remaining > 1 ? 's' : ''} este mes`;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  goBack() {
    window.history.back();
  }
}
