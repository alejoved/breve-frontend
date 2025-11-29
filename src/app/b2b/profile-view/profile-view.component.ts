import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';
import { AuthB2BService } from '../../auth/auth-b2b-service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();

  subscriptionUrl = '';
  copySuccess = false;
  copySuccessMenu = false;
  loading = true;
  error = '';
  business: Business | null = null;

  constructor(
    private businessService: BusinessService,
    private authB2B: AuthB2BService
  ) {}

  async ngOnInit() {
    try {
      const businessId = this.authB2B.getBusinessId();
      if (!businessId) {
        this.error = 'No se encontró el negocio.';
        this.loading = false;
        return;
      }
      this.business = await this.businessService.filterById(businessId);
      if (!this.business) {
        this.error = 'Negocio no disponible.';
        this.loading = false;
        return;
      }
      // encode nick por seguridad en la URL
      this.subscriptionUrl = `${window.location.origin}/subscription/${encodeURIComponent(this.business.nick!)}`;
    } catch (e) {
      this.error = 'Error cargando datos.';
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  getInitial(): string {
    return this.business?.email?.charAt(0).toUpperCase() ?? '?';
  }

  async copyToClipboard(source: 'card' | 'menu' = 'card') {
    try {
      await navigator.clipboard.writeText(this.subscriptionUrl);
      if (source === 'card') {
        this.copySuccess = true;
        setTimeout(() => (this.copySuccess = false), 2000);
      } else {
        this.copySuccessMenu = true;
        setTimeout(() => (this.copySuccessMenu = false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  encode(value: string): string {
    try { return encodeURIComponent(value); } catch { return value; }
  }

  // Getters para limpiar el template
  get whatsappShareUrl(): string {
    return 'https://wa.me/?text=' + this.encode('Suscríbete a mis planes: ' + this.subscriptionUrl);
  }
  get facebookShareUrl(): string {
    return 'https://www.facebook.com/sharer/sharer.php?u=' + this.encode(this.subscriptionUrl);
  }
  get twitterShareUrl(): string {
    return 'https://twitter.com/intent/tweet?text=' + this.encode('Suscríbete a mis planes: ' + this.subscriptionUrl);
  }

  onLogout() {
    this.logout.emit();
  }
}