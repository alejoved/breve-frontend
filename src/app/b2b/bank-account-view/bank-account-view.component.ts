import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';
import { AuthB2BService } from '../../auth/auth-b2b-service';

@Component({
  selector: 'app-bank-account-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-account-view.component.html',
  styleUrls: ['./bank-account-view.component.css']
})
export class BankAccountViewComponent implements OnInit {
  business: Business | null = null;
  loading = true;
  saving = false;

  colombianBanks = [
    'Bancolombia',
    'Banco de Bogotá',
    'Davivienda',
    'BBVA Colombia',
    'Banco de Occidente',
    'Banco Popular',
    'Banco Caja Social',
    'Banco AV Villas',
    'Banco Agrario',
    'Banco GNB Sudameris',
    'Banco Pichincha',
    'Banco Cooperativo Coopcentral',
    'Banco Falabella',
    'Banco Finandina',
    'Banco Mundo Mujer',
    'Banco W',
    'Banco Serfinanza',
    'Bancamía',
    'Nequi',
    'Daviplata'
  ];

  formData = {
    id: '',
    name: '',
    nit: '',
    email: '',
    password: '',
    bankName: '',
    accountType: '',
    accountNumber: '',
    accountOwner: ''
  };

  errors = {
    bankName: '',
    accountNumber: '',
    accountType: '',
    accountOwner: ''
  };

  touched = {
    bankName: false,
    accountNumber: false,
    accountOwner: false
  };

  constructor(private businessService: BusinessService, private authB2B: AuthB2BService ) {
  }

  async ngOnInit() { 
    const businessId = this.authB2B.getBusinessId();
    this.business = await this.businessService.filterById(businessId!);
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    if (this.business) {
      this.formData = {
        id: this.business.id || '',
        name: this.business.name || '',
        nit: this.business.nit || '',
        email: this.business.email || '',
        password: this.business.password || '',
        bankName: this.business.bankName || '',
        accountType: this.business.accountType || '',
        accountNumber: this.business.accountNumber || '',
        accountOwner: this.business.accountOwner || ''
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
    try {
      this.business = await this.businessService.update(this.formData);
      Swal.fire({ icon: "success", title: "Éxito", text: "La informacion den la cuenta bancaria se ha guardado correctamente." });
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    }
    this.saving = false;
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
    this.validateBankName();
    this.validateAccountNumber();
    this.validateAccountOwner();
  }

  validateBankName() {
    if (this.touched.bankName) {
      if (!this.formData.bankName) {
        this.errors.bankName = 'Debes seleccionar un banco';
      } else {
        this.errors.bankName = '';
      }
    }
  }

  validateAccountNumber() {
    if (this.touched.accountNumber) {
      const accountNumber = this.formData.accountNumber.trim();

      if (!accountNumber) {
        this.errors.accountNumber = 'El número de cuenta es requerido';
      } else if (!/^\d+$/.test(accountNumber)) {
        this.errors.accountNumber = 'El número de cuenta solo debe contener dígitos';
      } else if (accountNumber.length < 9 || accountNumber.length > 20) {
        this.errors.accountNumber = 'El número de cuenta debe tener entre 9 y 20 dígitos';
      } else {
        this.errors.accountNumber = '';
      }
    }
  }

  validateAccountOwner() {
    if (this.touched.accountOwner) {
      if (!this.formData.accountOwner.trim()) {
        this.errors.accountOwner = 'El nombre del titular es requerido';
      } else if (this.formData.accountOwner.trim().length < 2) {
        this.errors.accountOwner = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.accountOwner = '';
      }
    }
  }

  isFormValid(): boolean {
    return !this.errors.bankName &&
           !this.errors.accountNumber &&
           !this.errors.accountOwner &&
           this.formData.bankName.trim() !== '' &&
           this.formData.accountNumber.trim() !== '' &&
           this.formData.accountOwner.trim() !== '';
  }

  onFieldBlur(field: keyof typeof this.touched) {
    this.touched[field] = true;
    switch(field) {
      case 'bankName': this.validateBankName(); break;
      case 'accountNumber': this.validateAccountNumber(); break;
      case 'accountOwner': this.validateAccountOwner(); break;
    }
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
