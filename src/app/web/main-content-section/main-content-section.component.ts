import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeUrlPipe } from '../pipes/sanitize-url.pipe';

type DemoType = 'flujo' | 'tablero' | 'portal';

interface DemoUrls {
  flujo: string;
  tablero: string;
  portal: string;
}

@Component({
  selector: 'app-main-content-section',
  standalone: true,
  imports: [CommonModule, SanitizeUrlPipe],
  templateUrl: './main-content-section.component.html',
  styleUrls: ['./main-content-section.component.css']
})
export class MainContentSectionComponent {
  activeDemo: DemoType = 'flujo';
  isVisible = false;

  demoUrls: DemoUrls = {
    flujo: 'https://supademo.com/embed/cm3owbcmu17g4128qvzg18p33',
    tablero: 'https://supademo.com/embed/YOUR_ANALYTICS_DEMO_ID',
    portal: 'https://supademo.com/embed/YOUR_PAYMENTS_DEMO_ID'
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  setActiveDemo(demo: DemoType): void {
    if (demo) {
      this.activeDemo = demo;
    }
  }

  getCurrentDemoUrl(): string {
    return this.demoUrls[this.activeDemo];
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
  }
}
