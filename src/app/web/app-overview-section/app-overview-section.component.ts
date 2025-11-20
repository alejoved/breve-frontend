import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  businessDescription: string;
}

@Component({
  selector: 'app-app-overview-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-overview-section.component.html',
  styleUrls: ['./app-overview-section.component.css']
})
export class AppOverviewSectionComponent implements AfterViewInit {
  @ViewChild('section') section!: ElementRef;
  isVisible = false;

  formData: FormData = {
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessDescription: ''
  };

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

  onSubmit() {
    console.log('Form submitted:', this.formData);
    
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    this.formData = {
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      businessDescription: ''
    };
  }
}
