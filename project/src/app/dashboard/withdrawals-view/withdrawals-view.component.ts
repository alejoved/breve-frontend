import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../services/business.service';

interface Withdrawal {
  id: string;
  business_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  created_at: string;
  completed_at?: string;
}

interface Payment {
  id: string;
  business_id: string;
  subscriber_id: string;
  amount: number;
  payment_date: string;
  subscriber?: {
    name: string;
  };
}

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
  withdrawalHistory: Withdrawal[] = [];
  paymentHistory: Payment[] = [];
  loading = true;
  isProcessingWithdrawal = false;
  maxMonthlyWithdrawals = 2;
  showSuccessModal = false;
  showConfirmModal = false;
  withdrawalAmountToConfirm = 0;

  constructor(private businessService: BusinessService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const businessId = await this.businessService.getBusinessId();

    if (businessId) {
      await Promise.all([
        this.loadAvailableBalance(businessId),
        this.loadWithdrawalHistory(businessId),
        this.loadPaymentHistory(businessId)
      ]);
    }

    this.loading = false;
  }

  async loadAvailableBalance(businessId: string) {
    const supabase = this.businessService['supabase'];

    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('business_id', businessId);

    const totalPayments = payments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

    this.availableBalance = totalPayments;
  }

  async loadWithdrawalHistory(businessId: string) {
    const supabase = this.businessService['supabase'];

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const { data: withdrawals } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(10);

    this.withdrawalHistory = withdrawals || [];

    this.monthlyWithdrawals = 0;
  }

  async loadPaymentHistory(businessId: string) {
    const supabase = this.businessService['supabase'];

    const { data: payments } = await supabase
      .from('payments')
      .select('*, subscriber:subscribers(name)')
      .eq('business_id', businessId)
      .order('payment_date', { ascending: false })
      .limit(10);

    this.paymentHistory = payments || [];
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

    const businessId = await this.businessService.getBusinessId();

    if (businessId) {
      const supabase = this.businessService['supabase'];
      const withdrawalAmount = this.withdrawalAmountToConfirm;

      const { error } = await supabase
        .from('withdrawals')
        .insert({
          business_id: businessId,
          amount: withdrawalAmount,
          status: 'pending'
        });

      if (!error) {
        this.showSuccessModal = true;
        await this.loadData();
      } else {
        alert('Hubo un error al procesar tu retiro. Por favor intenta de nuevo.');
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
      'completed': 'Completado',
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
