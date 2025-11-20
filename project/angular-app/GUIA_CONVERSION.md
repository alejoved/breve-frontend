# Guía de Conversión de React a Angular

## Estado Actual del Proyecto

El proyecto Angular ha sido creado con la siguiente estructura:

### ✅ Completado

1. **Configuración del proyecto**
   - `package.json` con todas las dependencias de Angular 17
   - `angular.json` con configuración de build
   - `tsconfig.json` y `tsconfig.app.json`
   - `tailwind.config.js` con la misma configuración de Tailwind
   - Estructura de carpetas siguiendo las convenciones de Angular

2. **Componentes principales**
   - `AppComponent` - Componente raíz
   - `LandingPageComponent` - Página principal que contiene todas las secciones
   - `CallToActionSectionComponent` - **COMPLETAMENTE FUNCIONAL** con menú móvil
   - `MainContentSectionComponent` - **COMPLETAMENTE FUNCIONAL** con toggle de demos

3. **Utilities**
   - `SanitizeUrlPipe` - Pipe para sanitizar URLs de iframes

4. **Componentes stub creados** (con estructura básica pero necesitan completarse)
   - `FeaturesSectionComponent`
   - `PricingSectionComponent`
   - `UserReviewsSectionComponent`
   - `FAQSectionComponent`
   - `TestimonialsSectionComponent`
   - `HeroSectionComponent`
   - `AppOverviewSectionComponent`
   - `NavigationSectionComponent`

### ⚠️ Pendiente de Completar

Los componentes stub necesitan:

1. **Implementar la lógica completa** siguiendo los ejemplos en `COMPONENTES_PENDIENTES.md`
2. **Convertir los templates HTML** del código React original
3. **Añadir animaciones** de scroll (similar a `useScrollAnimation` en React)

## Cómo Completar la Conversión

### Paso 1: Instalar Dependencias

```bash
cd angular-app
npm install
```

### Paso 2: Completar Cada Componente

Para cada componente en la carpeta `sections/`, necesitas:

1. **Abrir el componente stub** (ej: `features-section.component.ts`)
2. **Revisar el código React original** en el proyecto React
3. **Convertir siguiendo estas reglas**:

#### Conversión de Sintaxis

| React (JSX) | Angular (Template) |
|-------------|-------------------|
| `className="..."` | `class="..."` |
| `{value}` | `{{value}}` |
| `{condition && <div>}` | `<div *ngIf="condition">` |
| `{array.map(item => <div>)}` | `<div *ngFor="let item of array">` |
| `onClick={handler}` | `(click)="handler()"` |
| `onChange={handler}` | `(change)="handler($event)"` |
| `value={state}` | `[value]="state"` |
| `<Component prop={value} />` | `<app-component [prop]="value">` |

#### Conversión de Lógica

| React | Angular |
|-------|---------|
| `useState(initialValue)` | Propiedad de clase: `value = initialValue` |
| `useEffect(() => {...}, [])` | `ngOnInit() {...}` |
| `useEffect(() => {...})` | `ngAfterViewInit() {...}` |
| `useRef()` | `@ViewChild()` + `ElementRef` |
| Props | `@Input()` decorator |
| Callbacks | `@Output()` + `EventEmitter` |

### Paso 3: Implementar Animaciones de Scroll

Crear una directiva o servicio para manejar las animaciones de scroll:

```typescript
// src/app/directives/scroll-animation.directive.ts
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.el.nativeElement, 'opacity-100');
        this.renderer.addClass(this.el.nativeElement, 'translate-y-0');
      }
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);

    // Estado inicial
    this.renderer.addClass(this.el.nativeElement, 'transition-all');
    this.renderer.addClass(this.el.nativeElement, 'duration-1000');
    this.renderer.addClass(this.el.nativeElement, 'opacity-0');
    this.renderer.addClass(this.el.nativeElement, 'translate-y-10');
  }
}
```

Uso en templates:
```html
<section appScrollAnimation class="...">
  <!-- contenido -->
</section>
```

### Paso 4: Probar el Proyecto

```bash
npm start
```

Esto iniciará el servidor de desarrollo en `http://localhost:4200`

## Ejemplo Completo: Features Section

Aquí hay un ejemplo de cómo completar el `FeaturesSectionComponent`:

```typescript
// features-section.component.ts
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

```html
<!-- features-section.component.html -->
<section class="flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-[71px] pt-8 md:pt-12 lg:pt-[55px] pb-12 md:pb-16 lg:pb-[91px] px-4 md:px-12 lg:px-[77px] w-full">
  <h2 class="[font-family:'Funnel_Display',Helvetica] font-medium text-white text-3xl md:text-4xl lg:text-[51.6px] text-center tracking-[-1.09px] leading-tight md:leading-[59px] px-4">
    ¿Por qué tu negocio pierde clientes cada mes?
  </h2>

  <div class="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-8 lg:gap-[34px] w-full max-w-[1358px]">
    <!-- Tarjeta de Problemas -->
    <div class="relative w-full lg:flex-1 lg:max-w-[662px] min-h-[500px] md:min-h-[550px] lg:min-h-[549px] bg-[#fcf8f90f] rounded-[30px] md:rounded-[40px] lg:rounded-[60px] border-0 shadow-[inset_1px_0px_21.9px_#fc9eb9]">
      <div class="relative w-full pt-6 pb-[58px] px-6 md:pt-8 md:pb-[74px] md:px-8 lg:pt-[81px] lg:pb-[81px] lg:px-[65px]">
        <div class="w-full mb-4 md:mb-6 [font-family:'Funnel_Display',Helvetica] font-medium text-white text-2xl md:text-2xl lg:text-[32px] tracking-[-0.62px] leading-9">
          Hoy pierdes clientes porque:
        </div>

        <div class="w-full flex flex-col gap-3 md:gap-4 lg:gap-6 [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base lg:text-xl tracking-[0] leading-relaxed md:leading-6">
          <div *ngFor="let problem of problemsList" class="flex items-start gap-2">
            <img class="w-[15px] h-[15px] mt-1 flex-shrink-0" alt="Icon" src="/icon-4.svg">
            <span>{{ problem }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tarjeta de Soluciones -->
    <div class="relative w-full lg:flex-1 lg:max-w-[662px] min-h-[500px] md:min-h-[550px] lg:min-h-[549px] bg-[#fcf8f90f] rounded-[30px] md:rounded-[40px] lg:rounded-[60px] border-0 shadow-[inset_1px_0px_21.9px_#58f6a7]">
      <div class="relative w-full pt-6 pb-[58px] px-6 md:pt-8 md:pb-[74px] md:px-8 lg:pt-[81px] lg:pb-[81px] lg:px-[69px]">
        <div class="w-full mb-4 md:mb-6 [font-family:'Funnel_Display',Helvetica] font-bold text-white text-2xl md:text-2xl lg:text-[32px] tracking-[-0.62px] leading-9">
          Con +Breve cambia así:
        </div>

        <div class="w-full [font-family:'Degular-Regular',Helvetica] font-normal text-white text-base md:text-base lg:text-xl tracking-[0] leading-relaxed md:leading-6">
          <ng-container *ngFor="let solution of solutionsList; let i = index">
            {{ solution }}
            <ng-container *ngIf="i < solutionsList.length - 1">
              <br><br>
            </ng-container>
          </ng-container>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Recursos Adicionales

- **Código React Original**: Ubicado en `/project/src/screens/LandingPage/`
- **Assets**: Los recursos están en `/project/public/` y se referencian directamente
- **Documentación Angular**: https://angular.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ver en navegador
# Abrir http://localhost:4200
```

## Notas Importantes

1. Todos los componentes son **standalone** (no requieren NgModule)
2. Las imágenes y assets se referencian desde `/public/` del proyecto raíz
3. Tailwind CSS está completamente configurado
4. El proyecto usa Angular 17 con la nueva sintaxis de componentes standalone
