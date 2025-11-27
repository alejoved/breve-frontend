import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { BusinessService } from '../services/business.service';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { IncomeViewComponent } from './income-view/income-view.component';
import { SubscribersViewComponent } from './subscribers-view/subscribers-view.component';
import { PlansViewComponent } from './plans-view/plans-view.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardOverviewComponent,
    IncomeViewComponent,
    SubscribersViewComponent,
    PlansViewComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentView: 'dashboard' | 'ingresos' | 'suscriptores' | 'planes' = 'dashboard';
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  userName = 'Usuario';
  openPlansCreateForm = false;
  subscriptionUrl = '';
  linkCopied = false;

  constructor(
    private supabaseService: SupabaseService,
    private businessService: BusinessService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = this.supabaseService.getUser();
    if (user?.email) {
      this.userName = user.email.split('@')[0];
    }
    await this.loadSubscriptionUrl();
  }

  async loadSubscriptionUrl() {
    const business = await this.businessService.getBusiness();
    if (business?.subscription_slug) {
      this.subscriptionUrl = `${window.location.origin}/subscribe/${business.subscription_slug}`;
    } else {
      this.subscriptionUrl = `${window.location.origin}/subscribe/mi-negocio`;
    }
  }

  setView(view: 'dashboard' | 'ingresos' | 'suscriptores' | 'planes' | string) {
    this.openPlansCreateForm = false;

    if (view === 'planes:create') {
      this.currentView = 'planes';
      this.openPlansCreateForm = true;
    } else {
      this.currentView = view as 'dashboard' | 'ingresos' | 'suscriptores' | 'planes';
    }

    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }

  async copySubscriptionLink() {
    try {
      await navigator.clipboard.writeText(this.subscriptionUrl);
      this.linkCopied = true;
      setTimeout(() => {
        this.linkCopied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  async logout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}
