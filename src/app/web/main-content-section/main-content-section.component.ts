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
  activeDemo: DemoType = 'tablero';
  isVisible = false;

  demoUrls: DemoUrls = {
    tablero: 'https://app.supademo.com/embed/cmis8le9o21jol821e9z7i36d?embed_v=2&utm_source=embed',
    flujo: 'https://app.supademo.com/embed/cmiovvlax1icdgxadm345absg?embed_v=2&utm_source=embed',
    portal: 'https://app.supademo.com/embed/cmis76hj320ldl821tpiy9hlm?embed_v=2&utm_source=embed'
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
