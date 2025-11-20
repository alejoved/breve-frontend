import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BusinessSector {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-user-reviews-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reviews-section.component.html',
  styleUrls: ['./user-reviews-section.component.css']
})
export class UserReviewsSectionComponent implements AfterViewInit {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;

  businessSectors: BusinessSector[] = [
    {
      icon: '/group-1000003862.png',
      title: 'Gimnasios y fitness',
      description: 'Ofrece membresías mensuales y olvídate de los cobros manuales.'
    },
    {
      icon: '/group-1000003863.png',
      title: 'Spas y centros de bienestar',
      description: 'Crea planes sencillos para tus servicios y cobra todos los meses.'
    },
    {
      icon: '/11zon_Coworkings.webp',
      title: 'Coworkings',
      description: 'Gestiona membresías de acceso y recibe pagos automáticos.'
    },
    {
      icon: '/11zon_Academias y talleres.webp',
      title: 'Academias y talleres',
      description: 'Recibe los pagos mensuales de tus cursos, sin esfuerzo.'
    },
    {
      icon: '/11zon_Clubes sociales y deportivos.webp',
      title: 'Clubes sociales y deportivos',
      description: 'Mantén las membresías activas y cobra a tus socios cada mes.'
    },
    {
      icon: '/group-1000003867.png',
      title: 'Servicios profesionales',
      description: 'Factura asesorías o mantenimientos con cobros periódicos simples.'
    },
    {
      icon: '/group-1000003868.png',
      title: 'Barberías o salones de belleza',
      description: 'Cobra membresías mensuales para cortes y servicios.'
    },
    {
      icon: '/11zon_Entrenadores personales.webp',
      title: 'Entrenadores personales',
      description: 'Recibe pagos fijos por asesorías y rutinas cada mes.'
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
        }
      },
      { threshold: 0.1 }
    );

    if (this.section) {
      observer.observe(this.section.nativeElement);
    }
  }

  getItemDelay(index: number): string {
    return `${index * 80}ms`;
  }
}
