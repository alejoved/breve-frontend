import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent {
  @Output() logout = new EventEmitter<void>();

  userEmail = '';

  constructor() {
    //const user = this.supabaseService.getUser();
    //this.userEmail = user?.email || '';
  }

  onLogout() {
    this.logout.emit();
  }
}
