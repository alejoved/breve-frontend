import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService, Business } from '../../services/business.service';

@Component({
  selector: 'app-business-info-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-info-view.component.html',
  styleUrls: ['./business-info-view.component.css']
})
export class BusinessInfoViewComponent implements OnInit {
  loading = true;
  saving = false;

  formData = {
    name: '',
    owner_name: '',
    email: '',
    phone: '',
    address: ''
  };

  errors = {
    name: '',
    owner_name: '',
    email: '',
    phone: '',
    address: ''
  };

  touched = {
    name: false,
    owner_name: false,
    email: false,
    phone: false,
    address: false
  };

  constructor(private businessService: BusinessService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const business = await this.businessService.getBusiness();

    if (business) {
      this.formData = {
        name: business.name || '',
        owner_name: business.owner_name || '',
        email: business.email || '',
        phone: business.phone || '',
        address: business.address || ''
      };
    }

    this.loading = false;
  }

  async save() {
    this.markAllTouched();
    this.validateAll();

    if (!this.isFormValid()) {
      return;
    }

    this.saving = true;
    await this.businessService.updateBusiness(this.formData);
    this.saving = false;
  }

  cancel() {
    window.history.back();
  }

  goBack() {
    window.history.back();
  }

  markAllTouched() {
    Object.keys(this.touched).forEach(key => {
      (this.touched as any)[key] = true;
    });
  }

  validateAll() {
    this.validateName();
    this.validateOwnerName();
    this.validateEmail();
    this.validatePhone();
    this.validateAddress();
  }

  validateName() {
    if (this.touched.name) {
      if (!this.formData.name.trim()) {
        this.errors.name = 'El nombre del negocio es requerido';
      } else if (this.formData.name.trim().length < 2) {
        this.errors.name = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.name = '';
      }
    }
  }

  validateOwnerName() {
    if (this.touched.owner_name) {
      if (!this.formData.owner_name.trim()) {
        this.errors.owner_name = 'El nombre del propietario es requerido';
      } else if (this.formData.owner_name.trim().length < 2) {
        this.errors.owner_name = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.owner_name = '';
      }
    }
  }

  validateEmail() {
    if (this.touched.email) {
      if (!this.formData.email.trim()) {
        this.errors.email = 'El email es requerido';
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Ingresa un email válido';
      } else {
        this.errors.email = '';
      }
    }
  }

  validatePhone() {
    if (this.touched.phone) {
      if (!this.formData.phone.trim()) {
        this.errors.phone = 'El teléfono es requerido';
      } else if (this.formData.phone.trim().length < 7) {
        this.errors.phone = 'Ingresa un teléfono válido';
      } else {
        this.errors.phone = '';
      }
    }
  }

  validateAddress() {
    if (this.touched.address) {
      if (!this.formData.address.trim()) {
        this.errors.address = 'La dirección es requerida';
      } else if (this.formData.address.trim().length < 5) {
        this.errors.address = 'Ingresa una dirección válida';
      } else {
        this.errors.address = '';
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return !this.errors.name &&
           !this.errors.owner_name &&
           !this.errors.email &&
           !this.errors.phone &&
           !this.errors.address &&
           this.formData.name.trim() !== '' &&
           this.formData.owner_name.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.phone.trim() !== '' &&
           this.formData.address.trim() !== '';
  }

  onFieldBlur(field: keyof typeof this.touched) {
    this.touched[field] = true;
    switch(field) {
      case 'name': this.validateName(); break;
      case 'owner_name': this.validateOwnerName(); break;
      case 'email': this.validateEmail(); break;
      case 'phone': this.validatePhone(); break;
      case 'address': this.validateAddress(); break;
    }
  }
}
