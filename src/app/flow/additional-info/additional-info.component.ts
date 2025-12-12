import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CustomerService } from '../../services/customer-service';
import Swal from 'sweetalert2';
import { business_name, error } from '../../../constants';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProgressBarComponent],
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent {
  private router = inject(Router);
  private customerService = inject(CustomerService);
  businessId: string | null = null;
  customerId: string | null = null;
  planId: string | null = null;

  constructor(){
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.businessId = state['business'].id;
      this.customerId = state['customer'].id;
      this.planId = state['plan'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
    this.filterById();
  }

  businessName = business_name;

  formData = {
    id: "",
    firstName: "",
    lastName: "",
    phone : "",
    email: "",
    gender: "",
    documentType: "",
    documentNumber: ""
  };

  errors = {
    gender: "",
    documentType: "",
    documentNumber: ""
  };

  async filterById(){
    try {
    const customer = await this.customerService.filterById(this.customerId!);
    this.formData.id = customer.id!;
    this.formData.firstName = customer.firstName!;
    this.formData.lastName = customer.lastName!;
    this.formData.phone = customer.phone!;
    this.formData.email = customer.email!;
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
      this.router.navigate(['']);
    }
  }

  validateGender() {
    if (!this.formData.gender) {
      this.errors.gender = 'Selecciona tu género';
      return false;
    }
    this.errors.gender = '';
    return true;
  }

  validateDocumentType() {
    if (!this.formData.documentType) {
      this.errors.documentType = 'Selecciona el tipo de documento';
      return false;
    }
    this.errors.documentType = '';
    return true;
  }

  validateDocumentNumber() {
    if (!this.formData.documentNumber.trim()) {
      this.errors.documentNumber = 'Completa tu número de documento';
      return false;
    }
    if (!/^[0-9]+$/.test(this.formData.documentNumber)) {
      this.errors.documentNumber = 'El número de documento solo puede contener números';
      return false;
    }
    if (this.formData.documentNumber.length < 6) {
      this.errors.documentNumber = 'El número de documento debe tener al menos 6 dígitos';
      return false;
    }
    this.errors.documentNumber = '';
    return true;
  }

  onGenderChange() {
    if (this.errors.gender) {
      this.validateGender();
    }
  }

  onDocumentTypeChange() {
    if (this.errors.documentType) {
      this.validateDocumentType();
    }
  }

  onDocumentNumberInput() {
    if (this.errors.documentNumber) {
      this.validateDocumentNumber();
    }
  }

  isFormValid(): boolean {
    return this.formData.gender !== '' &&
           this.formData.documentType !== '' &&
           this.formData.documentNumber.trim() !== '' &&
           this.errors.gender === '' &&
           this.errors.documentType === '' &&
           this.errors.documentNumber === '';
  }

  async onSubmit() {
    this.validateGender();
    this.validateDocumentType();
    this.validateDocumentNumber();

    if (this.isFormValid()) {
      try {
        const customer = await this.customerService.update(this.formData);
        this.router.navigate(['/contract'], { state: { business: { id: this.businessId }, customer: {id: customer.id }, plan: {id: this.planId } }});
      } catch (ex: any) {
        Swal.fire({ icon: "error", title: "Error", text: ex.error.message });
        this.router.navigate(['']);
      }
    }
  }
}
