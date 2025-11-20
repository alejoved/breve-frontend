import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NavigationItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-call-to-action-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-to-action-section.component.html',
  styleUrls: ['./call-to-action-section.component.css']
})
export class CallToActionSectionComponent {
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  navigationItems: NavigationItem[] = [
    { label: '¿Cómo funciona?', href: '#como-funciona' },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
    { label: 'Gestionar negocio', href: '/login' },
    { label: 'Pagar suscripción', href: '/portal' },
    { label: 'Contacto', href: '#contacto' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  handleScrollTo(href: string): void {
    // Si es una ruta (comienza con /), navegar con Router
    if (href.startsWith('/')) {
      this.router.navigate([href]);
      this.mobileMenuOpen = false;
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    this.mobileMenuOpen = false;
  }
}
