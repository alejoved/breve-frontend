import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <button class="back-button" (click)="goBack()" *ngIf="showBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="logo">
        <img src="assets/Logo +Breve copy copy.png" alt="{{ businessName }}" class="logo-img">
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      padding: 24px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      position: relative;
      min-height: 96px;
    }

    .back-button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f3f4f6;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #1f2937;
      transition: all 0.2s;
    }

    .back-button:hover {
      background: #e5e7eb;
    }

    .logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-img {
      height: 48px;
      width: auto;
      max-width: 250px;
    }

    @media (max-width: 768px) {
      .header {
        padding: 16px 20px;
        min-height: 72px;
      }

      .back-button {
        width: 40px;
        height: 40px;
      }

      .logo-img {
        height: 36px;
        max-width: 180px;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() businessName = '+Breve';
  @Input() showBack = true;

  private router = inject(Router);

  goBack() {
    window.history.back();
  }
}
