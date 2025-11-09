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

  business: Business | null = null;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    this.business = this.businessService.getSession();
  }

  onLogout() {
    this.logout.emit();
  }
}
