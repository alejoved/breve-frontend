import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;
  calendlyUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.calendlyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://calendly.com/masbreve/reunion-inicial'
    );
  }

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

    this.loadCalendlyScript();
  }

  ngOnDestroy() {
    const script = document.querySelector('script[src*="calendly"]');
    if (script) {
      script.remove();
    }
  }

  private loadCalendlyScript() {
    if (document.querySelector('script[src*="calendly"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
