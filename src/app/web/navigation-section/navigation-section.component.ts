import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NavigationLink {
  text: string;
  href: string;
}

@Component({
  selector: 'app-navigation-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-section.component.html',
  styleUrls: ['./navigation-section.component.css']
})
export class NavigationSectionComponent implements AfterViewInit {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;

  constructor(private router: Router) {}

  navigationLinks: NavigationLink[] = [
    { text: '¿Cómo funciona?', href: '#como-funciona' },
    { text: 'Características', href: '#caracteristicas' },
    { text: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
    { text: 'Gestionar negocio', href: '#gestionar-negocio' },
    { text: 'Pagar suscripción', href: '#pagar-suscripcion' },
    { text: 'Contacto', href: '#contacto' }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
        }
      },
      { threshold: 0.2 }
    );

    if (this.section) {
      observer.observe(this.section.nativeElement);
    }
  }

  handleScrollTo(event: Event, href: string) {
    event.preventDefault();
    // Si es una ruta (comienza con /), navegar con Router
    if (href.startsWith('/')) {
      this.router.navigate([href]);
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
  }
}
