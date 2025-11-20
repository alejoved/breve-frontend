import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  navigationItems: NavigationItem[] = [
    { label: '¿Cómo funciona?', href: '#como-funciona' },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
    { label: 'Gestionar negocio', href: '#gestionar-negocio' },
    { label: 'Pagar suscripción', href: '#pagar-suscripcion' },
    { label: 'Contacto', href: '#contacto' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  handleScrollTo(href: string): void {
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
