import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BusinessService } from '../../services/business-service';
import { Business } from '../../models/business';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent {
  @Output() logout = new EventEmitter<void>();
  subscriptionUrl = '';
  copySuccess = false;
  copySuccessMenu = false;
  loading = true;
  business: Business | null = null;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    this.business = this.businessService.getSession();

    if (this.business?.subscription_slug) {
      this.subscriptionUrl = `${window.location.origin}/subscribe/${this.business.subscription_slug}`;
    } else {
      this.subscriptionUrl = `${window.location.origin}/subscribe/mi-negocio-demo`;
    }
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.subscriptionUrl);
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  async copyLinkFromMenu() {
    try {
      await navigator.clipboard.writeText(this.subscriptionUrl);
      this.copySuccessMenu = true;
      setTimeout(() => {
        this.copySuccessMenu = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  onLogout() {
    this.logout.emit();
  }
}
