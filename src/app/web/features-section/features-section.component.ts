import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.css']
})
export class FeaturesSectionComponent implements AfterViewInit {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;

  problemsList = [
    'No tienes un flujo de suscripción digital y fácil de compartir.',
    'Los pagos recurrentes dependen de recordatorios seguimiento manual.',
    'La gestión de suscriptores y las métricas de ingresos son confusas.',
    'Cambiar planes o precios es complicado para ti y para tus clientes.',
    'Tus clientes no tienen un portal de pagos seguro y accesible.'
  ];

  solutionsList = [
    '✅  Tienes un flujo de suscripción digital listo para usar.',
    '✅  Tus clientes se suscriben y pagan solos a través de un portal de pagos seguro.',
    '✅  Tienes un dashboard con métricas claras para la gestión de suscriptores e ingresos.',
    '✅  Modificas planes y precios cuando lo necesites.',
    '✅  Tus clientes reciben un portal seguro para pagar.',
    '✅  Los cobros automáticos se procesan de forma segura Wompi.'
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
}
