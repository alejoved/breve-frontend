import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CustomerService } from '../../services/customer-service';
import Swal from 'sweetalert2';
import { business_name } from '../../../constants';
import { BusinessService } from '../../services/business-service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProgressBarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private businessService = inject(BusinessService);

  businessNick = business_name;
  businessId: string | null = null;

  formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  };

  errors = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  };

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.businessNick = state['businessNick'];
    }
    if(!state){
      this.router.navigate(['']);
    }
    this.businessFilterByNick();
  }

  async businessFilterByNick() {
    try {
      const business = await this.businessService.filterByNick(this.businessNick);
      this.businessId = business ? business.id! : null;
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
      this.router.navigate(['']);
    }
  }

  validateFirstName() {
    if (!this.formData.firstName.trim()) {
      this.errors.firstName = 'Completa tu nombre';
      return false;
    }
    if (!/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(this.formData.firstName)) {
      this.errors.firstName = 'El nombre no puede contener números ni caracteres especiales';
      return false;
    }
    this.errors.firstName = '';
    return true;
  }

  validateLastName() {
    if (!this.formData.lastName.trim()) {
      this.errors.lastName = 'Completa tu apellido';
      return false;
    }
    if (!/^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(this.formData.lastName)) {
      this.errors.lastName = 'El apellido no puede contener números ni caracteres especiales';
      return false;
    }
    this.errors.lastName = '';
    return true;
  }

  validatePhone() {
    if (!this.formData.phone.trim()) {
      this.errors.phone = 'Completa el numero de celular';
      return false;
    }
    if (!/^\d{10}$/.test(this.formData.phone)) {
      this.errors.phone = 'El número de celular debe tener 10 dígitos';
      return false;
    }
    this.errors.phone = '';
    return true;
  }

  validateEmail() {
    if (!this.formData.email.trim()) {
      this.errors.email = 'Completa tu correo electrónico';
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.errors.email = 'Este no es un formato de correo electrónico válido';
      return false;
    }
    this.errors.email = '';
    return true;
  }

  onFirstNameInput() {
    if (this.errors.firstName) {
      this.validateFirstName();
    }
  }

  onLastNameInput() {
    if (this.errors.lastName) {
      this.validateLastName();
    }
  }
  onPhoneInput() {
    if (this.errors.phone) {
      this.validatePhone();
    }
  }

  onEmailInput() {
    if (this.errors.email) {
      this.validateEmail();
    }
  }

  isFormValid(): boolean {
    return this.formData.firstName.trim() !== '' &&
           this.formData.lastName.trim() !== '' &&
           this.formData.phone.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.errors.firstName === '' &&
           this.errors.lastName === '' &&
           this.errors.phone === '' &&
           this.errors.email === '';
  }

  async onSubmit() {
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateEmail();

    if (this.isFormValid()) {
      try {
        const customer = await this.customerService.create(this.formData);
        if(customer){
          this.router.navigate(['/plans'], { state: { business: { id: this.businessId }, customer: {id: customer.id } }});
        }
      } catch (ex: any) {
        if(ex.error.error == "Customer found"){
          Swal.fire({ icon: "error", title: "Usuario existente", text: "Usuario existente por favor inicia sesion" });
        } else {
          Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
        }
        this.router.navigate(['']);
      }
    }
  }
}
