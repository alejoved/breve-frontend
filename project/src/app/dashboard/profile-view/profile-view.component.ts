import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { BusinessService, Business } from '../../services/business.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();

  userEmail = '';
  business: Business | null = null;
  subscriptionUrl = '';
  copySuccess = false;
  copySuccessMenu = false;
  loading = true;

  constructor(
    private supabaseService: SupabaseService,
    private businessService: BusinessService
  ) {
    const user = this.supabaseService.getUser();
    this.userEmail = user?.email || '';
  }

  async ngOnInit() {
    await this.loadBusiness();
  }

  async loadBusiness() {
    this.loading = true;
    this.business = await this.businessService.getBusiness();

    if (this.business?.subscription_slug) {
      this.subscriptionUrl = `${window.location.origin}/subscribe/${this.business.subscription_slug}`;
    } else {
      this.subscriptionUrl = `${window.location.origin}/subscribe/mi-negocio-demo`;
    }

    this.loading = false;
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
