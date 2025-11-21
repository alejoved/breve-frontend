import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact-service';
import Swal from 'sweetalert2';

interface FormData {
  name: string;
  business: string;
  phone: string;
  email: string;
  description: string;
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

  constructor(private contactService: ContactService) {

  }

  formData: FormData = {
    name: '',
    business: '',
    phone: '',
    email: '',
    description: ''
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

  async onSubmit() {
    try {
      console.log('Form submitted:', this.formData);
      await this.contactService.create(this.formData);
      Swal.fire({ icon: "success", title: "¡Mensaje enviado!", text: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto." });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    } finally {
      this.formData = {
        name: '',
        business: '',
        phone: '',
        email: '',
        description: ''
      };
    }
  }
}
