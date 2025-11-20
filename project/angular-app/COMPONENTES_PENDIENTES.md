# Componentes Pendientes para Completar

Este documento contiene los templates y lógica para los componentes restantes que deben ser creados.

## 1. Features Section

**Archivo**: `src/app/screens/landing-page/sections/features-section/features-section.component.ts`

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.css']
})
export class FeaturesSectionComponent {
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
}
```

**Template HTML**: Ver código React original y convertir usando *ngFor para las listas.

## 2. Pricing Section

**Archivo**: `src/app/screens/landing-page/sections/pricing-section/pricing-section.component.ts`

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
  features: { icon: string; text: string; }[];
}

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-section.component.html',
  styleUrls: ['./pricing-section.component.css']
})
export class PricingSectionComponent {
  steps: Step[] = [
    {
      number: 1,
      title: 'Configuramos tu flujo de suscripción',
      description: 'Recibimos la información de tu negocio, tus planes y precios. Nuestro equipo configura tu flujo personalizado para que tus clientes puedan suscribirse y pagar desde cualquier canal.',
      image: '/group-1000003853.png',
      features: [
        { icon: '/background-shadow-1.svg', text: 'Configuración asistida por nuestro equipo' },
        { icon: '/background-shadow.svg', text: 'Flujo personalizado para tu negocio' },
        { icon: '/group-1000003843.png', text: 'Enlace listo para compartir en WhatsApp, Instagram o donde quieras' }
      ]
    },
    {
      number: 2,
      title: 'Conecta tu cuenta bancaria',
      description: 'Agrega tu cuenta bancaria y deja que +Breve se encargue del resto. Tus clientes pagan de forma segura con Wompi y tú recibes el dinero automáticamente.',
      image: '/group-1000003856.png',
      features: [
        { icon: '/group-1000003846.png', text: 'Pagos seguros y automáticos' },
        { icon: '/background-shadow-3.svg', text: 'Sin esperas ni procesos manuales' },
        { icon: '/group-1000003848.png', text: 'Compatible con múltiples métodos de pago.' }
      ]
    },
    {
      number: 3,
      title: 'Gestiona todo desde tu dashboard',
      description: 'Accede a tu panel y visualiza tus ingresos, planes y suscriptores en tiempo real. Controla tus cobros, analiza tus métricas y haz crecer tu negocio con datos claros.',
      image: '/group-1000003858.png',
      features: [
        { icon: '/group-1000003912.png', text: 'Dashboard con métricas en tiempo real' },
        { icon: '/group-1000003911.png', text: 'Control de planes y suscriptores' },
        { icon: '/background-shadow-2.svg', text: 'Cobros automatizados y sin fricción' }
      ]
    }
  ];
}
```

## 3. User Reviews Section

```typescript
import { Component } from '@angular/core';
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
export class UserReviewsSectionComponent {
  businessSectors: BusinessSector[] = [
    { icon: '/group-1000003862.png', title: 'Gimnasios y fitness', description: 'Ofrece membresías mensuales y olvídate de los cobros manuales.' },
    { icon: '/group-1000003863.png', title: 'Spas y centros de bienestar', description: 'Crea planes sencillos para tus servicios y cobra todos los meses.' },
    { icon: '/group-1000003864.png', title: 'Coworkings', description: 'Gestiona membresías de acceso y recibe pagos automáticos.' },
    { icon: '/group-1000003865.png', title: 'Academias y talleres', description: 'Recibe los pagos mensuales de tus cursos, sin esfuerzo.' },
    { icon: '/group-1000003866.png', title: 'Clubes sociales y deportivos', description: 'Mantén las membresías activas y cobra a tus socios cada mes.' },
    { icon: '/group-1000003867.png', title: 'Servicios profesionales', description: 'Factura asesorías o mantenimientos con cobros periódicos simples.' },
    { icon: '/group-1000003868.png', title: 'Barberías o salones de belleza', description: 'Cobra membresías mensuales para cortes y servicios.' },
    { icon: '/group-1000003869.png', title: 'Entrenadores personales', description: 'Recibe pagos fijos por asesorías y rutinas cada mes.' }
  ];
}
```

## 4. FAQ Section

Contiene tarjetas visuales con las características principales.

## 5. Testimonials Section

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css']
})
export class TestimonialsSectionComponent {
  faqItems: FAQItem[] = [
    {
      id: 'item-1',
      question: '¿Qué es +Breve?',
      answer: '+Breve es una plataforma digital que permite a negocios gestionar y cobrar suscripciones de manera simple, automática y segura...',
      isOpen: false
    },
    // ... más items
  ];

  toggleItem(item: FAQItem): void {
    item.isOpen = !item.isOpen;
  }
}
```

## 6. Hero Section

Sección con calendario y formulario de Calendly.

## 7. App Overview Section

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: 'input' | 'textarea';
}

@Component({
  selector: 'app-app-overview-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-overview-section.component.html',
  styleUrls: ['./app-overview-section.component.css']
})
export class AppOverviewSectionComponent {
  formFields: FormField[] = [
    { id: 'fullName', label: 'Nombre completo', placeholder: 'Ingresa tu nombre completo', type: 'input' },
    { id: 'companyName', label: 'Nombre de la empresa', placeholder: 'Ingresa el nombre de tu empresa', type: 'input' },
    { id: 'phone', label: 'Teléfono de contacto', placeholder: 'Ingresa tu número de teléfono', type: 'input' },
    { id: 'email', label: 'Correo electrónico', placeholder: 'Ingresa tu correo electrónico', type: 'input' },
    { id: 'businessDescription', label: 'Cuéntanos un poco sobre tu negocio', placeholder: 'Describe lo que hace tu negocio', type: 'textarea' }
  ];

  formData: any = {};

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
  }
}
```

## 8. Navigation Section

Footer con enlaces de navegación.

## Pasos para Completar:

1. Crear cada carpeta de componente
2. Copiar el código TypeScript proporcionado
3. Convertir los templates HTML de React a Angular (JSX → HTML con directivas Angular)
4. Reemplazar:
   - `className` → `class`
   - `{condition && <div>}` → `<div *ngIf="condition">`
   - `{array.map((item) => <div>)}` → `<div *ngFor="let item of array">`
   - `onClick={handler}` → `(click)="handler()"`
5. Crear archivos CSS vacíos para cada componente
6. Probar cada componente individualmente

## Comandos útiles:

```bash
# Generar nuevo componente
ng generate component screens/landing-page/sections/[nombre-seccion] --standalone

# Verificar compilación
npm start
```
