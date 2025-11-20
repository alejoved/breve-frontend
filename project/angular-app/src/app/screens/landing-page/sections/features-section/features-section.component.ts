import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
    'No tienes un flujo digital para que los clientes se suscriban.',
    'Los pagos dependen de mensajes, recordatorios y seguimiento manual.',
    'No sabes cuántos clientes siguen activos ni cuánto vas a cobrar.',
    'Cambiar planes o precios es complicado para ti y para tus clientes.',
    'No existe un portal donde tus clientes puedan pagar fácilmente.'
  ];

  solutionsList = [
    '✅  Tienes un flujo de suscripción digital listo para usar.',
    '✅  Tus clientes se suscriben solos y pagan sin escribirte.',
    '✅  Puedes ver estadísticas claras desde un dashboard (pagos, suscriptores, ingresos).',
    '✅  Modificas planes y precios cuando lo necesites.',
    '✅  Tus clientes reciben un portal seguro para pagar.',
    '✅  Los cobros se procesan automáticamente con +Breve a través de Wompi.'
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
