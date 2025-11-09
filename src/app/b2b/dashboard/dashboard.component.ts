import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from '../dashboard-overview/dashboard-overview.component';
import { IncomeViewComponent } from '../income-view/income-view.component';
import { SubscribersViewComponent } from '../subscribers-view/subscribers-view.component';
import { PlansViewComponent } from '../plans-view/plans-view.component';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';

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
  business: Business | null = null;

  constructor(
    private router: Router, private businessService: BusinessService) {}

  ngOnInit() {
    this.business = this.businessService.getSession();
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

  async logout() {
    this.router.navigate(['/login']);
  }
}
