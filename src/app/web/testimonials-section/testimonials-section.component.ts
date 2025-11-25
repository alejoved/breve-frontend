import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css']
})
export class TestimonialsSectionComponent implements AfterViewInit {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;

  faqItems: FAQItem[] = [
    {
      id: 'item-1',
      question: '¿Qué es +Breve?',
      answer: '+Breve es una plataforma digital que permite a negocios gestionar y cobrar suscripciones de manera simple, automática y segura. Reúne herramientas para manejar pagos, suscriptores y reportes sin complicaciones.',
      isOpen: false
    },
    {
      id: 'item-2',
      question: '¿Cuánto cuesta usar +Breve?',
      answer: 'Usar +Breve tiene un costo mensual de $80.000 COP, que te da acceso al flujo digital de suscripción, al dashboard de gestión y al portal de pagos para tus clientes. Además, cobramos una comisión del 5% por cada transacción realizada dentro de la plataforma.De esta forma solo pagas un valor fijo accesible y una pequeña comisión por las ventas que realmente generas a través de +Breve.',
      isOpen: false
    },
    {
      id: 'item-3',
      question: '¿Cuánto tiempo toma implementar +Breve en mi negocio?',
      answer: 'Puedes empezar a usar +Breve en minutos. El proceso de registro es rápido y el flujo de suscripción está listo para configurarse y comenzar a recibir pagos el mismo día.',
      isOpen: false
    },
    {
      id: 'item-4',
      question: '¿Necesito conocimientos técnicos para usar +Breve?',
      answer: 'No necesitas conocimientos técnicos avanzados. La plataforma está diseñada para ser intuitiva y sencilla; puedes gestionar todo desde un panel amigable. Si necesitas ayuda, te acompañamos en el proceso.',
      isOpen: false
    },
    {
      id: 'item-5',
      question: '¿Qué métodos de pago pueden usar mis clientes?',
      answer: 'Tus clientes pueden pagar con tarjeta de crédito, débito, PSE, Nequi y transferencia Bancolombia gracias a la integración con Wompi.',
      isOpen: false
    },
    {
      id: 'item-6',
      question: '¿Cómo recibo el dinero de las suscripciones?',
      answer: 'El dinero de tus suscripciones se transfiere directamente a tu cuenta bancaria, habitualmente en el día hábil siguiente a cada pago realizado.',
      isOpen: false
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

  toggleItem(item: FAQItem) {
    item.isOpen = !item.isOpen;
  }
}
