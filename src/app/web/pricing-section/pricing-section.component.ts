import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
  features: { icon: string; text: string }[];
}

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.css']
})
export class PricingSectionComponent implements AfterViewInit {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;

  steps: Step[] = [
    {
      number: 1,
      title: 'Configuramos tu flujo de suscripción',
      description: 'Recibimos la información de tu negocio, tus planes y precios. Nuestro equipo configura tu flujo personalizado para que tus clientes puedan suscribirse y pagar desde cualquier canal.',
      image: 'assets/Configuracion.png',
      features: [
        { icon: 'assets/background-shadow-1.svg', text: 'Configuración asistida por nuestro equipo' },
        { icon: 'assets/background-shadow.svg', text: 'Flujo personalizado para tu negocio' },
        { icon: 'assets/group-1000003843.png', text: 'Enlace listo para compartir en WhatsApp, Instagram o donde quieras' }
      ]
    },
    {
      number: 2,
      title: 'Conecta tu cuenta bancaria',
      description: 'Agrega tu cuenta bancaria y deja que +Breve se encargue del resto. Tus clientes pagan de forma segura con Wompi y tú recibes el dinero automáticamente.',
      image: 'assets/Cuenta bancaria.png',
      features: [
        { icon: 'assets/group-1000003846.png', text: 'Pagos seguros y automáticos' },
        { icon: 'assets/background-shadow-3.svg', text: 'Sin esperas ni procesos manuales' },
        { icon: 'assets/group-1000003848.png', text: 'Compatible con múltiples métodos de pago.' }
      ]
    },
    {
      number: 3,
      title: 'Gestiona todo desde tu dashboard',
      description: 'Accede a tu panel y visualiza tus ingresos, planes y suscriptores en tiempo real. Controla tus cobros, analiza tus métricas y haz crecer tu negocio con datos claros.',
      image: 'assets/Gestiondashboard.png',
      features: [
        { icon: 'assets/group-1000003912.png', text: 'Dashboard con métricas en tiempo real' },
        { icon: 'assets/group-1000003911.png', text: 'Control de planes y suscriptores' },
        { icon: 'assets/background-shadow-2.svg', text: 'Cobros automatizados y sin fricción' }
      ]
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
    return `${index * 150}ms`;
  }
}
