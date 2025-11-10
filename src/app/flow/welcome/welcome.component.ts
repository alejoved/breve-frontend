import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { business_name } from '../../../constants';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <div class="welcome-container">
      <div class="welcome-content">
        <h1 class="welcome-title">Bienvenido a</h1>
        <img src="/assets/Logo +Breve.png" alt="Logo" class="logo">
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #FF8BAA 0%, #6B4EE6 100%);
      padding: 24px;
    }

    .welcome-content {
      text-align: center;
      animation: fadeIn 0.6s ease-in;
    }

    .welcome-title {
      font-size: 48px;
      font-weight: 400;
      color: white;
      line-height: 1.3;
      margin: 0 0 24px 0;
    }

    .logo {
      max-width: 400px;
      width: 100%;
      height: auto;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .welcome-title {
        font-size: 32px;
        margin: 0 0 20px 0;
      }

      .logo {
        max-width: 280px;
      }
    }
  `]
})
export class WelcomeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  businessName: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nameFromParam = params.get('businessName');
      if (nameFromParam) {
        this.businessName = nameFromParam;
      } else {
        this.router.navigate(['']);
      }
    });
    setTimeout(() => {
      this.router.navigate(['/contact'], { state: { businessName: this.businessName } });
    }, 2500);
  }
}
