import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-info-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-info-view.component.html',
  styleUrls: ['./business-info-view.component.css']
})
export class BusinessInfoViewComponent implements OnInit {

  business: Business | null = null;
  loading = true;
  saving = false;

  formData = {
    id: '',
    name: '',
    nit: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  };

  errors = {
    name: '',
    nit: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  };

  touched = {
    name: false,
    nit: false,
    ownerName: false,
    email: false,
    password: false,
    phone: false,
    address: false
  };

  constructor(private businessService: BusinessService) {}

  async ngOnInit() {
    this.business = this.businessService.getSession();
    this.business = await this.businessService.filterById(this.business?.id!);
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    if (this.business) {
      this.formData = {
        id: this.business.id || '',
        name: this.business.name || '',
        nit: this.business.nit || '',
        ownerName: this.business.ownerName || '',
        email: this.business.email || '',
        password: this.business.password || '',
        phone: this.business.phone || '',
        address: this.business.address || ''
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
    try {
      this.business = await this.businessService.update(this.formData);
      Swal.fire({ icon: "success", title: "Éxito", text: "La informacion del negocio se ha guardado correctamente." });
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
    this.saving = true;
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

  validateNit() {
    if (this.touched.nit) {
      if (!this.formData.nit.trim()) {
        this.errors.nit = 'El NIT es requerido';
      } else if (this.formData.nit.trim().length < 5) {
        this.errors.nit = 'Ingresa un NIT válido';
      } else {
        this.errors.nit = '';
      }
    }
  }

  validateOwnerName() {
    if (this.touched.ownerName) {
      if (!this.formData.ownerName.trim()) {
        this.errors.ownerName = 'El nombre del propietario es requerido';
      } else if (this.formData.ownerName.trim().length < 2) {
        this.errors.ownerName = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.ownerName = '';
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

  validatePassword() {
    if (this.touched.password) {
      if (!this.formData.password.trim()) {
        this.errors.password = 'La contraseña es requerida';
      } else if (this.formData.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres';
      } else {
        this.errors.password = '';
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
           !this.errors.ownerName &&
           !this.errors.email &&
           !this.errors.phone &&
           !this.errors.address &&
           this.formData.name.trim() !== '' &&
           this.formData.ownerName.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.phone.trim() !== '' &&
           this.formData.address.trim() !== '';
  }

  onFieldBlur(field: keyof typeof this.touched) {
    this.touched[field] = true;
    switch(field) {
      case 'name': this.validateName(); break;
      case 'ownerName': this.validateOwnerName(); break;
      case 'email': this.validateEmail(); break;
      case 'phone': this.validatePhone(); break;
      case 'address': this.validateAddress(); break;
    }
  }
}
